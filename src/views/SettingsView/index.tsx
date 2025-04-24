import React from 'react'
import { SettingsList } from '../../viewmodels/useSettingsViewModel'
import { AileronSemiBold, Container, CurvedView, TopView } from '../../components';
import { Image, Switch, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/theme/colors';
import { icons } from '../../assets';
import styles from './style';

const SettingsView = ({ data, isToggle, toggleSwitch }: {
    data: SettingsList[];
    isToggle: boolean;
    toggleSwitch: () => void;
}) => {
    return (
        <Container>
            <TopView title={'Settings'} />
            <CurvedView>
                {data?.map((item) => (
                    <TouchableOpacity key={item?.id} style={styles.row}>
                        <Image source={item?.icon} />
                        <AileronSemiBold name={item?.label} style={styles.label} />
                        {item?.id === 2 ? (
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isToggle}
                                trackColor={{ false: COLORS.toggleFalse, true: COLORS.faqsSubHeading }}
                                thumbColor={COLORS.white}
                            />
                        ) : (
                            <Image source={icons.rightArrow} style={styles.arrowIcon} />
                        )}
                    </TouchableOpacity>
                ))}
            </CurvedView>
        </Container>
    )
}

export default SettingsView