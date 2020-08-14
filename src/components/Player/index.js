import React from "react"
import style from "./index.module.css"
import Sidebar from "./../Sidebar"
import Controls from "./../Controls"

const Player = ({ children }) => {
    return (
        <div className={style.Player}>
            <div className={style.Body}>
                <Sidebar />
                {children}
            </div>
            <Controls />
        </div>
    )
}

export default Player