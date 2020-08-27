import React from "react"
import style from "./Logo.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMusic } from "@fortawesome/free-solid-svg-icons"

const Logo = ({ size }) => (
    <div className={style.LogoWrapper} style={{fontSize: size}}>
        <div className={style.Icon}>
            <FontAwesomeIcon icon={faMusic} size="3x" />
        </div>
        <div className={style.Name}>
            MUZIK
        </div>
    </div>
)

export default Logo