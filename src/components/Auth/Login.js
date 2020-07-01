import React from "react";

import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

const Login = props => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      console.log({ response });
    } catch (err) {
      console.error("Authentication Error ", err);
      setFirebaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          name="email"
          className={errors.email && "error-input"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          className={errors.password && "error-input"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {!!firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prev => !prev)}
          >
            {login ? "need to create an account?" : "already have an account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
