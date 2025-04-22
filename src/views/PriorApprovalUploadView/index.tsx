import { View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AileronSemiBold, Button, CurvedView, TopView } from '../../components'
import styles from './styles'
import PriorUploadDocument from './components/PriorUploadDocument'
import ConfimationModal from '../../components/Modal/confimationModal'
import { images } from '../../assets'


const PriorApprovalUploadView = () => {
    const [remarks, setRemarks] = useState('')
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
    return (
        <>
            <TopView title={'Prior Approval'} />
            <CurvedView>
                <ScrollView>
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
                            <Button name='Submit Approval' onPress={() => setConfirmationModalVisible(true)}
                                containerStyle={styles.submitButton}
                                inputStyle={styles.submitText} />
                        </View>
                    </View>
                </ScrollView>
            </CurvedView>

            <ConfimationModal
                ConfirmationModalVisible={confirmationModalVisible}
                setConfirmationModalVisible={setConfirmationModalVisible}
                frameImage={images.taskDone}
                confirmationMessage={'Thank you for submitting your claims. You will soon receive a confirmation email with updates on the progress of your claims. Please make a note of your [Claim No: 13159 ].'}
                closeButton={true}
                claimSubmission={true}
                containerStyle={styles.confimationContainer}
            />
        </>
    )
}

export default PriorApprovalUploadView