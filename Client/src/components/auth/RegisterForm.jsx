import registerUser from "../../api/userAuth";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RegisterForm() {
  const { setLoggedIn, setUser, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 5) {
      setError("username must be longer than 5 characters");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("passwords don't match");
      return;
    }
    if (email.length === undefined) {
      setError("email is undefined");
      return;
    }

    try {
      let result;

      result = await registerUser({ username, email, password });
      console.log("result:", result);
      if (result.success) {
        console.log("About to set logged in...");
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="route_flex">
      <div className="register-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            className="input"
            required
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            className="input"
            required
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="input righty"
            required
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account?&nbsp;&nbsp;
          <a className="loginTag" href="/login">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
