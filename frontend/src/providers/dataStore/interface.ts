import { PromptResponse } from "../../models/promptResponse"

export interface DataStoreContextProps {
  question: string
  setQuestion: React.Dispatch<React.SetStateAction<string>>
  answer: string
  setAnswer: React.Dispatch<React.SetStateAction<string>>
  sources: PromptResponse["source_documents"]
  setSources: React.Dispatch<
    React.SetStateAction<PromptResponse["source_documents"]>
  >
  sourcesCount: number
  setSourcesCount: React.Dispatch<React.SetStateAction<number>>
  articleUrl: string
  setArticleUrl: React.Dispatch<React.SetStateAction<string>>
  theses: string[] | undefined
  setTheses: React.Dispatch<React.SetStateAction<string[] | undefined>>
  thesesCount: number
  setThesesCount: React.Dispatch<React.SetStateAction<number>>
  resetDataBeforeRequest: () => void
}
