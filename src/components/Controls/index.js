import React, { useEffect, useState } from "react"
import style from "./index.module.css"
import { useStateValue } from "./../../context/StateProvider"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faPlayCircle,
    faPauseCircle,
    faStepForward,
    faStepBackward,
    faVolumeDown,
    faRandom,
    faRedo
} from "@fortawesome/free-solid-svg-icons"

const Controls = () => {
  const [{ item, playing, spotify }, dispatch] = useStateValue()

  useEffect(() => {
    if(!spotify) {
        return
    }
    spotify.getMyCurrentPlaybackState({}).then((r) => {
        console.log('current playback', r)
        if(!r) {
            return
        }
        dispatch({
          type: "SET_PLAYING",
          playing: r.is_playing,
        })
  
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        })
    })
  }, [spotify])

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause()
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      })
    } else {
      spotify.play()
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      })
    }
  }

  const skipNext = () => {
    spotify.skipToNext()
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      })
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      })
    })
  }

  const skipPrevious = () => {
    spotify.skipToPrevious()
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      })
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      })
    })
  }

  return (
    <div className={style.Controls}>
      <div className={style.Logo}>
        <img
          className={style.AlbumLogo}
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className={style.SongInfo}>
            <h4>{item.name}</h4>
            {
              item.artists.map((artist) => <a key={artist.id} href="123">{artist.name}</a>)
            }
          </div>
        ) : (
          <div className={style.SongInfo}>
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className={style.Center}>
        <FontAwesomeIcon icon={faRandom} className={style.Green} />
        <FontAwesomeIcon icon={faStepBackward} className={style.Icon} onClick={skipNext}/>
        {playing ? (
          <FontAwesomeIcon icon={faPauseCircle} className={style.Icon} onClick={handlePlayPause} size="3x"/>
        ) : (
          <FontAwesomeIcon icon={faPlayCircle} className={style.Icon} onClick={handlePlayPause} size="3x"/>
        )}
        <FontAwesomeIcon icon={faStepForward} className={style.Icon} onClick={skipPrevious}/>
        <FontAwesomeIcon icon={faRedo} className={style.Green} />
      </div>
      <div className={style.Right}>
        <FontAwesomeIcon icon={faVolumeDown} className={style.Icon} onClick={skipPrevious}/>
      </div>
    </div>
  )
}

export default Controls
