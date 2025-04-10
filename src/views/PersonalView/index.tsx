import {
    View, Image, ImageBackground, TouchableOpacity,
    FlatList,

} from 'react-native'
import React, { useState } from 'react'
import { AileronBold, AileronSemiBold, Container, CurvedView, TopView, } from '../../components'
import { icons, images } from '../../assets'
import styles from './styles'
import DependentBox from '../../components/DependentBox'

// const dependentDetails = [

//     [
//         { label: 'Name:', value: 'Madiha Imran Qureshi' },
//         { label: 'Gender:', value: 'Female' },
//         { label: 'Relationship:', value: 'Wife' },
//         { label: 'Age:', value: '35 Years' },
//     ]
// ];

type Props = {
    data: Item[];
}

type Item = {
    label: String;
    value: String;
}

const PersonalView: React.FC<Props> = ({ data }) => {

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const dependentRenders = ({ item }) => (
        <View style={styles.detailRow}>
            <AileronSemiBold name={item.label} style={styles.detailLabel} />
            <AileronSemiBold name={item.value} style={styles.detailvalue} />
        </View>
    )


    return (
        <Container>
            <TopView title={'Personal'} TopViewSideIcon={images.AddNew}>

            </TopView>
            <CurvedView>
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

                <DependentBox>
                    <View style={styles.header} >
                        <Image source={icons.frame} style={styles.avatar} />
                        <AileronBold style={styles.headerText} name={'Dependent Detail'} />
                        <View style={styles.iconsROw}>
                            <Image source={icons.edit} style={styles.editIcon} />
                            <Image source={icons.delete} style={styles.deleteIcon} />
                            <TouchableOpacity onPress={toggleExpand}>
                                <Image
                                    source={expanded ? icons.arrowUp : icons.arrowDown}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {expanded && (
                        <View style={styles.details}>
                            <FlatList
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.detailsListContainer}
                                renderItem={dependentRenders}
                            />
                        </View>
                    )}
                </DependentBox>

            </CurvedView>
        </Container>
    )
}

export default PersonalView

