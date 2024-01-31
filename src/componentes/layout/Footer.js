import { FaLinkedin, FaGithub} from 'react-icons/fa';
import styles from './Footer.module.css'
function Footer(){
    const linkedin = "https://www.linkedin.com/in/felipe-araujo-9303b720b/";
    const gitHub = "https://github.com/FelipeArauj0";
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><a href={gitHub} target='_blank'><FaGithub/></a></li>
                <li><a href={linkedin} target='_blank'><FaLinkedin/></a></li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs </span> &copy; Felipe Araujo 2024
            </p>
        </footer>
    )
}

export default Footer;