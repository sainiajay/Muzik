import React from "react"
import style from "./index.module.css"
import { accessUrl } from "./spotify"

const Login = () => {
  return (
    <div className={style.login}>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Muzik Logo"
      />
      <a href={accessUrl}>LOGIN USING SPOTIFY</a>
    </div>
  );
}

export default Login;
