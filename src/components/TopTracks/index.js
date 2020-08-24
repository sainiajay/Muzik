import React from "react"
import style from "./TopTracks.module.css"
import globalStyles from "../../styles/index.module.css"

import { useStateValue } from "../../context/StateProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"

const TopTracks = () => {
    const [{ top_tracks }] = useStateValue()
    console.log('top_tracks', top_tracks)
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
                                    <button className={globalStyles.PlayButton}>
                                        <FontAwesomeIcon icon={faPlayCircle} size="3x"/>
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