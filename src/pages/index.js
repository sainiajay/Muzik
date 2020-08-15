import React, { useEffect } from "react"
import { useStateValue } from "./../context/StateProvider"
import RecentlyPlayed from "../components/RecentlyPlayed"

const initializeAppState = (s, dispatch) => () => {
  if (!s) {
    return
  }

  dispatch({
    type: "SET_SPOTIFY",
    spotify: s
  })
  
  s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) => {
    console.log('weekly', response)
    dispatch({
      type: "SET_DISCOVER_WEEKLY",
      discover_weekly: response,
    })
  }
  )

  s.getMyTopArtists().then((response) => {
    console.log('top_artists', response)
    dispatch({
      type: "SET_TOP_ARTISTS",
      top_artists: response,
    })
  }
  )

  s.getMe().then((user) => {
    console.log('user', user)
    dispatch({
      type: "SET_USER",
      user,
    })
  })
}

const Home = ({ location }) => {
  const [{ spotify, token }, dispatch] = useStateValue()
  if(!spotify) {
    const token = new URLSearchParams(location.hash?.substring(1)).get('access_token')
    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(token)
  }
  useEffect(initializeAppState(spotify, dispatch), [])
  return (
    <div>
      <RecentlyPlayed />
    </div>
  )
}

export default Home