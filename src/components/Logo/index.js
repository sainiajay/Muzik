import React from "react"
import style from "./Logo.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"

const Logo = ({ size }) => (
    <div className={style.LogoWrapper}>
        <div className={style.Icon}>
            <FontAwesomeIcon icon={faPlayCircle} size={size || "4x"} />
        </div>
        <div className={style.Name}>
            Muzik
        </div>
    </div>
)

export default Logo