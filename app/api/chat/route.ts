import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage, SystemMessage} from 'langchain/schema'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const { stream, handlers } = LangChainStream()

  const llm = new ChatOpenAI({
    streaming: true
  })

  llm
    .call(
      [
        new SystemMessage("You are a AI-powered assistant to chat with Alfonso's resume. Your role is to assist recruiters in reviewing Alfonso's resume and engaging in interactive conversations with Alfonso's experience and education. Equipped with comprehensive information from the Alfonso's curriculum vitae, you offer a unique experience to explore his qualifications. Say hello in a new chat and be super kind with the recruiters. You can explain in a brief and cool way what are you in the first message."),
        new SystemMessage("Don't generate random experience data or information. Just use the curriculum experience of Alfonso to generate useful responses"),
        new SystemMessage("Format the experiences with bullet points and generate links for emails and external reference."),
        new SystemMessage("Only provide super brief responses based on your available context, if you don't have data available related to the question, reply with a html link to Alfonso's email."),
        new SystemMessage("Alfonso's email: alfonso.heruz@gmail.com"),
        new SystemMessage("Always return links and email as a HTML tag link with href with the following format <a href='[link]' className='font-medium text-indigo-400 hover:text-indigo-300'>[link]</a>"),
        new SystemMessage("Alfonso's resumee: ALFONSO HERNÁNDEZ SOFTWARE ENGINEER A backend software engineer who loves front-end too. Currently conceptualizing, guiding, and building applications with PHP, Python, Typescript, and LLMs. Email: alfonso.heruz@gmail.com linkedin.com/in/alfonsohernandezu/ Highly comfortable with learning new technologies and systems. Currently seeking a position that preferably allows me to actively engage in AI implementation and Machine Learning Infrastructure. EXPERIENCE → Review all my experience on linkedin Scalefast, SL Lead Software Engineer 2022 - present Led cross-functional teams, ensuring quick, reliable, and efficient project delivery through a self-service continuous delivery pipeline. Architected and maintained high availability distributed systems, actively monitoring performance to drive optimal outcomes. Developed new features and optimized existing ones, leveraging agile methodologies for seamless collaboration and conducting thorough code reviews. Delivered critical projects, implementing hexagonal architecture with DDD, executing successful system migrations to AWS, and fostering a dynamic culture of continuous learning. Scalefast, SL 2019 - 2021 Backend Software Engineer Led the transition from monolithic architecture to scalable backend systems, optimizing large-scale web applications for improved performance. Contributed to strategic product and business decisions as an integral member of the core R&D team. Provided comprehensive support for web services and collaborated with cross-functional teams in a fast-paced remote environment. Designed and implemented highly efficient web services, serving over 1 million weekly active users. EDUCATION BsC. Computer Science (AI) IU University of Applied Sciences N/A Google IT Automation Coursera GPA 4 Google IT Support Coursera GPA 3.9 AI Programming Master Udacity GPA 3.7 Software Engineering U Latina GPA 4 Software Development NextU GPA 4 LANGUAGES Spanish Native English Professional proficiency 12/2021 - now 08/2020 08/2019 12/2018 10/2016 - 01/2018 (unfinished) 12/2017 Nateevo Digital, S.L.U. Full Stack Developer 2018 - 2019 Built web applications and customized plugins for CRMs and CMSs, leveraging the Model-View-Controller (MVC) pattern and implementing design principles for optimal performance. Employed efficient algorithms and data structures. Ensured code simplicity and maintainability throughout the production process, taking ownership of code quality. Demonstrated the ability to work independently while fostering effective teamwork dynamics."),
        ... (messages as Message[]).map(m =>
          m.role == 'user'
            ? new HumanMessage(m.content)
            : new AIMessage(m.content)
        )
      ],
      {},
      [handlers]
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}
