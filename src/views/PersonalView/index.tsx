import {
    View, Image, ImageBackground, TouchableOpacity,
    ImageSourcePropType,
} from 'react-native'
import React, { useState } from 'react'
import { AileronBold, AileronSemiBold, Container, CurvedView, TopView, } from '../../components'
import { icons, images } from '../../assets'
import styles from './styles'
import DependentBox from '../../components/DependentBox'
import ModalCustom from '../../components/Modal'
import { personalDetail } from '../../types/personalTypes'
import ConfimationModal from '../../components/Modal/confimationModal'
import { ScrollView } from 'react-native-gesture-handler'
import { vh } from '../../assets/theme/dimension'


type Props = {
    data: dependentDetail[];
    gender: personalDetail[];
    relation: personalDetail[];
    goBack: () => void
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



const PersonalView: React.FC<Props> = ({ data, gender, relation, goBack }) => {

    const [expanded, setExpanded] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ConfimationModalVisible, setConfimationModalVisible] = useState(false);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    // const dependentRenders = ({ item }: { item: Item }) => (
    //     <View style={styles.detailRow}>
    //         <AileronSemiBold name={item.label} style={styles.detailLabel} />
    //         <AileronSemiBold name={item.value} style={styles.detailvalue} />
    //     </View>
    // )

    const manageUpdate = () => {
        setModalVisible(true)
    }

    const deleteDepenedent = () => {
        setConfimationModalVisible(false)
    }

    return (
        <Container>
            <TopView onPressBack={goBack} title={'Personal'} TopViewFirstIcon={images.AddNew} FirstOpenModal={manageUpdate} />
            <CurvedView>
                <ScrollView>
                    <View style={{ paddingBottom: vh * 21 }}>
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
                                <View style={styles.header} >
                                    <Image source={dependent.image} style={styles.avatar} />
                                    <AileronBold style={styles.headerText} name={dependent.dependent} />
                                    <View style={styles.iconsROw}>
                                        {expandedIndex === index && (
                                            <View style={styles.deleteEditRow}>
                                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                    <Image source={icons.edit} style={styles.editIcon} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => setConfimationModalVisible(true)}>
                                                    <Image source={icons.delete} style={styles.deleteIcon} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        <TouchableOpacity onPress={() => toggleExpand(index)}>
                                            <Image
                                                source={expandedIndex === index ? icons.selectArrowUp : icons.arrowDown}
                                                style={styles.icon}
                                            />
                                        </TouchableOpacity>
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
                                        {/* <FlatList
                                    data={dependent.dependentDetail}
                                    keyExtractor={(_, index) => index.toString()}
                                    contentContainerStyle={styles.detailsListContainer}
                                    renderItem={dependentRenders}
                                /> */}
                                    </View>
                                )}
                            </DependentBox>
                        ))}
                    </View>
                </ScrollView>
            </CurvedView>

            <ModalCustom
                expanded={expanded}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                gender={gender}
                relation={relation}
            />

            <ConfimationModal
                ConfirmationModalVisible={ConfimationModalVisible}
                setConfirmationModalVisible={setConfimationModalVisible}
                handleDelete={deleteDepenedent}
                frameImage={images.personalFrame}
                confirmationMessage={'Are you sure you want to delete this dependent detail? This action cannot be undone, and it may affect other related data.'}
                confirmationRequired={true}
                deleteButton={true}
            />
        </Container>
    )
}

export default PersonalView

