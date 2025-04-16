import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AileronSemiBold, Button, CurvedView, TopView } from '../../components'
import styles from './styles'

import PriorUploadDocument from './components/PriorUploadDocument'

const PriorApprovalUploadView = () => {
    const [remarks, setRemarks] = useState('')
    return (
        <>
            <TopView title={'Prior Approval'} />
            <CurvedView>

                <View style={styles.uploadFileContainer}>
                    <PriorUploadDocument />

                    <View>
                        <View style={styles.addRemarks}>
                            <AileronSemiBold name='Add Remarks' style={styles.remarks} />
                            <View style={styles.remarksBox}>
                                <TextInput
                                    multiline={true}
                                    value={remarks}
                                    onChangeText={setRemarks}
                                    style={styles.remarksInput}
                                    numberOfLines={4}
                                    placeholder='Attached is the medical invoice with a breakdown of treatment expenses, including consultation and medications. Please let me know if additional documentation is needed.'
                                />
                            </View>
                        </View>
                        <Button name='Submit Approval' containerStyle={styles.submitButton} inputStyle={styles.submitText} />
                    </View>
                </View>
            </CurvedView>
        </>
    )
}

export default PriorApprovalUploadView