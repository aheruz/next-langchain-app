import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import documents from './documents';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { AttributeInfo } from "langchain/schema/query_constructor";


import { AIMessage, HumanMessage, SystemMessage} from 'langchain/schema'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const { stream, handlers } = LangChainStream()

  const streamingModel = new ChatOpenAI({
    streaming: true,
  });

  const nonStreamingModel = new ChatOpenAI();

  // Load the resume data 
  const vectorStore = await MemoryVectorStore.fromTexts(
    documents.map((d) => d.content),
    documents.map((d) => d.metadata),
    new OpenAIEmbeddings()
  );

  const INIT_SYSTEM = `
  You are a AI-powered assistant to chat with Alfonso's resume. Your role is to assist recruiters in reviewing Alfonso's resume and engaging in interactive conversations with Alfonso's experience and education. Equipped with comprehensive information from the Alfonso's curriculum vitae, you offer a unique experience to explore his qualifications. Say hello in a new chat and be super kind with the recruiters. You can explain in a brief and cool way what are you in the first message.
  Format the experiences with bullet points and generate links for emails and external reference.
  Generate always brief responses.
  `;

  const chatHistory = new ChatMessageHistory([
    new SystemMessage(INIT_SYSTEM),
    ... messages.map((m: Message) => {
      if (m.role === "user") {
        return new HumanMessage(m.content);
      }
      if (m.role === "system") {
        return new SystemMessage(m.content);
      }
      return new AIMessage(m.content);
    })
  ]);

  const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Your answer should follow the following format:
    \`\`\`
    Use the following pieces of context to answer the users question.
    If you don't have the answer in the context, just say that you don't know, don't try to make up an answer.
    Just generate a standalone question if the follow up input is into the context.
    If follow up input is off-topic, remind the user the main topic of the chat: review Alfonso's resume.
    Be brief and cool, don't use more than 3 sentences.
    ----------------
    <Relevant chat history excerpt as context here>
    Standalone question: <Rephrased question here>
    \`\`\`
    Your answer:`;

  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    vectorStore.asRetriever(),
    {
      verbose: true,
      returnSourceDocuments: true,
      memory: new BufferMemory({
        memoryKey: "chat_history",
        inputKey: "question",
        outputKey: "text",
        returnMessages: true,
        chatHistory: chatHistory,
      }),
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
        template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT
      }
    }
  );
  
  const lastMessage: Message = (messages as Message[]).at(-1)!;
  chain.call(
    {question: lastMessage.content},
    {
      callbacks: [handlers],
    }
  ).catch(console.error);
  
  return new StreamingTextResponse(stream);
}
