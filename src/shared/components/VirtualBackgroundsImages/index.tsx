// Styles
import styles from './index.module.scss';

// Constants
import { BackgroundsDefault, BackgroundsFroYou } from '@/utils/backgroundImagesData';

interface IProps {
    onBackgroundImageChange: (data: string)=> void;
}

interface IBackgroundImagesData {
    src: string;
    alt: string;
}

const VirtualBackgroundImages = ({onBackgroundImageChange}: IProps) => (
        <>
            <p className={styles["virtual-background-images__title"]}>For you</p>
            <ul className={styles["virtual-background-images__grid"]}>
                {BackgroundsFroYou.map((el: IBackgroundImagesData)=>(
                    <li key={el.src}>
                        <button type='button' className={styles["virtual-background-images__background-btn"]} onClick={()=>onBackgroundImageChange(el.src)}>
                            <img src={el.src} alt={el.alt}/>
                        </button>
                    </li>
                ))}
            </ul>
            <p className={styles["virtual-background-images__title"]}>Defaults</p>
            <ul className={styles["virtual-background-images__grid"]}>
                {BackgroundsDefault.map((el: IBackgroundImagesData)=>(
                    <li key={el.src}>
                        <button type='button' className={styles["virtual-background-images__background-btn"]} onClick={()=>onBackgroundImageChange(el.src)}>
                            <img src={el.src} alt={el.alt}/>
                        </button>
                    </li>
                ))}
            </ul>
        </>
);

export default VirtualBackgroundImages;