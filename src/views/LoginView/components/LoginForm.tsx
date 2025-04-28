import React from 'react'
import { AileronBold, AileronSemiBold, Button, CheckBox, InputField } from '../../../components'
import { styles } from '../styles'
import { Image, TouchableOpacity, View } from 'react-native'
import { icons } from '../../../assets'

const LoginForm = () => {
    return (
        <>
            <AileronSemiBold
                numberOfLines={2}
                name={'Enter your email or mobile number to access your account.'}
                style={styles.loginContainerText}
            />
            <InputField
                label="Email Address / Mobile Number"
                placeholder="Enter Email/Mobile Number" rightIcon={icons.email}
            />
            <InputField
                label="Your Password"
                secureTextEntry
                placeholder="Enter Password"
            />
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <CheckBox description="Remember me" />
                <TouchableOpacity>
                    <AileronSemiBold
                        style={styles.forgetPassword}
                        name="Forgot Password ?"
                    />
                </TouchableOpacity>
            </View>

            <Button containerStyle={styles.loginButton} name="login" />
            <AileronBold style={styles.orText} name="Or" />
            <View style={styles.loginOptionContainer}>
                <View style={styles.loginOptionBox}>
                    <Image source={icons.faceID} />
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.loginOptionBox}>
                    <Image source={icons.fingerprint} />
                </View>
            </View>

        </>
    )
}

export default LoginForm