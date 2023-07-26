type DocumentItem = {
    content: string,
    metadata: {
        tags?: string[];
        source: string;
    } 
}

type Documents = DocumentItem[]

class DocumentStore {
    documents: Documents;
    constructor() {
        this.documents = [] as Documents
    }
    addDocument(document: DocumentItem) {
        this.documents.push(document)
    }
    getDocuments() {
        return this.documents
    }
}

// fill the documents with the data from plain text
const documents = new DocumentStore()
documents.addDocument({
    content: "Alfonso Hernandez resume summary: Experienced Software Engineer (SWE) with 7+ years of experience in building high-availability distributed systems. Proven ability to lead and deliver complex software development projects. - Led the technical merge of the Product Information Management (PIM) between Scalefast and ESW, resulting in a 40% time savings by avoiding parallel tasks. - Designed and developed the architecture for decoupling the order creation flow, which is used by over 1 million weekly users. - Programming applications with PHP, Python, Typescript, and large language models (LLMs).)",
    metadata: {
        source: "https://www.linkedin.com/in/alfonsohernandezu/"
    }
});
documents.addDocument({
    content: "Alfonso experience, current role: Title: Lead Software Engineer at Scalefast | Dates: Jan 2022 - Present | Description: - Led cross-functional technical teams to deliver projects across seven departments, both local and international, applying agile methodologies and offered mentorship to junior engineers. - Improved product catalog ingestion by half through code refactoring following SOLID design principles, integration of GitLab CI/CD behavioral test pipelines, and efficient queue management using AWS Lambda. - Monitored application performance in cloud using Datadog and Sentry to identify and resolve critical issues before impacting end users, leading to a 20% increase in overall system stability.- Performed thorough code reviews within a team of five SWEs to ensure the quality of an event-driven, highly available platform built following DDD principles.",
    metadata: {
        source: "https://www.linkedin.com/in/alfonsohernandezu/"
    }
});
documents.addDocument({
    content: "Alfonso experience: Title: Software Partner at Agency Velocity | Dates: Dec 2022 - May 2023 (6 mons) | Description: - Built Python scripts and scraping tools on Linux to generate LLM-powered tools to automate customer acquisition, reducing customer discovery time by half. -Automated the lead generation process and provided insights into customer behavior through data-driven processes showcased on live tools built with Typescript and React.js.",
    metadata: {
        source: "https://www.linkedin.com/in/alfonsohernandezu/"
    }
});

// export documents generated
export default documents.getDocuments()