import React, { useEffect } from "react"
import { useStateValue } from "./../context/StateProvider"
import RecentlyPlayed from "../components/RecentlyPlayed"
import Login from "../components/Login"
import SpotifyWebApi from "spotify-web-api-js"
import TopTracks from "../components/TopTracks"
import TopArtists from "../components/TopArtists"

const initializeAppState = (spotify, token, dispatch) => () => {
  if (!spotify) {
    if(!token) {
      return
    }
    const newSpotify = new SpotifyWebApi()
    newSpotify.setAccessToken(token)
    dispatch({
      type: "SET_SPOTIFY",
      spotify: newSpotify
    })
    return;
  }

  spotify
    .getMe()
    .then((user) => {
      console.log('user', user)
      dispatch({
        type: "SET_USER",
        user,
      })
    })

  spotify
    .getMyTopTracks()
    .then((response) => {
        dispatch({
            type: "SET_TOP_TRACKS",
            top_tracks: response.items
        })
    })

  spotify
    .getMyTopArtists()
    .then((response) => {
        dispatch({
           type: "SET_TOP_ARTISTS",
           top_artists: response.items
        })
    })
  
  spotify
    .getUserPlaylists()
    .then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists,
      })
    })

  spotify
    .getMyRecentlyPlayedTracks()
    .then((response) => {
        dispatch({
           type: "SET_RECENT",
           recent_items: response.items
        })
    })
}

const Home = ({ location }) => {
  const token = new URLSearchParams(location.hash?.substring(1)).get('access_token')
  const [{ spotify }, dispatch] = useStateValue()
  useEffect(initializeAppState(spotify, token, dispatch), [spotify])
  
  return (
    <React.Fragment>
      <RecentlyPlayed />
      <TopTracks />
      <TopArtists />
      <Login />
    </React.Fragment>
  )
}

export default Home