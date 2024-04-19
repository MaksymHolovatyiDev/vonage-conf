// Constants
import { BackgroundButtons } from "@/utils/backgroundImagesData";

// Styles
import styles from './index.module.scss';

interface IProps{
    onFilterChange: (data: string) => void;
}

interface IButtonData {
    ico: JSX.Element;
    text: string;
    value: string;
}

const VirtualBackgroundButtons = ({onFilterChange}: IProps) => (
        <ul className={styles["virtual-background-buttons__buttons-list"]}>
        {BackgroundButtons.map((el:IButtonData)=>(
            <li key={el.text}>
                <button type='button' className={styles["virtual-background-buttons__filter-btn"]} onClick={()=>onFilterChange(el.value)}> 
                    {el.ico}
                    <p>{el.text}</p>
                </button>
            </li>
        ))}
    </ul>
);

export default VirtualBackgroundButtons;