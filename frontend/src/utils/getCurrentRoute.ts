import { Location } from "react-router-dom"

const getCurrentRoute = (location: Location) => {
  const pathname = location.pathname

  if (pathname === "/") {
    return "/information-verification"
  }

  return pathname
}

export default getCurrentRoute
