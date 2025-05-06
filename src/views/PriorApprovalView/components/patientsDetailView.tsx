import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import DependentBox from '../../../components/DependentBox'
import { AileronBold, AileronSemiBold } from '../../../components'
import styles from '../styles'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../../assets/theme/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { vh } from '../../../assets/theme/dimension'


type DetailItem = {
    label: string;
    value: string;
};

type SectionData = {
    sectionTitle: string;
    icon: any;
    PatientData: DetailItem[];
};

const PatientsDetailView = ({ data }: { data: SectionData[] }) => {

    return (
        <ScrollView>
            <View style={{ paddingBottom: vh * 11 }}>
                {
                    data.map((section: SectionData, index: number) => (
                        <DependentBox key={index}>
                            <View style={styles.header}>
                                <Image source={section.icon} style={styles.avatar} />
                                <AileronBold style={styles.headerText} name={section.sectionTitle} />
                            </View>

                            <View style={styles.details}>
                                {section?.PatientData?.map((item, index) => (
                                    <View style={styles.detailRow} key={index}>
                                        <AileronSemiBold name={item.label} style={styles.detailLabel} />
                                        <AileronSemiBold name={item.value} style={styles.detailvalue} />
                                    </View>

                                ))}
                            </View>
                        </DependentBox>
                    ))
                }
                <View>
                    <LinearGradient
                        colors={COLORS.PriorGradient}
                        style={styles.priorGradient}
                    >
                        <TouchableOpacity style={styles.priorTouchable}>
                            <AileronSemiBold style={styles.priorNext} name={'Add More'} />
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={COLORS.PriorGradient}
                        style={styles.priorGradient}
                    >
                        <TouchableOpacity style={styles.priorTouchable}>
                            <AileronSemiBold style={styles.priorNext} name={'Next'} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>
    )
}

export default PatientsDetailView