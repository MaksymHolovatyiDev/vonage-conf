import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, FormControl, Input } from '@mui/material';

import classNames from 'classnames';

// Services
import { getSession } from '@/services/session';

// Constants
import { Routes } from '@/utils/routes';

// Types
import { IError } from 'Types/error';

// Styles
import styles from './index.module.scss';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState<string>("");

    const createRoom = () => {
        navigate(Routes.waitingRoom);
    }

    const enterRoom = () => {
       dispatch(getSession(roomId))
       .then((data: IError) => {
            if(data?.error) return;
            navigate(Routes.waitingRoom);
        });
    }

    const onRoomIdChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRoomId(evt.target.value);
    }

    return (
        <main className={styles.main}>
            <FormControl className={ styles.container }>
                <Button className={classNames([styles.button, styles['button__create-room']])} onClick={()=>createRoom()}>Create room</Button>
                <Input className={styles.input} placeholder={ 'Enter room Id' } value={roomId} onChange={onRoomIdChange}/>
                <Button className={styles.button} disabled={!roomId} onClick={()=>enterRoom()}>Join room</Button>
            </FormControl>
        </main>
    );
}

export default Main;