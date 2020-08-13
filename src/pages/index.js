import React, { useEffect } from "react"
import Login from "./../components/Login"
import Player from "./../components/Player"
import SpotifyWebApi from "spotify-web-api-js"
import { useStateValue } from "./../context/StateProvider"

const initializeAppState = (s, dispatch) => () => {
  if (!s) {
    return
  }

  dispatch({
    type: "SET_SPOTIFY",
    spotify: s,
  })

  s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
    dispatch({
      type: "SET_DISCOVER_WEEKLY",
      discover_weekly: response,
    })
  )

  s.getMyTopArtists().then((response) =>
    dispatch({
      type: "SET_TOP_ARTISTS",
      top_artists: response,
    })
  )

  s.getMe().then((user) =>
    dispatch({
      type: "SET_USER",
      user,
    })
  )

  s.getUserPlaylists().then((playlists) =>
    dispatch({
      type: "SET_PLAYLISTS",
      playlists,
    })
  )
}

const Home = ({ location }) => {
  const access_token = new URLSearchParams(location.hash.substring(1)).get('access_token')
  const spotify = new SpotifyWebApi()
  spotify.setAccessToken(access_token)
  const [_, dispatch] = useStateValue()
  useEffect(initializeAppState(spotify, dispatch), [])

  if(!access_token) {
    return <Login />
  }
  return <Player />
}

export default Home