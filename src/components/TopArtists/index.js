import React from "react"
// import style from "./index.module.css"
import globalStyles from "../../styles/index.module.css";

import { useStateValue } from "../../context/StateProvider"
import PlayArrow from "@material-ui/icons/PlayArrow"

const TopArtists = () => {
    const [{ top_artists, spotify, player }] = useStateValue()
    const handlePlayTrack = (event) => {
        spotify.play({
            device_id: player._options.id,
            context_uri: event.currentTarget.dataset.artistUri
        })
    }
    
    return (
        <div>
            <h2>Top Artists</h2>
            <div className={globalStyles.ItemGrid}>
                {
                    top_artists?.slice(0, 5).map((artist) => (
                        <div key={artist.id} className={globalStyles.ItemContainer}>
                            <div className={globalStyles.ItemImageWrapper}>
                                <img src={artist.images[2].url} alt={artist.name}/>
                            </div>
                            <div className={globalStyles.ItemContent}>
                                <div className={globalStyles.DetailContainer}>
                                    <a href={artist.external_urls.spotify} className={globalStyles.ItemName}>{artist.name}</a>
                                </div>
                                <div className={globalStyles.PlayButtonContainer}>
                                    <button className={globalStyles.PlayButton} data-artist-uri={artist.uri} onClick={handlePlayTrack}>
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

export default TopArtists