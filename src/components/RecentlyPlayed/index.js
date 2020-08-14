import React, { useEffect } from "react"
import style from "./index.module.css"
import globalStyles from "../../styles/index.module.css";

import { useStateValue } from "../../context/StateProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons"

const RecentlyPlayed = () => {
    const [{ recent_items, spotify }, dispatch] = useStateValue() 
    useEffect(() => {
        if(recent_items) {
            return
        }
        spotify
            .getMyRecentlyPlayedTracks()
            .then((response) => {
                console.log('recent', response)
                dispatch({
                   type: "SET_RECENT",
                   recent_items: response.items
                })
            })
    })
    return (
        <div>
            <h2>Recently Played</h2>
            <div className={globalStyles.ItemGrid}>
                {
                    recent_items?.slice(0, 5).map(({ track }) => (
                        <div key={track.id} className={globalStyles.ItemContainer}>
                            <div className={globalStyles.ItemImageWrapper}>
                                <img src={track.album.images[0].url}/>
                            </div>
                            <div className={globalStyles.ItemContent}>
                                <div className={globalStyles.DetailContainer}>
                                    <a href={track.external_urls.spotify} className={globalStyles.ItemName}>{track.name}</a>
                                </div>
                                <div className={globalStyles.PlayButtonContainer}>
                                    <button className={globalStyles.PlayButton}>
                                        <FontAwesomeIcon icon={faPlayCircle} size="3x"/>
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