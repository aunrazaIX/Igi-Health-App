import React, {forwardRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
} from 'react-native';
import {fonts} from '../../assets/fonts';
import {icons} from '../../assets';
import MaskInput from 'react-native-mask-input';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';

type StyleObject = Record<string, string | number | boolean>;

interface InputFieldProps extends TextInputProps {
  searchFieldRight?: StyleObject;
  searchFieldRightIcon?: StyleObject;
  label?: string;
  labelStyle?: StyleObject | StyleObject[] | any;
  containerStyle?: object;
  inputStyle?: object;
  mask?: boolean;
  rightIcon?: any;
  iconViewStyle?: StyleObject | StyleObject[];
  errorMessage?: string;
  allowCopyPaste?: boolean;
  placeholderTextColor: any;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
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
      rightIcon = undefined,
      errorMessage,
      allowCopyPaste = true,
      placeholderTextColor,
      ...rest
    },
    ref,
  ) => {
    const InputComponent = mask ? MaskInput : TextInput;
    const [showPassword, setShowPassword] = useState(secureTextEntry);

    return (
      <View style={{width: '100%', marginVertical: vh * 1.5}}>
        <View
          style={[
            styles.container,
            containerStyle,
            multiline && {height: vh * 11},
          ]}>
          <View style={styles.inheritStyles}>
            {label && (
              <AileronBold style={[styles.label, labelStyle]} name={label} />
            )}
            <InputComponent
              ref={ref}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              multiline={multiline}
              maxLength={maxLength}
              style={[
                styles.textInput,
                inputStyle,
                !label && {bottom: 0},
                !editable && {color: COLORS.black + '55'},
              ]}
              placeholder={placeholder}
              placeholderTextColor={
                placeholderTextColor ??
                (multiline && editable
                  ? COLORS.textGrayShade
                  : editable
                  ? COLORS.textGrayShade
                  : COLORS.black + '44')
              }
              value={value}
              editable={editable}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChangeText}
              autoCapitalize="none"
              secureTextEntry={showPassword}
              returnKeyType={returnKeyType}
              contextMenuHidden={!allowCopyPaste}
              selectTextOnFocus={allowCopyPaste}
              textAlignVertical={multiline ? 'top' : 'auto'}
              mask={mask}
              {...rest}
            />
          </View>
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
        {console.log('errorMessage', errorMessage)}
        {typeof errorMessage === 'string' && errorMessage && (
          <AileronBold
            style={styles.errorText}
            name={
              errorMessage
                ? errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
                : ''
            }
          />
        )}
      </View>
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.black + '22',
    height: vh * 7.5,
    borderRadius: vw * 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: vw * 1.5,
    flexDirection: 'row',
    paddingVertical: vh * 0.5,
  },
  inheritStyles: {
    flex: 1,
    // backgroundColor: 'red',
  },
  label: {
    height: '38%',
    textAlign: 'left',
    fontSize: vw * 2.75,
    // backgroundColor: 'black',
    color: COLORS.textBlackShade,
    paddingVertical: vh * 0.2,
  },
  textInput: {
    height: '65%',
    color: COLORS.personalValue,
    fontFamily: fonts.inter.regular,
    padding: 0,
    width: '100%',
  },
  iconView: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  eyeIcon: {
    width: vw * 7,
    height: vw * 7,
    resizeMode: 'contain',
    top: vh * 0.5,
  },
  errorText: {
    textAlign: 'left',
    fontSize: vw * 3,
    color: COLORS.benefitTitle,
  },
});
