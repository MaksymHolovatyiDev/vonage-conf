import { useState } from 'react';
import { useSelector } from "react-redux";
import { Slider } from '@mui/material';

// Selectors
import { getUserToken } from "@/redux/user/selectors";

// Contacts
import { FilterOptions } from "@/utils/constants";

// Styles
import styles from './index.module.scss';

// Components
import Publisher from "@/components/Publisher";
import VirtualBackgroundImages from '@/shared/components/VirtualBackgroundsImages';
import VirtualBackgroundButtons from '@/shared/components/VirtualBackgroundButtons';

// Icons
import HardBlurIco from '@/assets/images/svg/Blur-hard.svg?react';
import LightBlurIco from '@/assets/images/svg/Blur-light.svg?react';
import CrossIco from '@/assets/images/svg/Cross.svg?react';

interface IProps {
    onClose: ()=>void;
}

const VirtualBackground = ({onClose}: IProps) =>{
    const userToken = useSelector(getUserToken);

    const [filter, setFilter] = useState<string>(FilterOptions.none);
    const [filterData, setFilterData] = useState<number | string>(0);

    const onVirtualBackgroundClose = () =>{
        onClose();
    }

    const onRangeChange = (_: Event, value: number| number[]) =>{
        if(!Array.isArray(value)) setFilterData(value);
    }

    const onFilterChange = (filterValue: string) =>{
        setFilter(filterValue);
        setFilterData(0);
    }

    const onBackgroundImageChange = (bg: string) =>{
        setFilterData(bg);
    }

    return (
        <div className={styles["virtual-background"]}>
            <div className={styles["container__header"]}>
                <p className={styles["virtual-background__header"]}>Virtual background</p>
                <button className={styles["virtual-background__close-btn"]} type='button' onClick={onVirtualBackgroundClose}> 
                    <CrossIco/>
                </button>
            </div>
            <Publisher className={styles["virtual-background__video-publisher"]} filter={filter} value={filterData} token={userToken} id="background" />
            <p className={styles["virtual-background__title"]}>Effects</p>

            <VirtualBackgroundButtons onFilterChange={onFilterChange}/>

            {filter === FilterOptions.blur && 
                <div className={styles["virtual-background__range-container"]}>
                    <LightBlurIco/>
                    <Slider
                    size="small"
                    max={1}
                    value={filterData as number}
                    aria-label="Small"
                    valueLabelDisplay="off"
                    onChange={onRangeChange}
                    />
                    <HardBlurIco/>
                </div>
            }

            {filter === FilterOptions.image && 
               <VirtualBackgroundImages onBackgroundImageChange={onBackgroundImageChange}/>
            }
        </div>)
}

export default VirtualBackground;