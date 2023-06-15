import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import parse from "html-react-parser"
import { useState } from "react"

import { ArticleTileProps } from "./interface"
import "./styles.scss"

const ArticleTile = ({
  indicator,
  date,
  authors,
  title,
  content,
  source,
}: ArticleTileProps) => {
  const [expandContent, setExpandContent] = useState(false)

  return (
    <div
      className={`article-tile ${expandContent && "article-tile--expanded"}`}>
      <span className="article-tile__indicator">{indicator}</span>
      <button
        className="article-tile__toogle"
        onClick={() => setExpandContent(!expandContent)}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <div className="article-tile__header">
        <span className="article-tile__date">{date}</span>
        <span className="article-tile__separator" />
        <span className="article-tile__authors-text">Authors</span>
        <span className="article-tile__authors">{authors}</span>
      </div>
      <p className="article-tile__title">{title}</p>
      <p className="article-tile__content">{parse(content)}</p>
      <div className="article-tile__link-container">
        <span className="article-tile__link-label">Source link:</span>
        <a
          href={source}
          className="article-tile__source-link"
          target="_blank"
          rel="noreferrer">
          {source}
        </a>
      </div>
    </div>
  )
}

export default ArticleTile
