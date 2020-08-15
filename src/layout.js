import React from "react"
import { StateProvider } from "./context/StateProvider"
import reducer, { initialState } from "./reducer";
import Player from "./components/Player"

const Layout = (props) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Player {...props} />
    </StateProvider>
  )
}

export default Layout