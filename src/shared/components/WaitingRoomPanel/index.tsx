import { useEffect, useState } from "react";
import { Publisher } from "@opentok/client";

import classNames from "classnames";

// Styles
import styles from './index.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { toggleUserMicro, toggleUserVideo } from "@/redux/useOptions";
import { getUserOptionsMicro, getUserOptionsVideo } from "@/redux/useOptions/selectors";

// Icons
import MicroIco from '@/assets/images/svg/micro.svg?react';
import MicroMuted from '@/assets/images/svg/microphone-muted.svg?react';
import VideoIco from '@/assets/images/svg/video.svg?react';
import VideoMuted from '@/assets/images/svg/video-muted.svg?react';
import OptionsDots from '@/assets/images/svg/options-dots.svg?react';
import CameraIco from '@/assets/images/svg/camera-switch.svg?react';
import PersonIco from '@/assets/images/svg/person-background.svg?react';
import SharingIco from '@/assets/images/svg/sharing.svg?react';
import GearIco from '@/assets/images/svg/gear.svg?react';
import SpeakerIco from '@/assets/images/svg/speaker.svg?react';

// Components
import SelectOptions from "../SelectOptions";

interface IProps {
    mainPublisher: undefined | Publisher;
    onOpenSettingsModal: ()=>void;
    onToggleVirtualBackground: ()=>void;
}

const WaitingRoomPanel = ({ mainPublisher, onOpenSettingsModal, onToggleVirtualBackground}: IProps) => {
    const dispatch = useDispatch();
    const isMicroOn = useSelector(getUserOptionsMicro);
    const isVideoOn = useSelector(getUserOptionsVideo);

    const [videoList, setVideoList] = useState<MediaDeviceInfo[]>([]);
    const [audioInputList, setAudioInputList] = useState<MediaDeviceInfo[]>([]);
    const [currentVideoId, setCurrentVideoId] = useState<string>("");
    const [currentAudioInputId, setCurrentAudioInputId] = useState<string>("");
    const [openVideoList, setOpenVideoList] = useState<boolean>(false);
    const [openAudioInputList, setOpenAudionInputList] = useState<boolean>(false);
    
    useEffect(()=>{
        const deviceVideoId: string[] = [];
        const deviceAudioInputId: string[] = [];

        navigator.mediaDevices.enumerateDevices()
        .then(data=>{
            data.forEach(el=>{
                if(el.kind === 'videoinput' && !deviceVideoId.includes(el.groupId)){
                    deviceVideoId.push(el.groupId);
                    setVideoList(prevState=>[...prevState, el])
                }
                if(el.kind === 'audioinput' && !deviceAudioInputId.includes(el.groupId)){
                    deviceAudioInputId.push(el.groupId);
                    setAudioInputList(prevState=>[...prevState, el])
                }
        })});
    }, []);

    const onOpenAudioInputDevices = () =>{
            if(!mainPublisher) return

            if(!openAudioInputList){
                const audioDeviceId = mainPublisher.getAudioSource().getSettings().deviceId;
                if(audioDeviceId) setCurrentAudioInputId(audioDeviceId);
            }

            setOpenAudionInputList(prevState => !prevState);
    }

    const onOpenVideoDevices = () =>{
        if(!mainPublisher) return

        if(!openVideoList){
            const videoDeviceId = mainPublisher.getVideoSource().deviceId;
            if(videoDeviceId) setCurrentVideoId(videoDeviceId);
        }

        setOpenVideoList(prevState => !prevState);  
}

    const onToggleMicro = () => {
        dispatch(toggleUserMicro());
    }

    const onToggleVideo = () => {
        dispatch(toggleUserVideo());
    }

    const onCameraSwitch = () => {
        if(!mainPublisher) return;
        mainPublisher.cycleVideo();
    }

    return (
        <div className={styles["panel__container--base"]}>
            <div className={styles["panel__container--options"]}>
                <div className={styles["panel__container--options-list"]}>
                    <div className={styles["panel__container--button-options"]}>
                        <button type='button' className={classNames(styles["panel__button--image"], styles["panel__button--splitted-left"])} onClick={onToggleMicro}>{ isMicroOn ? <MicroIco/> : <MicroMuted/> }</button>
                        <button type='button' className={classNames(styles["panel__button--image"], styles["panel__button--splitted-right"])} onClick={onOpenAudioInputDevices}>{ <OptionsDots/> }</button>
                        {
                            openAudioInputList &&
                            <div className={styles["panel__container--select-list"]}>
                                <SelectOptions optionsList={audioInputList} selectedId={currentAudioInputId} />
                            </div>
                        }
                    </div>
                    <div className={styles["panel__container--button-options"]}>
                        <button type='button' className={classNames(styles["panel__button--image"], styles["panel__button--splitted-left"])} onClick={onToggleVideo}>{ isVideoOn ? <VideoIco/> : <VideoMuted/> }</button>
                        <button type='button' className={classNames(styles["panel__button--image"], styles["panel__button--splitted-right"])} onClick={onOpenVideoDevices}>{ <OptionsDots/> }</button>
                        {
                            openVideoList &&
                            <div className={styles["panel__container--select-list"]}>
                                <SelectOptions optionsList={videoList} selectedId={currentVideoId} />
                            </div>
                        }
                    </div>
                    <button type='button' className={classNames([styles["panel__button--image"], styles["panel__desktop--hidden"]])} onClick={onCameraSwitch}><CameraIco/></button>
                    <button type='button' className={styles["panel__button--image"]} onClick={onToggleVirtualBackground}><PersonIco/></button>
                </div>
                <button type='button' className={classNames([styles["panel__button--image"], styles["panel__button--mobile"]])}><SpeakerIco/></button>
                <button type='button' className={classNames([styles["panel__button--image"], styles["panel__button--desktop"]])} onClick={onOpenSettingsModal}><GearIco/></button>
            </div>
            <button className={styles["panel__button--live"]} type='button'><SharingIco className={styles["panel__desktop--hidden"]}/> Go Live</button>
        </div>
    );
}

export default WaitingRoomPanel;