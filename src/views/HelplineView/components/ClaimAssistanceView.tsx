import React from 'react'
import { View } from 'react-native'
import styles from '../styles'
import { AileronRegular, AileronSemiBold } from '../../../components'
import { ClaimAssistance } from '../../../viewmodels/useHelplineViewModel'

const ClaimAssistanceView = ({ data }: {
    data: ClaimAssistance[];
}) => {
    return (
        <View style={styles.box}>
            <AileronSemiBold style={styles.title} name="Claim Assistance" />
            {data?.map((item, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                    <AileronRegular style={styles.subtitle} name={item?.title} />
                    <AileronSemiBold style={styles.name} name={item?.name} />
                    {item?.position && (
                        <AileronSemiBold style={styles.subtitle} name={`(${item?.position})`} />
                    )}
                    <AileronSemiBold style={styles.subtitle} name={`Phone: ${item?.phone}`} />
                    {item.cell && (
                        <AileronSemiBold style={styles.subtitle} name={`Direct Cell #: ${item?.cell}`} />
                    )}
                </View>
            ))}
        </View>

    )
}

export default ClaimAssistanceView