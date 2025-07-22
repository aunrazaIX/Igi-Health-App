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
      <View
        style={[
          styles.container,
          containerStyle,
          multiline && {height: vh * 11},
        ]}>
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
        {typeof errorMessage == 'string' && (
          <AileronBold style={styles.errorText} name={errorMessage || ''} />
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
    height: vh * 8,
    borderRadius: vw * 4,
    backgroundColor: COLORS.white,
    marginVertical: vh * 1.5,
    paddingHorizontal: vw * 2,
    flexDirection: 'column',
    paddingVertical: vh,
  },
  inheritStyles: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: vw * 1.5,
  },
  labelContainer: {
    paddingHorizontal: vw * 2,
  },

  label: {
    textAlign: 'left',
    fontSize: vw * 3,
    color: COLORS.textBlackShade,
  },
  textInput: {
    width: '85%',
    height: '100%',
    fontSize: vw * 3.55,
    color: COLORS.textBlackShade,
    fontFamily: fonts.Aileron.bold,
    bottom: vh * 0.5,
  },
  iconView: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    bottom: vh * 1.5,
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
