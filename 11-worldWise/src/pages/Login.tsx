import {useEffect, useState} from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import type {AuthContextType} from "../type";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import Message from "../components/Message";
import Button from "../components/Button";

export default function Login() {
  const {login, isAuthenticated}: AuthContextType = useAuth();
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("Jack@1234");
  const [error, setError] = useState("");

  useEffect(
    function () {
      console.log(isAuthenticated);
      if (isAuthenticated) navigate("/app", {replace: true});
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = login(email, password);
    if (!success) setError("Wrong email or password");
  }

  return (
    <main className={styles.login}>
      <PageNav />
      {error && <Message message={error} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
