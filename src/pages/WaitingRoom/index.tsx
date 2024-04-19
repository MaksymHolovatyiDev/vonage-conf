import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Publisher as PB } from "@opentok/client";

// Selectors
import { getUserToken } from '@/redux/user/selectors';
import { getUserOptionsMicro, getUserOptionsVideo } from '@/redux/useOptions/selectors';

// Styles
import styles from './index.module.scss';

// Images
import BackIco from '@/assets/images/svg/back-arrow.svg?react';
import MicroMuted from '@/assets/images/svg/microphone-muted.svg?react';
import Avatar from '@/assets/images/Avatar.png'

// Components
import Publisher from '@/components/Publisher';
import MobileAudio from '@/shared/components/MobileAudio';
import WaitingRoomPanel from '@/shared/components/WaitingRoomPanel';
import WaitingRoomTopPanel from '@/shared/components/WaitingRoomTopPanel';
import SettingsModal from '@/shared/layouts/SettingsModal';
import VirtualBackground from '@/shared/layouts/VirtualBackground';

const WaitingRoom = () => {
    const userToken = useSelector(getUserToken);
    const isMicroOn = useSelector(getUserOptionsMicro);
    const isVideoOn = useSelector(getUserOptionsVideo);

    const [audioOptionsOpen, setAudioOptionsOpen] = useState<boolean>(false);
    const [openVirtualBackground, setOpenVirtualBackground] = useState<boolean>(false);
    const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
    const [mainPublisher, setMainPublisher] = useState<PB>();

    const onToggleAudioOptions = () => {
        setAudioOptionsOpen(prevState => !prevState);
    }

    const closeAudioOptions = () => {
        setAudioOptionsOpen(false);
    }

    const onToggleVirtualBackground = () => {
        setOpenVirtualBackground(prevState => !prevState);
    }

    const onCloseVirtualBackground = () => {
        setOpenVirtualBackground(false);
    }

    const onOpenSettingsModal = () => {
        setOpenSettingsModal(true);
    }

    const onCloseSettingsModal = () => {
        setOpenSettingsModal(false);
    }

    return (
        <main className={styles["waiting-room"]}>
            <section className={styles["waiting-room__container"]}>
                <button className={styles["waiting-room__button--back"]} type='button'>
                    <BackIco/>
                </button>
                
                <WaitingRoomTopPanel/>

                <div className={styles["waiting-room__container--publisher"]}>
                    {isVideoOn 
                        ?
                        <Publisher className={styles["waiting-room__publisher"]} setPublisher={setMainPublisher} token={userToken} video={isVideoOn}/>
                        :
                        <img alt='avatar' src={Avatar} />
                    }
                    {!isMicroOn && <div className={styles.muted}><MicroMuted/></div>}
                </div>

                <WaitingRoomPanel mainPublisher={mainPublisher} onOpenSettingsModal={onOpenSettingsModal} onToggleVirtualBackground={onToggleVirtualBackground} />

                <button type='button' className={styles["waiting-room__button--audio-options"]} onClick={onToggleAudioOptions} />

                <MobileAudio audioOptionsOpen={ audioOptionsOpen } closeAudioOptions={ closeAudioOptions } />
            </section>
            {openVirtualBackground && <VirtualBackground onClose={onCloseVirtualBackground}/>}
            {openSettingsModal && <SettingsModal mainPublisher={mainPublisher} isOpen={openSettingsModal} onClose={onCloseSettingsModal}/>}
        </main>
    );
}

export default WaitingRoom;