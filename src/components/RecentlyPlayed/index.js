import React from "react"
// import style from "./index.module.css"
import globalStyles from "../../styles/index.module.css";

import { useStateValue } from "../../context/StateProvider"
import PlayArrow from "@material-ui/icons/PlayArrow"

const RecentlyPlayed = () => {
    const [{ spotify, player, recent_items }] = useStateValue() 
    
    const handlePlayTrack = (event) => {
        const trackUri = event.currentTarget.dataset.trackUri
        const contextUri = event.currentTarget.dataset.contextUri
        if(contextUri) {
            spotify.play({
                device_id: player._options.id,
                context_uri: contextUri,
                offset: {
                    uri: trackUri
                }
            })
        }
        else {
            spotify.play({
                device_id: player._options.id,
                uris: [trackUri]
            })
        }
    }

    return (
        <div>
            <h2>Recently Played</h2>
            <div className={globalStyles.ItemGrid}>
                {
                    recent_items?.slice(0, 5).map(({ track, context }) => (
                        <div key={track.id} className={globalStyles.ItemContainer}>
                            <div className={globalStyles.ItemImageWrapper}>
                                <img src={track.album.images[1].url}/>
                            </div>
                            <div className={globalStyles.ItemContent}>
                                <div className={globalStyles.DetailContainer}>
                                    <a href={track.external_urls.spotify} className={globalStyles.ItemName}>{track.name}</a>
                                </div>
                                <div className={globalStyles.PlayButtonContainer}>
                                    <button className={globalStyles.PlayButton} data-context-uri={context?.uri} data-track-uri={track.uri} onClick={handlePlayTrack}>
                                        <PlayArrow style={{ color: '#fff' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentlyPlayed