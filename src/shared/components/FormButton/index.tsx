// Styles
import styles from './index.module.scss';

interface IProps{
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
}

const FormButton = ({type = "button", children}: IProps) =>{
    return <button className={styles.button} type={type}>{children}</button>
}

export default FormButton;