import React, { useEffect } from "react"
import { useStateValue } from "./../context/StateProvider"
import RecentlyPlayed from "../components/RecentlyPlayed"
import Login from "../components/Login"
import SpotifyWebApi from "spotify-web-api-js"
import TopTracks from "../components/TopTracks"
import TopArtists from "../components/TopArtists"

const initPlayer = (token, dispatch) => {
  if(!window.Spotify || !window.Spotify.Player) {
    window.addEventListener('spotifyReady', initPlayer.bind(null, token, dispatch));
    return;
  }
  const getOAuthToken = token_callback => 
    dispatch({
      type: "SET_TOKEN_CALLBACK",
      token_callback
    })
  dispatch({
    type: "SET_PLAYER",
    player: new window.Spotify.Player({name: 'Muzik Player', getOAuthToken})
  })
}

const initializePageState = (spotify, token, dispatch) => {
  const handleApiError = (response) => {
    if(response.status === 401) {
      localStorage.removeItem('$token')
      dispatch({
        type: "SET_SPOTIFY",
        token: null
      })
    }
  }
  if(token) {
    localStorage.setItem('$token', token)
    window.history.replaceState({}, document.title, document.location.pathname)
  }
  const storedToken = localStorage.getItem('$token')
  if(!storedToken) {
    return
  }

  dispatch({
    type: "SET_TOKEN",
    token: storedToken
  })

  if (!spotify) {
    return;
  }

  spotify
    .getMe()
    .then((user) => {
      dispatch({
        type: "SET_USER",
        user,
      })
    })
    .catch(handleApiError)

  spotify
    .getMyTopTracks()
    .then((response) => {
        dispatch({
            type: "SET_TOP_TRACKS",
            top_tracks: response.items
        })
    })
    .catch(handleApiError)

  spotify
    .getMyTopArtists()
    .then((response) => {
        dispatch({
           type: "SET_TOP_ARTISTS",
           top_artists: response.items
        })
    })
    .catch(handleApiError)
  
  spotify
    .getUserPlaylists()
    .then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        })
    })
    .catch(handleApiError)

  spotify
    .getMyRecentlyPlayedTracks()
    .then((response) => {
        const track_ids = response.items.map(item => item.track.uri)
        const uniqueItems = response.items.filter((item, index) => track_ids.indexOf(item.track.uri) === index)
        dispatch({
           type: "SET_RECENT",
           recent_items: uniqueItems
        })
    })
    .catch(handleApiError)
}

const Home = ({ location }) => {
  const token = new URLSearchParams(location.hash?.substring(1)).get('access_token')
  const [{ spotify }, dispatch] = useStateValue()
  useEffect(() => {
    initPlayer(token, dispatch);
    initializePageState(spotify, token, dispatch);
  }, [spotify])
  
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