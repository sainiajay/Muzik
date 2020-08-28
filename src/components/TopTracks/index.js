import React from "react"
import style from "./TopTracks.module.css"
import globalStyles from "../../styles/index.module.css"
import PlayArrow from "@material-ui/icons/PlayArrow"

import { useStateValue } from "../../context/StateProvider"

const TopTracks = () => {
    const [{ top_tracks, spotify, player }] = useStateValue()
    const handlePlayTrack = (event) => {
        spotify.play({
            device_id: player._options.id,
            uris: [event.currentTarget.dataset.trackUri]
        })
    }

    return (
        <div>
            <h2>Top Tracks</h2>
            <div className={globalStyles.ItemGrid}>
                {
                    top_tracks?.slice(0, 5).map((track) => (
                        <div key={track.id} className={globalStyles.ItemContainer}>
                            <div className={globalStyles.ItemImageWrapper}>
                                <img src={track.album.images[1].url} alt={track.name}/>
                            </div>
                            <div className={globalStyles.ItemContent}>
                                <div className={globalStyles.DetailContainer}>
                                    <a href={track.external_urls.spotify} className={globalStyles.ItemName}>{track.name}</a>
                                </div>
                                <div className={globalStyles.PlayButtonContainer}>
                                    <button className={globalStyles.PlayButton} data-track-uri={track.uri} onClick={handlePlayTrack}>
                                        <PlayArrow style={{ color: '#fff' }} />
                                    </button>
                                    <label className={style.ArtistName}>{track.artists[0].name}</label>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopTracks