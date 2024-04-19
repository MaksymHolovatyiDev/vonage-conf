import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Services
import { userSignUp } from '@/services/auth';

// Notifications
import { failureNotificationMessage } from "@/utils/notifications";

// Constants
import { Routes } from '@/utils/routes';
import { LocalStorageKeys } from "@/utils/constants";
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';

// Types
import { IAuth } from "@/Types/auth";

// Styles
import styles from './index.module.scss';

// Components
import FormInput from '@/shared/components/FormInput';
import FormButton from '@/shared/components/FormButton';
import AuthLayout from '@/shared/layouts/auth';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value);
    }

    const onLoginChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(evt.target.value);
    }

    const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    }

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if(!name || !login || password < MIN_PASSWORD_LENGTH){
            setError(true);

            const errorMessage = name && login ? `Min password length is ${MIN_PASSWORD_LENGTH}!` : 'All fields should be filled!';

            failureNotificationMessage(errorMessage);

            return;
        }

        dispatch(userSignUp({name, login, password})).then((data: IAuth)=>{
            if(data?.error)
                setError(true);
            else{
                if(data?.payload)
                    localStorage.setItem(LocalStorageKeys.token, JSON.stringify(data?.payload?.token));

                navigate(Routes.default);
            }
            });  
    }

    return (
        <AuthLayout
            text="Already have account?"
            navigationText="Sign in"
            navigationLink={Routes.default}
        >
            <form className={styles["register__form"]} onSubmit={onSubmit}>
                <FormInput
                    id="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    error={error && !name}
                    onChange={onNameChange}
                />
                <FormInput
                    id="login"
                    label="Login"
                    placeholder="Email or phone number"
                    value={login}
                    error={error && !login}
                    onChange={onLoginChange}
                />
                <FormInput
                    id="password"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    password
                    error={error && password.length < MIN_PASSWORD_LENGTH}
                    onChange={onPasswordChange}
                />
                <FormButton type="submit">Sign up</FormButton>
            </form>
        </AuthLayout>
    );
}

export default Register;