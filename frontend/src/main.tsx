import { ThemeProvider, createTheme } from "@mui/material"
import axios from "axios"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"
import "./index.scss"
import DataStoreProvider from "./providers/dataStore/index.tsx"

axios.defaults.baseURL = "http://localhost:80/"

const theme = createTheme({
  palette: {
    primary: {
      main: "#0093DD",
    },
  },
  typography: {
    fontFamily: "Font Awesome 5 Brands",
    fontWeightRegular: 400,
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DataStoreProvider>
          <App />
        </DataStoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
