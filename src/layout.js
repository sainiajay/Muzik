import React from "react"
import { StateProvider } from "./context/StateProvider"
import reducer, { initialState } from "./reducer";
import Player from "./components/Player"
import { Helmet } from "react-helmet";

const Layout = (props) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Ultra&display=swap" rel="stylesheet" />
        <script src="init-player.js"></script>
      </Helmet>
      <Player {...props} />
    </StateProvider>
  )
}

export default Layout