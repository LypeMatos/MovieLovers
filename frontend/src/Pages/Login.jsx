//imports
import api from "../api/api";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  const { setAuth } = useContext(AuthContext);

  const navigation = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg("");
  }, [email, password])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;

      setAuth({ email, accessToken });
      console.log(accessToken);
      setSuccess(true);
      navigation("/");
    } catch (error) {
        if(!error?.response){
          setErrMsg("No Server response");
        }else if(error.response?.status === 400){
          setErrMsg("Missing Email or Password");
        }else if(error.response?.status === 401){
          setErrMsg(error.response.data.message);
        }else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          ref={userRef}
          autoComplete="off"
          placeholder="Digite seu nome de usuário..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
            type="password"
            name="password"
            placeholder="Digite sua senha..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
