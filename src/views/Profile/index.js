import {View} from 'react-native';
import React from 'react';
import {
  AileronBold,
  Button,
  CurvedView,
  InputField,
  TopView,
} from '../../components';
import styles from './styles';
import {COLORS} from '../../assets/theme/colors';
import {vw} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';

const ProfileView = ({
  ProfileData,
  inputDisable,
  handleEdit,
  editable,
  handleSave,
}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <>
      <TopView title="Profile" />
      <CurvedView containerStyle={styles.curvedStyle}>
        <View style={styles.profileDetailContainer}>
          <View style={styles.profileDetail}>
            <AileronBold name={user?.userName} style={styles.ProfileName} />
            {/* <AileronRegular
              name={user?.UserEmail}
              style={styles.profileEmail}
            /> */}
          </View>
          {ProfileData?.map((item, index) => (
            <InputField
              key={index}
              containerStyle={
                editable ? styles.inputBox : styles.dependentOuterStyle
              }
              maxLength={20}
              value={item?.value}
              label={item?.label}
              editable={inputDisable}
              placeholder={item?.placeholder}
              placeholderTextColor={COLORS.selectPlaceholder}
              labelStyle={{color: COLORS.textBlackShade, fontSize: vw * 3.6}}
            />
          ))}
        </View>
        {editable && (
          <Button
            name="Save"
            containerStyle={styles.button}
            onPress={handleSave}
          />
        )}
      </CurvedView>
    </>
  );
};

export default ProfileView;
