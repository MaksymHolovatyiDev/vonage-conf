import classNames from 'classnames';

// Styles
import styles from './index.module.scss';

// Icons
import CheckmarkIco from '@/assets/images/svg/checkmark.svg?react';

interface IProps {
  optionsList: {label?: string; deviceId?: string; groupId?: string;}[];
  selectedId: string;
  onChange?: (data: React.MouseEvent<HTMLLIElement, MouseEvent>)=>void;
}

const SelectOptions = ({optionsList, selectedId, onChange}: IProps) => (
    <ul className={styles["select-options"]}>
          {optionsList.map(option => {
            return (
              <li
                className={classNames([styles["select-options__option"], {[styles["select-options__option--active"]]:option.deviceId === selectedId}])}
                data-name={option?.label}
                data-key={option?.deviceId}
                key={option?.groupId}
                onClick={onChange}
              >
                {option?.label}{option.deviceId === selectedId && <CheckmarkIco className={styles["select-options__ico"]}/>}
              </li>
            );
          })}
    </ul>
);

export default SelectOptions;