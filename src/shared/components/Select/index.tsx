import { useState } from 'react';

import classNames from 'classnames';

// Selector
import styles from './index.module.scss';

// Components
import SelectOptions from '@/shared/components/SelectOptions';

// Icons
import ArrowIco from '@/assets/images/svg/arrow.svg?react';

interface IProps {
    DataIco: string;
    optionsList: {label?: string; deviceId?: string; groupId?: string;}[];
    selectedId?: string;
    onChange?: (data: React.MouseEvent<HTMLLIElement, MouseEvent>)=>void;
}


const CustomSelect = ({selectedId, DataIco, optionsList, onChange}: IProps) => {
    const [showOptionsList, setShowOptionsList] = useState<boolean>(false);

    const onToggleList = () => {
        setShowOptionsList(prevState=>!prevState);
    }

    const onOptionChange = (data: React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
      if(onChange)onChange(data);
      setShowOptionsList(false);
    }
    
    return (
        <div className={styles["custom-select__container"]}>
          <div
            className={classNames([styles["custom-select__selected-text"], {[styles["custom-select__selected-text--active"]]: showOptionsList} ])}
            onClick={onToggleList}
          >
            <img  className={styles["custom-select__image-ico"]} src={DataIco} alt="Svg image"/>
            {selectedId ? optionsList.find(el=>el.deviceId==selectedId)?.label : optionsList[0]?.label}
            <ArrowIco className={classNames(styles["custom-select__arrow"], {[styles["custom-select__arrow--active"]]: showOptionsList})}/>
          </div>
          {showOptionsList && (
            <SelectOptions  selectedId={selectedId} optionsList={optionsList} onChange={onOptionChange}/>
          )}
        </div>
      );
}

export default CustomSelect;