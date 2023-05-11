import styles from "../Styles/Header.module.css";

const Header = () => {
  return (
    <nav className={styles.container}>
      <h1>Logo</h1>
      <div>
        <ul>
          <li>Filmes</li>
          <li>Séries</li>
          <li>Nos Cinemas</li>
          <li>Cadastro</li>
          <li>Login</li>
        </ul>
      </div>
    </nav>
  )
}

export default Header