import React from "react";

import firebase from '../../firebase'
// import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  // const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setPasswordReset(true);
    } catch (err) {
      console.error("Error sending email ", err);
      setPasswordResetError(err.message);
      setPasswordReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <button className="button" onClick={handleResetPassword}>
        Reset Password
      </button>
      {isPasswordReset && <p>Check email to reset password</p>}
      {!!passwordResetError && (
        <p className="error-text">{passwordResetError}</p>
      )}
    </div>
  );
}

export default ForgotPassword;
