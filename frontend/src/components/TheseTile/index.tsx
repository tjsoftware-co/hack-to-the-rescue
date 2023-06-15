import { TheseTileProps } from "./interface"
import "./styles.scss"

const TheseTile = ({ these, indicator, onClick }: TheseTileProps) => {
  return (
    <div className="these-tile" onClick={onClick}>
      <span className="these-tile__indicator">{indicator}</span>
      <p className="these-tile__content">{these}</p>
    </div>
  )
}

export default TheseTile
