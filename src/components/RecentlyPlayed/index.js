import React from "react"
// import style from "./index.module.css"
import globalStyles from "../../styles/index.module.css";

import { useStateValue } from "../../context/StateProvider"
import PlayArrow from "@material-ui/icons/PlayArrow"

const RecentlyPlayed = () => {
    const [{ recent_items }] = useStateValue() 
    console.log('recent_items', recent_items)
    return (
        <div>
            <h2>Recently Played</h2>
            <div className={globalStyles.ItemGrid}>
                {
                    recent_items?.slice(0, 5).map(({ track }) => (
                        <div key={track.id} className={globalStyles.ItemContainer}>
                            <div className={globalStyles.ItemImageWrapper}>
                                <img src={track.album.images[1].url}/>
                            </div>
                            <div className={globalStyles.ItemContent}>
                                <div className={globalStyles.DetailContainer}>
                                    <a href={track.external_urls.spotify} className={globalStyles.ItemName}>{track.name}</a>
                                </div>
                                <div className={globalStyles.PlayButtonContainer}>
                                    <button className={globalStyles.PlayButton}>
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