import React from "react"
import Login from "./../components/Login"
import Player from "./../components/Player"

export default function Home({ location }) {
  const access_token = new URLSearchParams(location.hash.substring(1)).get('access_token')
  if(!access_token) {
    return <Login />
  }
  return <Player />
}
