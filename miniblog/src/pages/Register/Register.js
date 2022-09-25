import styles from "./Register.module.css";

import {useState, useEffect} from 'react';
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    };

    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais");
      return
    }

    const res = await createUser(user);

    console.log(res);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  },[authError]);
  
  
  return (
    <div className={styles.register}>
        <h1>Cadastre-se</h1>
        <p >É rápido e fácil</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
              type="text" 
              name="displayName" 
              required 
              placeholder="Nome de usuário" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Nova senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              placeholder="Confirme sua senha" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  
            />
          </label>
          {!loading && <button className="btn">Cadastra-se</button>}
          {loading && <button className="btn" disable>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  );
};

export default Register;