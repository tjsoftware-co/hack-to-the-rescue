export interface PromptResponse {
  answer: string
  source_documents: {
    content: "string"
    authors: "string"
    month: "string"
    page: "string"
    source: "string"
    title: "string"
    year: "string"
  }[]
}
