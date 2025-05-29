import {
    View, Image, ImageBackground, TouchableOpacity,
    ImageSourcePropType,
} from 'react-native'
import React from 'react'
import { AileronBold, AileronSemiBold, Container, CurvedView, TopView, } from '../../components'
import { icons, images } from '../../assets'
import styles from './styles'
import DependentBox from '../../components/DependentBox'
import { personalDetail } from '../../types/personalTypes'
import ConfimationModal from '../../components/Modal/confimationModal'
import { ScrollView } from 'react-native-gesture-handler'
import { vh } from '../../assets/theme/dimension'
import AddModal from '../../components/Modal/AddModal'


type Props = {
    data: dependentDetail[];
    gender: personalDetail[];
    relation: personalDetail[];
    goBack: () => void;
    handleSubmit?: () => void;
    manageUpdate?: () => void;
    setModalVisible: (val: boolean) => void;
    modalVisible: boolean;
    deleteDepenedent: () => void;
    confimationModalVisible: boolean;
    setConfimationModalVisible: (val: boolean) => void;
    toggleExpand: (index: number) => void;
    expandedIndex: number | null;
}

type dependentDetail = {
    dependent: string;
    image: ImageSourcePropType;
    dependentDetail: Item[]
}

type Item = {
    label: string;
    value: string;
}



const PersonalView: React.FC<Props> = ({ data, gender, relation, goBack, handleSubmit, manageUpdate, modalVisible, setModalVisible, deleteDepenedent, confimationModalVisible, setConfimationModalVisible, toggleExpand, expandedIndex }) => {
    return (
        <Container>
            <TopView onPressBack={goBack} title={'Personal'} TopViewFirstIcon={images.AddNew} FirstOpenModal={manageUpdate} />
            <CurvedView>
                <ScrollView>
                    <View>
                        <ImageBackground source={images.SecureFuture} style={styles.personalImage}>
                            <View style={styles.secureTextGrp}>
                                <AileronSemiBold style={styles.secureText} name={'We\nSecure\nYour'} />
                                <AileronSemiBold style={styles.futureText} name={'Future!'} />
                            </View>
                        </ImageBackground>

                        <View style={styles.dependentBox}>
                            <AileronBold name={'Dependent '} style={styles.dependentText} />
                            <AileronBold name={'Details!'} style={styles.detailsText} />
                        </View>

                        {data.map((dependent, index) => (
                            <DependentBox key={index} containerStyle={styles.dependentBoxStyle}>
                                <TouchableOpacity onPress={() => toggleExpand(index)}>
                                    <View style={styles.header} >
                                        <Image source={dependent.image} style={styles.avatar} />
                                        <AileronBold style={styles.headerText} name={dependent.dependent} />
                                        <View style={styles.iconsROw}>
                                            {expandedIndex === index && (
                                                <View style={styles.deleteEditRow}>
                                                    <TouchableOpacity
                                                        onPress={manageUpdate}
                                                    >
                                                        <Image source={icons.edit} style={styles.editIcon} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => deleteDepenedent()}>
                                                        <Image source={icons.delete} style={styles.deleteIcon} />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            <Image
                                                source={expandedIndex === index ? icons.selectArrowUp : icons.arrowDown}
                                                style={styles.icon}
                                            />
                                        </View>
                                    </View>

                                    {expandedIndex === index && (
                                        <View style={styles.details}>
                                            {dependent.dependentDetail.map((item, index) => (
                                                <View style={styles.detailRow} key={index}>
                                                    <AileronSemiBold name={item.label} style={styles.detailLabel} />
                                                    <AileronSemiBold name={item.value} style={styles.detailvalue} />
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </DependentBox>
                        ))}
                    </View>
                </ScrollView>
            </CurvedView>

            <AddModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                gender={gender}
                relation={relation}
                onPressSubmit={handleSubmit}
            />

            <ConfimationModal
                ConfirmationModalVisible={confimationModalVisible}
                setConfirmationModalVisible={setConfimationModalVisible}
                handleDelete={deleteDepenedent}
                frameImage={images.personalFrame}
                confirmationMessage={'Are you sure you want to delete this dependent detail? This action cannot be undone, and it may affect other related data.'}
                confirmationRequired={true}
                deleteButton={true}
                CloseButtonText={'Close'}
            />
        </Container>
    )
}

export default PersonalView

