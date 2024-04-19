import classNames from "classnames";

// Styles
import styles from './index.module.scss';

// Icons
import SpeakerIco from '@/assets/images/svg/speaker.svg?react';
import CrossIco from '@/assets/images/svg/Cross.svg?react';
import HeadphonesIco from '@/assets/images/svg/Headphones.svg?react';
import PhoneIco from '@/assets/images/svg/Telephone.svg?react';
import BluetoothIco from '@/assets/images/svg/Bluetooth.svg?react';

interface IProps{
    audioOptionsOpen: boolean;
    closeAudioOptions: () => void;
}

const MobileAudioList = [
    {name: "Auto", ico: <SpeakerIco/>},
    {name: "Speaker", ico: <SpeakerIco/>},
    {name: "Earphone", ico: <HeadphonesIco/>},
    {name: "Phone", ico: <PhoneIco/>},
    {name: "Bluetooth Device", ico: <BluetoothIco/>},
]

const MobileAudio = ({ audioOptionsOpen, closeAudioOptions }: IProps) => {
    return(
        <div className={classNames([styles["mobile-audio__container--audio"], {[styles["mobile-audio__container--audio--open"]]: audioOptionsOpen}])} >
            <div className={classNames([styles["mobile-audio__container--options"], styles["mobile-audio__container--no-margin"]])}>
                <p className={styles["mobile-audio__text--audio"]}>Audio Output</p>
                <button type='button' onClick={closeAudioOptions} className={styles["mobile-audio__button--image"]}><CrossIco/></button>
            </div>
            <ul className={styles["mobile-audio__list"]}>
                {MobileAudioList.map(el=> (
                    <li key={el.name}>
                        <button className={styles["mobile-audio__button--audio"]} type='button'>{el.ico} {el.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MobileAudio;