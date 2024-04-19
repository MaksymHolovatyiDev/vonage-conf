import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import logo from "@/assets/images/logo.jpg";

interface IProps{
    text: string;
    navigationText: string;
    navigationLink: string;
    children: React.ReactNode
}

const AuthLayout =({text, navigationText, navigationLink, children}: IProps)=>{
    return (
        <main className={styles.auth}>
            <div className={styles["auth__bg"]}/>
            <div className={styles["auth__container"]}>
                <div className={styles["auth__container--inner"]}>
                    <p className={styles["auth__greeting--text"]}>Nice ot see you again</p>
                    {children}
                    <div className={styles["auth__navigation--container"]}><p>{text} <Link to={navigationLink} className={styles["auth__navigation--text"]}>{navigationText}</Link></p></div>
                    </div>
                <div className={styles["auth__logo-wrapper"]}>
                    <img className={styles["auth__logo"]} src={logo}/>
                    <p className={styles["auth__logo--text"]}>UI Unicorn</p>
                </div>
            </div>
        </main>
    );
}

export default AuthLayout;