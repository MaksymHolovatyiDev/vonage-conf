import { useState } from 'react';

import classNames from 'classnames';

// Styles
import styles from './index.module.scss';

// Icons
import EyeIco from '@/assets/images/svg/eye.svg?react';
import { Field } from 'formik';


interface IProps {
    id:string;
    label: string;
    placeholder: string;
    type: string;
    password?: boolean;
    error?: boolean;
    onChange: (data: React.ChangeEvent<HTMLInputElement>)=>void;
}

const FormInput = ({id, label, placeholder, password, error}: IProps) =>{
    const [hiddenText, setHiddenText] = useState<boolean>(true);

    const onButtonClick = () =>{
        setHiddenText(prevState => !prevState);
    }

    return (
        <>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <div className={styles.container}>
                {password && 
                    <button className={classNames([styles.button, {[styles["button--transparent"]]: !hiddenText}])} type="button" onClick={onButtonClick}>
                        <EyeIco />
                    </button>
                }
                <Field className={classNames([styles.input, {[styles["input--error"]]: error}])} type={password && hiddenText ? "password" : "text"} id={id} name={id} placeholder={placeholder}/>
            </div>
        </>
    );
}

export default FormInput;