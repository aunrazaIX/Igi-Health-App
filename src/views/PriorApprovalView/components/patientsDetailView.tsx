import { View, Image, FlatList } from 'react-native'
import React from 'react'
import DependentBox from '../../../components/DependentBox'
import { AileronBold, AileronSemiBold } from '../../../components'
import styles from '../styles'


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


    const dependentRenders = ({ item }: { item: DetailItem }) => (
        <View style={styles.detailRow}>
            <AileronSemiBold name={item.label} style={styles.detailLabel} />
            <AileronSemiBold name={item.value} style={styles.detailvalue} />
        </View>
    )

    return (
        <>
            {
                data.map((section: SectionData, index: number) => (
                    <DependentBox key={index}>
                        <View style={styles.header}>
                            <Image source={section.icon} style={styles.avatar} />
                            <AileronBold style={styles.headerText} name={section.sectionTitle} />
                        </View>

                        <View style={styles.details}>
                            <FlatList
                                data={section?.PatientData
                                }
                                keyExtractor={(_, index) => index.toString()}
                                contentContainerStyle={styles.detailsListContainer}
                                renderItem={dependentRenders}
                            />
                        </View>
                    </DependentBox>
                ))
            }
        </>
    )
}

export default PatientsDetailView