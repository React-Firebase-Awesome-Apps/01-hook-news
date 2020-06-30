import React from "react";

import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

const Login = props => {
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="Your email"
          autoComplete="off"
        />
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="Choose a secure password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
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
