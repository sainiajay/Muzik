import React, { useEffect } from "react"
import style from "./index.module.css"
import Sidebar from "./../Sidebar"
import Controls from "./../Controls"
import { useStateValue } from "../../context/StateProvider"

const Player = ({ children }) => {
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