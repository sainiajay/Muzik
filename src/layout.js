import React from "react"
import { StateProvider } from "./context/StateProvider"
import reducer, { initialState } from "./reducer";
import Login from "./components/Login"
import Player from "./components/Player"

const Layout = ({ children }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {initialState.token ? <Player children={children}/> : <Login />}
    </StateProvider>
  )
}

export default Layout