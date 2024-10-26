import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import "../Login.css";
import { signInWithGoogle } from "../firebase/signingogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.post("auth/login", {
      email,
      password,
    });

    const data = response.data;

    axios.defaults.headers.Authorization = `Bearer ${data.token}`;

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    setRedirect(true);
  };

  const google = async () => {
    const success = await signInWithGoogle();

    if (success) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
      <button className="w-100 btn btn-lg btn-primary" onClick={google}>
        Google
      </button>
    </main>
  );
};

export default Login;
