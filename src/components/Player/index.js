import React, { useEffect } from "react"
import style from "./index.module.css"
import Sidebar from "./../Sidebar"
import Controls from "./../Controls"

const Player = ({ children }) => {
    const handlePlayerError = ({ message }) => console.error(message)

    const initPlayer = () => {
        const token = new URLSearchParams(window.location.hash?.substring(1)).get('access_token')
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
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
    
        console.log('Watta Player!');
    }
    
    useEffect(() => {
        if(window.Spotify) {
            initPlayer()
        }
        else {
            window.addEventListener('spotifyReady', initPlayer);
        }
    })

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