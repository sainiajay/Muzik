import React from "react"
import style from "./index.module.css"
import Sidebar from "./../Sidebar"

const Player = () => {
    return (<div className={style.Player}>
        <div className={style.Body}>
            <Sidebar />
        </div>
    </div>)
}

export default Player