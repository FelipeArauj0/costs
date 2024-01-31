import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import styles from "./Contato.module.css"

function Contato(){
    const linkzap = "https://w.app/QWpTVO";
    const linkedin = "https://www.linkedin.com/in/felipe-araujo-9303b720b/";
    return (
        
        <div className={styles.contato_container}>
            <h1>Contato</h1>
            <ul>
                <li><a href={linkzap}><FaWhatsapp/> Whatsapp</a></li>
                <li><a href={linkedin}><FaLinkedin/> Linkedin</a></li>
            </ul>
        </div>
       
    )
}

export default Contato;