import React, { PropsWithChildren, useState } from "react"

import { PromptResponse } from "../../models/promptResponse"
import { DataStoreContext } from "./context"

const DataStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<PromptResponse["source_documents"]>([])
  const [sourcesCount, setSourcesCount] = useState(0)
  const [articleUrl, setArticleUrl] = useState("")
  const [theses, setTheses] = useState<string[]>()
  const [thesesCount, setThesesCount] = useState(0)

  const resetDataBeforeRequest = () => {
    setAnswer("")
    setSources([])
    setSourcesCount(0)
    setTheses(undefined)
    setThesesCount(0)
  }

  return (
    <DataStoreContext.Provider
      value={{
        question,
        answer,
        sources,
        sourcesCount,
        articleUrl,
        theses,
        thesesCount,
        setQuestion,
        setAnswer,
        setSources,
        setSourcesCount,
        setArticleUrl,
        setTheses,
        setThesesCount,
        resetDataBeforeRequest,
      }}>
      {children}
    </DataStoreContext.Provider>
  )
}

export default DataStoreProvider
