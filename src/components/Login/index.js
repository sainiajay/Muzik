import React from "react"
import style from "./Login.module.css"
import Logo from "./../Logo";

import { accessUrl } from "./spotify"
import { useStateValue } from "./../../context/StateProvider"

const Login = () => {
  const [{ spotify }] = useStateValue()
  if(spotify) {
    return ""
  }

  return (
    <div className={style.BackdropContainer}>
      <div className={style.LoginContainer}>
        <div className={style.login}>
          {/* <img
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="Muzik Logo"
          /> */}
          <Logo />
          <a href={accessUrl}>LOGIN USING SPOTIFY</a>
        </div>
      </div>
    </div>
  )
}

export default Login;
