import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

// Constants
import { Routes } from '@/utils/routes';
import { LocalStorageKeys } from "@/utils/constants";

// Services
import { userSignIn } from '@/services/auth';

// Notifications
import { failureNotificationMessage } from "@/utils/notifications";

// Constants
import { MIN_PASSWORD_LENGTH } from "@/utils/constants";

// Types
import { IAuth, ISignInFields, IFromikSubmitting } from "@/Types/auth";

// Styles
import styles from './index.module.scss';

// Components
import FormInput from '@/shared/components/FormInput';
import Checkbox from '@/shared/components/Checkbox';
import FormButton from '@/shared/components/FormButton';
import AuthLayout from '@/shared/layouts/auth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [remember, setRemember] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const onRememberChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setRemember(evt.target.checked);
    }

    const onSubmit = ({login, password}: ISignInFields, { setSubmitting }:IFromikSubmitting) => {
        
        if(!login || password < MIN_PASSWORD_LENGTH){
            setError(true);

            const errorMessage = login ? `Min password length is ${MIN_PASSWORD_LENGTH}!` : 'All fields should be filled!';

            failureNotificationMessage(errorMessage);

            return;
        }

        dispatch(userSignIn({login, password})).then((data: IAuth)=>{
            if(data?.error)
                setError(true);
            else{
                if(data?.payload)
                    localStorage.setItem(LocalStorageKeys.token, JSON.stringify(data?.payload?.token));

                navigate(Routes.default);
            }
            setSubmitting(false);
            }); 
    }

    return (
        <AuthLayout
            text="Don't have account?"
            navigationText="Sign up now"
            navigationLink={Routes.register}
        >
            <Formik
               initialValues={{ login: '', password: '', }}
               onSubmit={onSubmit}
             >
                <Form className={styles["login__form"]}>
                    <FormInput
                        id="login"
                        label="Login"
                        placeholder="Email or phone number"
                        error={error}
                    />
                    <FormInput
                        id="password"
                        label="Password"
                        placeholder="Enter password"
                        password
                        error={error}
                    />
                    <div className={styles["login__form--remember"]}>
                        <Checkbox
                            value={remember}
                            label="Remember me"
                            onChange={onRememberChange}
                        />
                        <p className={styles["login__form--text"]}>Forgot password?</p>
                    </div> 
                 <FormButton type="submit">Sign in</FormButton>
                </Form>
            </Formik>
        </AuthLayout>
    );
}

export default Login;