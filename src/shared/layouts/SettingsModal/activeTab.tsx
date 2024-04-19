import { Publisher } from '@opentok/client';

// Constants
import { SettingsTabs } from '@/utils/constants';

// Tabs components
import DeviceSettingsTab from '../DeviceSettingsTab';
import NotificationTab from '../NotificationTab';


interface IProps {
    currentTab: string;
    mainPublisher: Publisher;
}

export const activeTab = ({currentTab, mainPublisher}: IProps) => {
    switch(currentTab){
        case SettingsTabs.device: 
            return <DeviceSettingsTab mainPublisher={mainPublisher}/>;
        case SettingsTabs.notification:
            return <NotificationTab/>; 
    }
}
