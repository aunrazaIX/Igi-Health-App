import { View, Text, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../assets/theme/colors'
import { vh, vw } from '../../assets/theme/dimension'


const DependentBox = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <View style={styles.detailBox}>
            {children}
        </View>
    )
}

export default DependentBox

const styles = StyleSheet.create({
    detailBox: {
        borderColor: COLORS.dependentBorder,
        borderWidth: 2,
        padding: vh * 2,
        borderRadius: vh * 2,
        marginTop: vh * 2
    },
})