import { Navigate, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Page1 from "./pages/Page1"
import Page2 from "./pages/Page2"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/information-verification" />} />
        <Route path={"/information-verification"} element={<Page1 />} />
        <Route path={"/autism-care-roadmap"} element={<Page2 />} />
      </Routes>
    </>
  )
}

export default App
