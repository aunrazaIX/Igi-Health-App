import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  Button,
  CurvedView,
  DependentBox,
  InputField,
  TopView,
} from '../../components';
import styles from './styles';
import {icons, images} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {vw} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';

type Props = {
  ProfileData: Item[];
  inputDisable: boolean;
  handleEdit: () => void;
  editable: boolean;
  handleSave: () => void;
};

type Item = {
  label: string;
  value: string;
  placeholder: string;
};

const ProfileView: React.FC<Props> = ({
  ProfileData,
  inputDisable,
  handleEdit,
  editable,
  handleSave,
}) => {
  const {
    rememberMe,
    credentials,
    deviceId,
    biometrics,
    user,
    isToggle,
    faceIdCredentials,
  } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <TopView title="Profile" />
      <CurvedView containerStyle={styles.curvedStyle}>
        <View style={styles.profileDetailContainer}>
          {/* 
                    <TouchableOpacity style={styles.editIconRow} onPress={handleEdit}>
                        <Image source={icons.editIcon} style={styles.editIcon} />
                        <AileronSemiBold name='Edit' style={styles.editText} />
                    </TouchableOpacity> */}

          <View style={styles.profileDetail}>
            <AileronBold name={user?.UserName} style={styles.ProfileName} />
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

          {/* <DependentBox containerStyle={editable ? styles.inputBox : styles.dependentOuterStyle}>
                        <AileronSemiBold
                            name="CNIC Number"
                            style={styles.selectLabel}
                        />
                        <TextInput
                            style={styles.popupInput}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.selectPlaceholder}
                            editable={inputDisable}
                        />
                    </DependentBox>

                    <DependentBox containerStyle={editable ? styles.inputBox : styles.dependentOuterStyle}>
                        <AileronSemiBold
                            name="Your Email"
                            style={styles.selectLabel}
                        />
                        <TextInput
                            style={styles.popupInput}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.selectPlaceholder}
                            editable={inputDisable}
                        />
                    </DependentBox> */}

          {/* <DependentBox containerStyle={editable ? styles.inputBox : styles.dependentOuterStyle}>
                        <AileronSemiBold
                            name="Mobile Number"
                            style={styles.selectLabel}
                        />
                        <TextInput
                            style={styles.popupInput}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.selectPlaceholder}
                            editable={inputDisable}
                        />
                    </DependentBox>

                    <DependentBox containerStyle={editable ? styles.inputBox : styles.dependentOuterStyle}>
                        <AileronSemiBold
                            name="Gender"
                            style={styles.selectLabel}
                        />
                        <TextInput
                            style={styles.popupInput}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.selectPlaceholder}
                            editable={inputDisable}
                        />
                    </DependentBox>

                    <DependentBox containerStyle={editable ? styles.inputBox : styles.dependentOuterStyle}>
                        <AileronSemiBold
                            name="Date of Birth"
                            style={styles.selectLabel}
                        />
                        <TextInput
                            style={styles.popupInput}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.selectPlaceholder}
                            editable={inputDisable}
                        />
                    </DependentBox> */}
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
