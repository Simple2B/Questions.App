import React from "react";
import "./registration.css"

export const Registration = () => {
  return(
    <div className="registration">
      <h2 className="registration_title">Sign Up</h2>
      <form className="registration_form">
        <div className="registration_form-names">
          <div className="registration_first-name">
            <label className="registration_first-name-input-text" htmlFor="registration_first-name-input">First name</label>
            <input id="registration_first-name-input" className="registration_first-name-input" name="registration_first-name-input" type="text" required/>
          </div>

          <div className="registration_last-name">
            <label className="registration_last-name-input-text" htmlFor="registration_last-name-input">Last name</label>
            <input id="registration_first-name-input" className="registration_first-name-input" name="registration_first-name-input" type="text" required/>
          </div>
        </div>

        <div className="registration_form-email-block">
        <label className="registration_form-email-text" htmlFor="registration_form-email">Email</label>
        <input id="registration_form-email" className="registration_form-email" name="registration_form-email" type="email" required/>
        </div>

        <div className="registration_form-passwords">
          <div>
            <label className="registration_form-password-text" htmlFor="registration_form-password">Password</label>
            <input id="registration_form-password" className="registration_form-password" name="registration_form-password" type="password"required/>
          </div>

          <div>
            <label className="registration_form-pass-conf-text" htmlFor="registration_form-pass-conf">Confirm password</label>
            <input id="registration_form-pass-conf" className="registration_form-pass-conf" name="registration_form-pass-conf" type="password"required/>
          </div>
        </div>

        <button className="registration_button">Sing up</button>
      </form>

      <p className="registration_text">Already have an account? <a href="/login">Sing in</a></p>
    </div>
  )
}
