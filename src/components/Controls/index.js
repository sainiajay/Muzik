import React, { useEffect } from "react"
import style from "./Controls.module.css"
import { useStateValue } from "./../../context/StateProvider"
import { withStyles } from '@material-ui/core/styles'
import Slider from "@material-ui/core/Slider"
import PlayCircle from "@material-ui/icons/PlayCircleFilled"
import PauseCircle from "@material-ui/icons/PauseCircleFilled"  
import SkipNext from "@material-ui/icons/SkipNext"
import SkipPrevious from "@material-ui/icons/SkipPrevious"
import VolumeDown from "@material-ui/icons/VolumeDown"
import Shuffle from "@material-ui/icons/Shuffle"
import Repeat from "@material-ui/icons/Repeat"

const WhiteSlider = withStyles({
  root: {
    color: '#fff'
  },
  thumb: {
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
})(Slider)

const Controls = () => {
  const [{ item, playing, spotify }, dispatch] = useStateValue()

  useEffect(() => {
    if(!spotify) {
        return
    }
    spotify.getMyCurrentPlaybackState({ }).then((r) => {
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

      <div className={style.MainControl}>
        <Shuffle style={{ color: '#fff' }} />
        <SkipPrevious style={{ color: '#fff' }} />
        {playing ? (
          <PlayCircle fontSize="large" style={{ color: '#fff' }} />
        ) : (
          <PauseCircle fontSize="large" style={{ color: '#fff' }} />
        )}
        <SkipNext style={{ color: '#fff' }} />
        <Repeat style={{ color: '#fff' }} />
        <div className={style.TrackSlider}>
          <WhiteSlider aria-labelledby="continuous-slider"/>
        </div>
      </div>
      <div className={style.Right}>
        <div className={style.VolumeControl}>
          <VolumeDown />
          <WhiteSlider aria-labelledby="continuous-slider"/>
        </div>
      </div>
    </div>
  )
}

export default Controls
