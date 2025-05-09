import React, { forwardRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
  ImageSourcePropType,
} from 'react-native';
import { fonts } from '../../assets/fonts';
import { icons } from '../../assets';
import MaskInput from 'react-native-mask-input';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';

type StyleObject = Record<string, string | number | boolean>;

interface InputFieldProps extends TextInputProps {
  searchIcon?: ImageSourcePropType;
  searchFieldRight?: StyleObject;
  searchFieldRightIcon?: StyleObject;
  label?: string;
  labelStyle?: StyleObject | StyleObject[] | any;
  containerStyle?: object;
  inputStyle?: object;
  mask?: boolean;
  lightBorder?: boolean;
  rightIcon?: any;
  iconViewStyle?: StyleObject | StyleObject[];
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      searchIcon,
      searchFieldRight,
      searchFieldRightIcon,
      label,
      labelStyle,
      placeholder,
      containerStyle,
      inputStyle,
      value,
      onSubmitEditing,
      onChangeText,
      iconViewStyle,
      keyboardType,
      returnKeyType,
      multiline,
      secureTextEntry = false,
      maxLength,
      autoFocus = false,
      editable = true,
      mask = false,
      lightBorder = false,
      rightIcon = undefined,
      ...rest
    },
    ref,
  ) => {
    const InputComponent = mask ? MaskInput : TextInput;
    const [showPassword, setShowPassword] = useState(secureTextEntry);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelContainer}>
            <AileronBold style={[styles.label, labelStyle]} name={label} />
          </View>
        )}
        <View style={styles.inheritStyles}>
          <InputComponent
            ref={ref}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            multiline={multiline}
            maxLength={maxLength}
            style={[
              styles.textInput,
              inputStyle,
              !editable && { color: COLORS.black + '55' },
            ]}
            placeholder={placeholder}
            placeholderTextColor={
              editable ? COLORS.placeholderColor + '88' : COLORS.black + '44'
            }

            value={value}
            editable={editable}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            secureTextEntry={showPassword}
            returnKeyType={returnKeyType}
            contextMenuHidden
            selectTextOnFocus={false}
            textAlignVertical={multiline ? 'top' : 'auto'}
            {...rest}
          />
          {(secureTextEntry || rightIcon) && (
            <TouchableOpacity
              disabled={!secureTextEntry}
              onPress={() => setShowPassword(!showPassword)}
              style={[styles.iconView, iconViewStyle]}>
              <Image
                style={styles.eyeIcon}
                source={
                  rightIcon || (showPassword ? icons.eyeClosed : icons.eyeOpen)
                }
              />
            </TouchableOpacity>
          )}
        </View>

        {searchIcon && (
          <View style={searchFieldRight}>
            <Image style={searchFieldRightIcon} source={icons.searchBlack} />
          </View>
        )}
      </View>
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.black + '22',
    height: vh * 6.5,
    borderRadius: vw * 4,
    backgroundColor: COLORS.white,
    marginVertical: vh * 1.5,
    paddingHorizontal: vw * 2,

    // flexDirection: 'row',

    flexDirection: 'column',
    // position: 'absolute',
  },
  inheritStyles: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: vw * 1.5,
  },
  labelContainer: {
    top: vh * 1.5,
    paddingHorizontal: vw * 2,
    // borderWidth:2,
  },

  label: {
    textAlign: 'left',

    fontSize: vw * 3,
    color: COLORS.textGrayShade,
  },
  textInput: {
    width: '85%',
    height: '100%',
    fontSize: vw * 3.55,
    color: COLORS.textBlackShade,
    fontFamily: fonts.Aileron.regular,


    fontWeight: '700',
  },
  iconView: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    bottom: vh * 1.5,
  },
  eyeIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
