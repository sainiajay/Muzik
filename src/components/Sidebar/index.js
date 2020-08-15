import React from "react"
import style from "./index.module.css"
import { useStateValue } from "./../../context/StateProvider"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faSearch, faMusic } from "@fortawesome/free-solid-svg-icons"

const SidebarOption = ({ option = "test", icon }) => {
    return (
      <div className={style.SidebarOption}>
        {icon && <FontAwesomeIcon icon={icon} size="2x" className={style.SidebarOptionIcon} />}
        {icon? <h4>{option}</h4> : <p>{option}</p>}
      </div>
    )
}

function Sidebar() {
  const [{ playlists }] = useStateValue()

  return (
    <div className={style.SidebarContainer}>
      <div className={style.Sidebar}>
        <img
          className={style.Logo}
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <SidebarOption option="Home" icon={faHome}/>
        <SidebarOption option="Search" icon={faSearch}/>
        <SidebarOption option="Your Library" icon={faMusic}/>
        <br />
        <strong className={style.Title}>PLAYLISTS</strong>
        <hr />
        {
          playlists?.items?.map(playlist => <SidebarOption key={playlist.id} option={playlist.name} />)
        }
      </div>
    </div>
  )
}

export default Sidebar
