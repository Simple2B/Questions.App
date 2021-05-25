import React from "react";
import "./login.css"

export const Login = () => {
  return(
    <div className="login">
      <h2 className="login_title">Sign In</h2>
      <form>
        <div className="login_form">
          <label className="login_email-text" htmlFor="login_email">Email</label>
          <input id="login_email" className="login_email" name="login_email" type="email" required/>
        </div>

        <div className="login_form">
        <label className="login_password-text" htmlFor="login_password">Password</label>
        <input id="login_password" className="login_password" name="login_password" type="password" required/>
        </div>

        <button className="login_button">Sing in</button>
      </form>

      <p className="login_text">Don't have an account? <a href="/registration">Sing up</a></p>
    </div>
  )
}
