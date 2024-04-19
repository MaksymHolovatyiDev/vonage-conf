import classNames from 'classnames';

// Styles
import styles from './index.module.scss';

// Icons
import StarIco from '@/assets/images/svg/start-star.svg?react';


const WaitingRoomTopPanel = () => (
    <div className={styles["top-panel__container--info"]} >
        <StarIco/>
        <div className={styles["top-panel__container--titles"]}>
            <p className={styles["top-panel__text--title"]}>Get Started</p>
            <p className={styles["top-panel__text--sub-title"]}>Setup your audio and video before joining</p>
        </div>
        <div className={styles.live}>
            <div className={classNames([styles.live, styles["live__label"]])}>
                <div className={styles["live__circle"]}/>
                <p className={styles["top-panel__text--live"]}>Live</p>
            </div>
            <p className={styles["top-panel__text--users"]}>You are the first to join</p>
        </div>
    </div>
);


export default WaitingRoomTopPanel;