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
  return (
    <>
      <TopView title="Profile" titleStyle={{letterSpacing: vw * 0.15}} />
      <CurvedView containerStyle={styles.curvedStyle}>
        <View style={styles.profileDetailContainer}>
          {/* 
                    <TouchableOpacity style={styles.editIconRow} onPress={handleEdit}>
                        <Image source={icons.editIcon} style={styles.editIcon} />
                        <AileronSemiBold name='Edit' style={styles.editText} />
                    </TouchableOpacity> */}

          <View style={styles.profileDetail}>
            <AileronBold
              name={'Imran Naveed Qureshi'}
              style={styles.ProfileName}
            />
            <AileronRegular
              name={'imran-naveed-8852@gmail.com'}
              style={styles.profileEmail}
            />
          </View>
          {ProfileData?.map((item, index) => (
            <DependentBox
              key={index}
              containerStyle={
                editable ? styles.inputBox : styles.dependentOuterStyle
              }>
              <AileronSemiBold name={item?.label} style={styles.selectLabel} />
              <TextInput
                value={item?.value}
                style={styles.popupInput}
                placeholder={item?.placeholder}
                placeholderTextColor={COLORS.selectPlaceholder}
                editable={inputDisable}
              />
            </DependentBox>
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
