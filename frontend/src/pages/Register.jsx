import { Fragment } from "react";

import Navbar from "../components/Navbar";

function Register() {
  const handleSubmit = () => {};

  return (
    <Fragment>
      <Navbar />
      <div className="position-absolute top-50 start-50 translate-middle">
        <div>Register</div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <input
            className="mb-3"
            placeholder="Username"
            name="username"
            type="text"
          ></input>
          <input
            className="mb-3"
            placeholder="Password"
            name="password"
            type="password"
          ></input>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Register;
