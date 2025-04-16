import { View, Modal, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/theme/colors'
import { vh, vw } from '../../assets/theme/dimension'
import AileronBold from '../AileronBold'
import DependentBox from '../DependentBox'
import AileronRegular from '../AileronRegular'
import Select from '../Select'
import Button from '../Button'
import { icons, images } from '../../assets'
import { personalDetail } from '../../types/personalTypes'


type ModalCustomProps = {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    expanded: boolean;
    gender: personalDetail[];
    relation: personalDetail[]
};

const ModalCustom: React.FC<ModalCustomProps> = ({ modalVisible, setModalVisible, gender, relation }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                        <Image source={icons.CancelIcon} />
                    </TouchableOpacity>

                    <View style={styles.personalFrameContainer}>
                        <Image source={images.personalFrame} style={styles.personalFrameIMG} />

                        <View style={styles.manageContainer}>
                            <AileronBold name={'Manage Update'} style={styles.manageText} />
                            <AileronBold name={'Dependent Details'} style={styles.DependentText} />
                        </View>

                        <DependentBox containerStyle={styles.dependentOuterStyle}>
                            <AileronRegular name='Dependent Name' style={styles.selectLabel} />
                            <TextInput style={styles.popupInput} />
                        </DependentBox>

                        <Select selectData={gender} selectLabel={'Gender'} selectPlaceholder={'-- Select Gender --'} />

                        <Select selectData={relation} selectLabel={'Relationship'} selectPlaceholder={'-- Select Relation --'} />

                        <DependentBox containerStyle={styles.dependentOuterStyle}>
                            <AileronRegular name='Age' style={styles.selectLabel} />
                            <TextInput style={styles.popupInput} />
                        </DependentBox>

                        <Button name='Submit' containerStyle={styles.modalAddButton} inputStyle={styles.modalAddText} />

                        <Button name='Cancel' containerStyle={styles.modalCancelButton} gradientColors={['#E1E3E6', '#E1E3E6']} inputStyle={styles.modalCancelText} />


                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalCustom


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
        height: '88%',
        paddingHorizontal: vh * 1,
        paddingTop: vh * 3.5,
        paddingBottom: vh * 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: vw * 6,
        elevation: vw * 5,

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
    manageContainer: {
        marginVertical: vh * 1.5
    },
    manageText: {
        color: COLORS.coverageTitle,
        fontSize: vh * 3,
    },
    DependentText: {
        color: COLORS.benefitTitle,
        fontSize: vh * 3,
    },
    dependentOuterStyle: {
        width: '100%',
        borderWidth: vh * .3,
        paddingHorizontal: vh * 1.5,
        paddingTop: vh * 1.5,
        paddingBottom: vh * 0.2
    },
    selectLabel: {
        textAlign: 'left',
        color: COLORS.personalValue,
        fontSize: vh * 1.6
    },
    popupInput: {
        marginTop: vh * -0.9,
        marginLeft: 0,
        color: COLORS.personalValue,
        fontSize: vh * 1.8,
        fontWeight: '500',
    },
    // popupSelectBox: {
    //     width: '100%',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    // selectedGender: {
    //     color: COLORS.personalValue,
    //     fontSize: vh * 1.8,
    //     fontWeight: '500',
    //     textAlign: 'left'
    // },
    // arrow: {
    //     width: vh * 2.5,
    //     height: vh * 2.5,
    // },
    modalAddButton: {
        marginTop: vh * 2,
        borderRadius: vw * 3.5,
    },
    modalAddText: {
        fontSize: vh * 2,
        fontWeight: '700',

    },
    modalCancelButton: {
        marginTop: vh * 2,
        borderRadius: vw * 3.5,

    },
    modalCancelText: {
        color: COLORS.cancelButton,
        fontSize: vh * 2,
        fontWeight: '700',

    },
})