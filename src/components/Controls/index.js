import React, { useRef, useEffect, useState } from "react"
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
  const [{ player, item }, dispatch] = useStateValue()
  const [state, setState] = useState({})
  const handlePlayerError = (message) => console.error(message)
  const handlePlayerReady = (response) => {
      console.log('ready:', response)
      player.getCurrentState().then(state => console.log('State:', state))
  }
  const initPlayer = () => {
      
      if(!player) {
          return
      }

      // Error handling
      player.addListener('initialization_error', handlePlayerError);
      player.addListener('authentication_error', handlePlayerError);
      player.addListener('account_error', handlePlayerError);
      player.addListener('playback_error', handlePlayerError);
  
      // Playback status updates
      player.addListener('player_state_changed', state => { 
        console.log(state);
        setState(state);
      });

      // Ready
      player.addListener('ready', handlePlayerReady);
  
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
      });
  
      // Connect to the player!
      player.connect();
  }

  useEffect(initPlayer, [player])

  const INTERVAL = 500
  const sliderRef = useRef(null)

  const handlePlayPause = () => player?.togglePlay()
    .then(() => {
      console.log('Toggled playback!');
    });

  const skipNext = () => player?.nextTrack()

  const skipPrevious = () => player?.previousTrack()

  return (
    <div className={style.Controls}>
      <div className={style.Logo}>
        <img
          className={style.AlbumLogo}
          src={state.track_window?.current_track?.album.images[0].url}
          alt={state.track_window?.current_track?.name}
        />
        <div className={style.SongInfo}>
          <h4>{state.track_window?.current_track?.name || 'No Track Playing'}</h4>
          {
            state.track_window?.current_track?.artists
            .map((artist) => <a key={artist.uri} href="123">{artist.name}</a>)
          }
        </div>
      </div>

      <div className={style.MainControl}>
        <Shuffle style={{ color: '#fff' }} />
        <SkipPrevious style={{ color: '#fff' }} onClick={skipPrevious} />
        {state.paused ? (
          <PlayCircle fontSize="large" style={{ color: '#fff' }} onClick={handlePlayPause} />
        ) : (
          <PauseCircle fontSize="large" style={{ color: '#fff' }} onClick={handlePlayPause} />
        )}
        <SkipNext style={{ color: '#fff' }} onClick={skipNext}/>
        <Repeat style={{ color: '#fff' }} />
        <div className={style.TrackSlider}>
          <WhiteSlider
            ref={sliderRef}
            aria-labelledby="continuous-slider"
            min={0} defaultValue={0} value={state.position || 0}
            max={state.duration}
          />
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
