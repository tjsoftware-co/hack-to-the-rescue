import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import getCurrentRoute from "../../utils/getCurrentRoute"
import "./styles.scss"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activePage, setActivePage] = useState(getCurrentRoute(location))

  const handleChange = (_event: React.SyntheticEvent, newPage: string) => {
    if (newPage === activePage) return

    setActivePage(newPage)
    navigate(newPage)
  }

  return (
    <div className="navbar">
      <div className="navbar__left-logs-container">
        <img src="src/assets/eucap_logo.png" alt="Eucap logo" />
      </div>
      <Tabs value={activePage} className="navbar__tabs" onChange={handleChange}>
        <Tab
          className="navbar__tab"
          value="/information-verification"
          label="Information Verification"
        />
        <Tab
          className="navbar__tab"
          value="/autism-care-roadmap"
          label="Autism Care Roadmap"
        />
      </Tabs>
      <div className="navbar__right-logs-container">
        <img
          className="navbar__triada-logo"
          src="src/assets/triada_logo.png"
          alt="Triada logo"
        />
        <img src="src/assets/bluerider_logo.png" alt="Bluerider logo" />
      </div>
    </div>
  )
}

export default Navbar
