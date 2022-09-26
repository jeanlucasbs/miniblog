import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css";

import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();
    
    return(
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" end className={({isActive}) => (isActive ? styles.active : '')}>
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>
                                Login
                            </NavLink>
                         </li>

                        <li>
                            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>
                                Cadastrar
                            </NavLink>
                        </li>                    
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : '')}>
                                Novo Post
                            </NavLink>
                         </li>

                        <li>
                            <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : '')}>
                                Dashboard
                            </NavLink>
                        </li>                    
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;