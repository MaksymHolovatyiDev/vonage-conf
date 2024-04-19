import { useState } from 'react';

// Styles
import styles from './index.module.scss';

// Components
import Checkbox from '@/shared/components/Checkbox';

// Icons
import AddPeopleIco from '@/assets/images/svg/People-Add.svg?react';
import ExitIco from '@/assets/images/svg/Exit.svg?react';
import ChatIco from '@/assets/images/svg/Chat.svg?react';
import HandIco from '@/assets/images/svg/Hand.svg?react';
import AlertIco from '@/assets/images/svg/Alert-Octagon.svg?react';


const NotificationTab = () => {
    const [peerJoined, setPeerJoined] = useState<boolean>(false);
    const [peerLeave, setPeerLeave] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<boolean>(false);
    const [handRise, setHandRise] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    const onPeerJoinedChange = () => {
        setPeerJoined(prevState => !prevState);
    }

    const onPeerLeaveChange = () => {
        setPeerLeave(prevState => !prevState);
    }

    const onNewMessageChange = () => {
        setNewMessage(prevState => !prevState);
    }

    const onHandRiseChange = () => {
        setHandRise(prevState => !prevState);
    }

    const onErrorChange = () => {
        setError(prevState => !prevState);
    }

    return (
        <ul className={styles["notification__list"]}>
           <li className={styles["notification__item"]}>
               <div className={styles["notification__container"]}>
                   <AddPeopleIco/> 
                   <p>Peer Joined</p>
               </div>
               <Checkbox value={peerJoined} onChange={onPeerJoinedChange} secondary/>
           </li>
           <li className={styles["notification__item"]}>
               <div className={styles["notification__container"]}>
                   <ExitIco/> 
                   <p>Peer Leave</p>
               </div>
               <Checkbox value={peerLeave} onChange={onPeerLeaveChange} secondary/>
           </li>
           <li className={styles["notification__item"]}>
               <div className={styles["notification__container"]}>
                   <ChatIco/> 
                   <p>New message</p>
               </div>
               <Checkbox value={newMessage} onChange={onNewMessageChange} secondary/>
           </li>
           <li className={styles["notification__item"]}>
               <div className={styles["notification__container"]}>
                   <HandIco/> 
                   <p>Hand Raise</p>
               </div>
               <Checkbox value={handRise} onChange={onHandRiseChange} secondary/>
           </li>
           <li className={styles["notification__item"]}>
               <div className={styles["notification__container"]}>
                   <AlertIco/> 
                   <p>Error</p>
               </div>
               <Checkbox value={error} onChange={onErrorChange} secondary/>
           </li>
        </ul>
    );
}

export default NotificationTab;