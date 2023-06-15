import { createContext, useContext } from "react"

import { DataStoreContextProps } from "./interface"

export const DataStoreContext = createContext<DataStoreContextProps>(
  {} as DataStoreContextProps
)

export const useDataStore = () => useContext(DataStoreContext)
