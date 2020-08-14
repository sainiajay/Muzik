import React from "react"
import { StateProvider } from "./context/StateProvider"
import reducer, { initialState } from "./reducer";
import SpotifyWebApi from "spotify-web-api-js"
import Login from "./components/Login"
import Player from "./components/Player"

const Layout = ({ children }) => {
  initialState.token = new URLSearchParams(document.location.hash?.substring(1)).get('access_token')
  initialState.spotify = new SpotifyWebApi()
  initialState.spotify.setAccessToken(initialState.token)

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {initialState.token ? <Player children={children}/> : <Login />}
    </StateProvider>
  )
}

export default Layout