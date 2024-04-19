import { useEffect, useState } from 'react';
import { Publisher } from '@opentok/client';

// Components
import { BorderLinearProgress } from '@/assets/styles/mui/Progress';

// Styles
import styles from './index.module.scss';

// Components
import CustomSelect from '@/shared/components/Select';

// Icons
import VideoPath from '@/assets/images/svg/video.svg';
import MicroPath from '@/assets/images/svg/micro.svg';
import MicroIco from '@/assets/images/svg/micro.svg?react';
import SpeakerPath from '@/assets/images/svg/speaker.svg';
import SpeakerIco from '@/assets/images/svg/speaker.svg?react';

interface IProps {
    mainPublisher: Publisher;
}

const DeviceSettingsTab = ({mainPublisher}: IProps) => {
    const [videoList, setVideoList] = useState<MediaDeviceInfo[]>([]);
    const [audioInputList, setAudioInputList] = useState<MediaDeviceInfo[]>([]);
    const [audioOutputList, setAudioOutputList] = useState<MediaDeviceInfo[]>([]);
    const [currentMicrophoneDeviceId, setCurrentMicrophoneDeviceId] = useState<string>('');
    const [currentVideoDeviceId, setCurrentVideoDeviceId] = useState<string>('');
    const [currentSpeakersDeviceId, setCurrentSpeakersDeviceId] = useState<string>('');
    const [microLevel, setMicroLevel] = useState<number>(0);

    useEffect(()=>{
        const deviceVideoId: string[] = [];
        const deviceAudioInputId: string[] = [];
        const deviceAudioOutputId: string[] = [];

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
                if(el.kind === 'audiooutput' && !deviceAudioOutputId.includes(el.groupId)){
                    deviceAudioOutputId.push(el.groupId);
                    setAudioOutputList(prevState=>[...prevState, el])
                }
        })})
        .then(()=>{
            const audioDeviceId = mainPublisher.getAudioSource().getSettings().deviceId;
            if(audioDeviceId) setCurrentMicrophoneDeviceId(audioDeviceId);

            
            const videoDeviceId = mainPublisher.getVideoSource().deviceId;
            if(videoDeviceId) setCurrentVideoDeviceId(videoDeviceId);

            OT.getActiveAudioOutputDevice().then(el=>{
                if(!el.deviceId) return;
                setCurrentSpeakersDeviceId(el.deviceId);
            });
        });

        mainPublisher.on("audioLevelUpdated", (evt)=>{
            setMicroLevel(+evt.audioLevel.toFixed(1));
        });
    }, []);

    const onVideoChange = (data: React.SyntheticEvent<HTMLLIElement>) => {
        const selectedId = (data.target as unknown as {dataset: { key?: string}}).dataset?.key;

        if(!selectedId || selectedId === currentVideoDeviceId) return;

        mainPublisher.setVideoSource(selectedId).then(()=>{
            const videoDeviceId = mainPublisher.getVideoSource().deviceId;
            
            if(!videoDeviceId) return;

            setCurrentVideoDeviceId(videoDeviceId);
        });
    }

    const onMicroChange = (data: React.SyntheticEvent<HTMLLIElement>) => {
        const selectedId = (data.target as unknown as {dataset: { key?: string}}).dataset?.key;

        if(!selectedId || selectedId === currentMicrophoneDeviceId) return;
        
        mainPublisher.setAudioSource(selectedId).then(()=>{
            const audioDeviceId = mainPublisher.getAudioSource().getSettings().deviceId;
            
            if(!audioDeviceId) return;

            setCurrentMicrophoneDeviceId(audioDeviceId);
        });
    }

    const onSpeakersChange = (data: React.SyntheticEvent<HTMLLIElement>) => {
        const selectedId = (data.target as unknown as {dataset: { key?: string}}).dataset?.key;

        if(!selectedId || selectedId === currentMicrophoneDeviceId) return;
        
        OT.setAudioOutputDevice(selectedId)
        .then(OT.getActiveAudioOutputDevice)
        .then(el=>{
            if(!el.deviceId) return;
            setCurrentSpeakersDeviceId(el.deviceId);
        });
    }

    const onSoundButtonClick = () => {
        const audio = new Audio('src/assets/audio/notification.mp3');
        audio.play();
    }

    return (
        <ul className={styles["device-settings-tab__list"]}>
            <li>
                <p className={styles["device-settings-tab__title"]}>Video</p>
                <CustomSelect onChange={onVideoChange} selectedId={currentVideoDeviceId} optionsList={videoList} DataIco={VideoPath}/>
            </li>
            <li>
                <p className={styles["device-settings-tab__title"]}>Microphone</p>
                <CustomSelect onChange={onMicroChange} selectedId={currentMicrophoneDeviceId} optionsList={audioInputList} DataIco={MicroPath}/>
                <div className={styles["device-settings-tab__container--micro-level"]}>
                    <MicroIco className={styles["device-settings-tab__ico"]}/>
                    <BorderLinearProgress variant="determinate" value={microLevel * 100} />
                </div>
            </li>
            <li>
                <p className={styles["device-settings-tab__title"]}>Speakers</p>
                <div className={styles["device-settings-tab__container--speakers"]} >
                    <CustomSelect onChange={onSpeakersChange} selectedId={currentSpeakersDeviceId} optionsList={audioOutputList} DataIco={SpeakerPath}/>
                    <button type='button' className={styles["device-settings-tab__button--audio"]} onClick={onSoundButtonClick}>
                        <SpeakerIco/>    
                        Test
                    </button>
                </div>
            </li>
        </ul>
    );
};

export default DeviceSettingsTab;