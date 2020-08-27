import React, { useEffect } from "react"
import style from "./index.module.css"
import Sidebar from "./../Sidebar"
import Controls from "./../Controls"
import { useStateValue } from "../../context/StateProvider"

const Player = ({ children }) => {
    const [{ spotify }] = useStateValue()
    const handlePlayerError = ( message ) => console.error(message)
    const handlePlayerReady = (player) => (response) => {
        console.log('ready:', response)
        player.getCurrentState().then(state => console.log('State:', state))
    }

    const initPlayer = () => {
        if(!spotify) {
            return
        }
        const token = spotify.getAccessToken();
        const player = new window.Spotify.Player({
            name: 'Muzik Player',
            getOAuthToken: cb => { cb(token); }
        });
    
        // Error handling
        player.addListener('initialization_error', handlePlayerError);
        player.addListener('authentication_error', handlePlayerError);
        player.addListener('account_error', handlePlayerError);
        player.addListener('playback_error', handlePlayerError);
    
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', handlePlayerReady(player));
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
    }

    useEffect(() => {
        if(window.Spotify) {
            initPlayer()
        }
        else {
            window.addEventListener('spotifyReady', initPlayer);
        }
    }, [spotify])

    return (
        <div className={style.Player}>
            <div className={style.Container}>
                <Sidebar />
                {children}
            </div>
            <Controls />
        </div>
    )
}

export default Player