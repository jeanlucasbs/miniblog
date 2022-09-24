import styles from "./Register.module.css";

const Register = () => {
  return (
    <div>
        <h1>Cadastre-se</h1>
        <p className={styles.register}>É rápido e fácil</p>
        <form>
          <label>
            <input type="text" name="displayName" required placeholder="Nome de usuário" />
          </label>
          <label>
            <input type="email" name="email" required placeholder="Email" />
          </label>
          <label>
            <input type="password" name="password" required placeholder="Nova senha" />
          </label>
          <label>
            <input type="password" name="confirmPassword" required placeholder="Confirme sua senha" />
          </label>
          <button className="btn">Cadastra-se</button>
        </form>
    </div>
  );
};

export default Register;