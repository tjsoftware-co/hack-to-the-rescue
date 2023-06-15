import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@mui/material"
import axios from "axios"
import { useRef, useState } from "react"

import ArticleTile from "../../components/ArticleTile"
import TheseTile from "../../components/TheseTile"
import { ENDPOINTS } from "../../consts"
import { PromptResponse } from "../../models/promptResponse"
import { useDataStore } from "../../providers/dataStore/context"
import getFormattedDate from "../../utils/getFormattedDate"
import "./styles.scss"

const Page1 = () => {
  const {
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
    setThesesCount,
    setTheses,
    resetDataBeforeRequest,
  } = useDataStore()
  const [isLoading, setIsLoading] = useState(false)

  const questionInput = useRef<HTMLTextAreaElement>(null)
  const linkInput = useRef<HTMLInputElement>(null)

  const disableQuestionInput = articleUrl ? true : false
  const disableLinkInput = question ? true : false

  const handleKeyDown = (e: any) => {
    if (isLoading) return

    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      resetDataBeforeRequest()

      questionInput.current?.blur()
      linkInput.current?.blur()

      if (question) {
        const { data }: { data: PromptResponse } = await axios.post(
          ENDPOINTS.prompt,
          {
            question,
          }
        )

        setAnswer(data.answer)
        setSources(data.source_documents)
        setSourcesCount(data.source_documents.length)
      } else {
        const { data }: { data: string[] } = await axios.post(
          ENDPOINTS.articlesValidate,
          {
            url: articleUrl,
          }
        )

        setAnswer(data[0])
        setTheses(data)
        setThesesCount(data.length)
      }
    } catch (error) {
      setAnswer("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const setTheseAsQuestion = (these: string) => {
    setArticleUrl("")
    setQuestion(these)

    window.scrollTo(0, 0)
  }

  return (
    <div className="page1">
      <div className="bg-core">
        <img className="bg-core__bg" src="src/assets/bg.svg" alt="" />
        <img className="bg-core__placek" src="src/assets/placek.svg" alt="" />
        <img className="bg-core__dots" src="src/assets/dots.svg" alt="" />
      </div>
      <img className="bg-substract" src="src/assets/subtract.svg" alt="" />

      <section className="page1__chat-section">
        <div className="chat-section__box-container">
          <h2 className="chat-section__header">Question</h2>
          <div className="chat-section__tile">
            <textarea
              ref={questionInput}
              className="tile__question-input"
              value={question}
              onChange={(e: any) => {
                setQuestion(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              disabled={disableQuestionInput}
              placeholder="Type a question our an information that you want to veify"
            />
            <input
              ref={linkInput}
              className="tile__link-input"
              placeholder="Paste the link"
              value={articleUrl}
              disabled={disableLinkInput}
              onChange={(e: any) => {
                setArticleUrl(e.target.value)
              }}
              onKeyDown={handleKeyDown}
            />
            <div className="tile__footer">
              <Button
                className="tile__btn"
                variant="contained"
                disabled={(!question && !articleUrl) || isLoading}
                onClick={handleSubmit}>
                Verify
              </Button>
            </div>
          </div>
        </div>
        <div className="chat-section__box-container">
          <h2 className="chat-section__header">Answer</h2>
          {isLoading ? (
            <div className="chat-section__tile chat-section__tile--loading" />
          ) : (
            <div className="chat-section__tile chat-section__tile--answer">
              <p className="tile__answer">{answer}</p>
              {answer && (
                <div className="tile__footer">
                  <div className="tile__sources-container">
                    <span className="sources-container__text">
                      {question ? "Sources:" : "Theses:"}
                    </span>
                    <span className="sources-container__value">
                      {sourcesCount || thesesCount}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {(sources?.length !== 0 || theses) && (
          <a className="chat-section__arrow-container" href="#results">
            <FontAwesomeIcon
              className="chat-section__arrow"
              icon={faArrowDownLong}
            />
          </a>
        )}
      </section>

      {(sources?.length !== 0 || theses) && (
        <section id="results" className="page1__results-section">
          <div className="results-section__articles-container">
            {sources?.map((source, index) => (
              <ArticleTile
                key={index}
                indicator={index + 1}
                date={getFormattedDate(source.month, source.year)}
                authors={source.authors}
                title={source.title}
                content={source.content}
                source={source.source}
              />
            ))}
            {theses?.map((these, index) => (
              <TheseTile
                key={index}
                these={these}
                indicator={index + 1}
                onClick={() => setTheseAsQuestion(these)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Page1
