import { useState } from 'react';
import { Modal } from "@mui/material"
import { Publisher } from '@opentok/client';

import classNames from 'classnames';

// Constants
import { SettingsTabs } from '@/utils/constants';

// Components
import { activeTab } from './activeTab';

// Styles
import styles from './index.module.scss';

// Images
import GearIco from '@/assets/images/svg/gear.svg?react';
import BellIco from '@/assets/images/svg/Bell.svg?react';
import CrossIco from '@/assets/images/svg/Cross.svg?react';


interface IProps {
    mainPublisher: Publisher;
    isOpen: boolean;
    onClose: ()=>void;
}

const SettingsButtons = [
    {
        ico: <GearIco/>,
        text: SettingsTabs.device,
    },
    {
        ico: <BellIco/>,
        text: SettingsTabs.notification,
    }
];

const SettingsModal = ({mainPublisher, isOpen, onClose}: IProps) => {
    const [currentTab, setCurrentTab] = useState<string>(SettingsTabs.device);

    return (
        <Modal
            className={ styles.modal }
            open={ isOpen }
            onClose={ onClose }
        >
            <div className={styles.settings}>
                <div className={styles["settings__options"]}>   
                    <p className={styles["settings__header"]}>Settings</p>
                    <ul className={styles["settings__options-list"]} >
                        {SettingsButtons.map(el=>(
                            <li key={el.text}>
                                <button type='button' onChange={()=>setCurrentTab(el.text)} className={classNames([styles["settings__options-button"], {[styles["settings__options-button--active"]]: currentTab === el.text}])}>
                                    {el.ico}
                                    {el.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.tab}>
                    <div className={styles["tab__container"]}>
                        <p className={styles["tab__header"]}>{currentTab}</p>
                        <button type='button' className={styles["tab__button--close"]} onClick={ onClose }>
                            <CrossIco/>    
                        </button>
                    </div>
                    {activeTab({mainPublisher, currentTab})}
                </div>
            </div>
        </Modal>
    );
}

export default SettingsModal;