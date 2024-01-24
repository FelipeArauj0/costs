import { Link } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../Auth/AuthContext";
import LogoutButton from "./LogoutButton"

import Container from "./Container";
import styles from './NavBar.module.css';
import logo from '../../img/costs_logo.png';

function NavBar(){
    const authContext = useContext(AuthContext)

    let userLogado = false;
    if (!authContext) {
        console.error("AuthContext não foi fornecido corretamente.");
        return null;
    }
    
    const { signed } = authContext
    if(signed){
        userLogado = true
    }else{
        userLogado = false
    }
    return (
    <nav className={styles.navbar}>
        <Container>
            <Link to="/">
                <img src={logo} alt="cost"/>
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                {userLogado ? (
                <li className={styles.item}><Link to="/projetos">Projetos</Link></li>
                ) : null}
                <li className={styles.item}><Link to="/contato">Contato</Link></li>
                <li className={styles.item}><Link to="/sobre">Sobre</Link></li>
                {userLogado ? <LogoutButton/> : null}
            </ul>
        </Container>
    </nav>
    )
}

export default NavBar;