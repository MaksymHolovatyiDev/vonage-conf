import classNames from 'classnames';

// Styles
import styles from './index.module.scss';

interface IProps{
    label?: string;
    value: boolean;
    onChange: (data: React.ChangeEvent<HTMLInputElement>)=>void;
    secondary?: boolean;
}

const Checkbox = ({label, value, onChange, secondary, }: IProps) =>{
    return (
        <label className={classNames([styles.container, {[styles["container-secondary"]]: secondary}])}>
            <div className={ secondary ? classNames([styles["wrapper-secondary"], {[styles["wrapper--blue-secondary"]]: value}]) : classNames([styles.wrapper, {[styles["wrapper--blue"]]: value}]) }>
                <input className={styles.checkbox} type="checkbox" checked={value} onChange={onChange}/>
                <div className={secondary ? styles["checkbox--custom-secondary"] : styles["checkbox--custom"]} />
            </div>
            <p className={styles.text}>{label}</p>
        </label>
    )
}

export default Checkbox;