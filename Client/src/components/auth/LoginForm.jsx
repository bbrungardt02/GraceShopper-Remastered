import { useState } from "react";
import { loginUser } from "../../../src/api/userAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 5) {
      setError("username must be longer than 5 characters");
      return;
    }

    try {
      let result;
      result = await loginUser(username, password);

      console.log("Result after login: ", result);
      if (result.success) {
        console.log("About to set logged in...");
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="route_flex">
      <div className="auth-form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            required
            className="input"
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
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="productbtn" type="submit">
            Submit
          </button>
        </form>
        <p>
          Is This Your First Visit?&nbsp;&nbsp;
          <a className="loginTag" href="/register">
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
}
