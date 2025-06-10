import React from 'react';
import {SettingsList} from '../../viewmodels/useSettingsViewModel';
import {
  AileronSemiBold,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import {Image, Switch, TouchableOpacity} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {icons} from '../../assets';
import styles from './style';
import {vh, vw} from '../../assets/theme/dimension';

const SettingsView = ({
  data,
  isToggle,
  toggleSwitch,
  goBack,
  onPressMenu,
}: {
  data: SettingsList[];
  isToggle: boolean;
  toggleSwitch: () => void;
  goBack: () => void;
  onPressMenu: (data: SettingsList) => void;
}) => {
  return (
    <Container>
      <TopView title={'Settings'} goBack={goBack} />
      <CurvedView>
        {data?.map(item => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={item?.id}
            style={styles.row}>
            <Image
              style={{height: vh * 4, width: vw * 8}}
              source={item?.icon}
            />
            <AileronSemiBold name={item?.label} style={styles.label} />
            {item?.id === 2 ? (
              <Switch
                onValueChange={toggleSwitch}
                value={isToggle}
                trackColor={{
                  false: COLORS.toggleFalse,
                  true: COLORS.faqsSubHeading,
                }}
                thumbColor={COLORS.white}
              />
            ) : (
              <Image source={icons.rightArrow} style={styles.arrowIcon} />
            )}
          </TouchableOpacity>
        ))}
      </CurvedView>
    </Container>
  );
};

export default SettingsView;
