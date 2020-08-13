import React from "react"
import { StateProvider } from "./context/StateProvider"
import reducer, { initialState } from "./reducer";

export default function Layout({ children }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </StateProvider>
  )
}