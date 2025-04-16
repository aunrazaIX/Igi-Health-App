import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { icons, images } from '../../assets';
import { COLORS } from '../../assets/theme/colors';
import { vh, vw } from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import AileronSemiBold from '../AileronSemiBold';
import AileronRegular from '../AileronRegular';
import LinearGradient from 'react-native-linear-gradient';

type ModalDeleteProps = {
    deleteModalVisible: boolean;
    setDeleteModalVisible: (val: boolean) => void;

};

const ModalDelete: React.FC<ModalDeleteProps> = ({ deleteModalVisible, setDeleteModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={styles.modalClose}>
                        <Image source={icons.CancelIcon} />
                    </TouchableOpacity>

                    <View style={styles.personalFrameContainer}>
                        <Image source={images.personalFrame} style={styles.personalFrameIMG} />

                        <View style={styles.confirmationContainer}>
                            <AileronBold name='Confirmation ' style={styles.confirmation} />
                            <AileronBold name='Required' style={styles.required} />
                        </View>

                        <AileronSemiBold
                            name={'Are you sure you want to delete this dependent detail? This action cannot be undone, and it may affect other related data.'}
                            style={styles.confimationDetail}
                        />
                    </View>

                    <View style={styles.confimationButtonContainer}>
                        <TouchableOpacity style={styles.cancelButton}>
                            <AileronBold name='Cancel' style={styles.cancelButtonText} />
                        </TouchableOpacity>

                        <LinearGradient style={styles.deleteButton} colors={COLORS.deleteButtonGradient}>
                            <AileronBold name='Delete' style={styles.deleteButtonText} />
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalDelete


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: COLORS.white,
        borderTopRightRadius: vw * 6,
        borderTopLeftRadius: vw * 6,
        width: '100%',
        height: '45%',
        paddingHorizontal: vh * 2,
        paddingTop: vh * 2.5,
        paddingBottom: vh * 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: vw * 6,
        elevation: vw * 7,
    },
    modalClose: {
        alignSelf: 'flex-end',
        marginBottom: -vh * 1
    },
    personalFrameContainer: {
        alignItems: 'center',
    },
    personalFrameIMG: {
        width: vh * 9.5,
        height: vh * 9.5,
    },
    confirmationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: vh * 3
    },
    confirmation: {
        fontSize: vh * 3,
        color: COLORS.coverageTitle,
        fontWeight: '700',
    },
    required: {
        fontSize: vh * 3,
        color: COLORS.benefitTitle,
        fontWeight: '700',
    },
    confimationDetail: {
        fontSize: vh * 1.85,
        color: COLORS.confimationDetail,
        marginVertical: vh * 1.5,
        lineHeight: vh * 2.7,
    },
    confimationButtonContainer: {
        flexDirection: 'row',
        gap: '4%'
    },
    cancelButton: {
        width: '48%',
        borderWidth: vh * .2,
        borderRadius: vh * 1.3,
        padding: vh * 2,
        borderColor: COLORS.cancelButtonBorder,
        backgroundColor: COLORS.cancelBottonBackground,
    },
    deleteButton: {
        width: '48%',
        borderRadius: vh * 1.3,
        padding: vh * 2,
    },
    cancelButtonText: {
        fontSize: vh * 1.7,
        color: COLORS.cancelButton
    },
    deleteButtonText: {
        fontSize: vh * 1.7,
        color: COLORS.white
    },
})