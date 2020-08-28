import React from "react"
import style from "./Sidebar.module.css"
import { useStateValue } from "./../../context/StateProvider"
import Logo from "./../Logo";

import HomeIcon from "@material-ui/icons/HomeOutlined"
import SearchIcon from "@material-ui/icons/Search"
import LibraryIcon from "@material-ui/icons/LibraryMusicOutlined"
import AddIcon from "@material-ui/icons/Add"
import FavoriteIcon from "@material-ui/icons/Favorite"

function Sidebar() {
  const [{ playlists }] = useStateValue()

  return (
    <div className={style.SidebarContainer}>
      <div className={style.Sidebar}>
        <div className={style.SidebarLogo}>
          <Logo />
        </div>
        <div className={style.SidebarOption} data-active="true">
          <HomeIcon className={style.SidebarOptionIcon}/>
          <h4>Home</h4>
        </div>
        <div className={style.SidebarOption}>
          <SearchIcon className={style.SidebarOptionIcon}/>
          <h4>Search</h4>
        </div>
        <div className={style.SidebarOption}>
          <LibraryIcon className={style.SidebarOptionIcon}/>
          <h4>Your Library</h4>
        </div>
        <h3 className={style.Title}>PLAYLISTS</h3>
        <div className={style.SidebarOption}>
          <AddIcon fontSize="large" className={style.AddIcon}/>
          <h4>Create Playlist</h4>
        </div>
        <div className={style.SidebarOption}>
          <FavoriteIcon fontSize="large" className={style.FavoriteIcon}/>
          <h4>Liked Songs</h4>
        </div>
        <hr />
        {
          playlists?.items?.map(playlist => <a className={style.Playlist} key={playlist.id} href="#">{playlist.name}</a> )
        }
      </div>
    </div>
  )
}

export default Sidebar
