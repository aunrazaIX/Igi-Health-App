import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import DependentBox from '../../../components/DependentBox'
import { AileronBold, AileronSemiBold } from '../../../components'
import { icons } from '../../../assets'
import styles from '../styles'
import { COLORS } from '../../../assets/theme/colors'
import LinearGradient from 'react-native-linear-gradient'



const sectionDetails: SectionData[] = [
    {
        sectionTitle: 'Personal Details',
        icon: icons.personalDetail,
        data: [
            { label: 'Name of Employee:', value: 'Imran Naveed Qureshi' },
            { label: 'Bank Name:', value: 'Bank Al Habib' },
            { label: 'Account Number:', value: '1234-5678-9101112-3' },
            { label: 'Bank IBAN:', value: 'PK47 XYZ 1234 5678 9101112 3 0' },
        ],
    },
    {
        sectionTitle: 'Claims Details',
        icon: icons.claimDetails,
        data: [
            { label: 'Services:', value: 'General OPD, Dental, Optical' },
            { label: 'Eligible Users:', value: 'Self, Spouse, Children' },
            { label: 'Reimbursement:', value: '28827' },
            { label: 'Total OPD:', value: '---' },
        ],
    },
];


type DetailItem = {
    label: string;
    value: string;
};

type SectionData = {
    sectionTitle: string;
    icon: any;
    data: DetailItem[];
};


const PatientsDetailView = () => {
    const dependentRenders = ({ item }: { item: DetailItem }) => (
        <View style={styles.detailRow}>
            <AileronSemiBold name={item.label} style={styles.detailLabel} />
            <AileronSemiBold name={item.value} style={styles.detailvalue} />
        </View>
    )

    return (
        <>

            {
                sectionDetails.map((section: SectionData, index: number) => (
                    <DependentBox key={index}>
                        <View style={styles.header}>
                            <Image source={section.icon} style={styles.avatar} />
                            <AileronBold style={styles.headerText} name={section.sectionTitle} />
                        </View>

                        <View style={styles.details}>
                            <FlatList
                                data={section.data}
                                keyExtractor={(_, index) => index.toString()}
                                contentContainerStyle={styles.detailsListContainer}
                                renderItem={dependentRenders}
                            />
                        </View>
                    </DependentBox>
                ))
            }


            <LinearGradient
                colors={COLORS.PriorGradient}
                style={styles.priorGradient}
            >
                <TouchableOpacity style={styles.priorTouchable}>
                    <AileronBold style={styles.priorNext} name={'Next'} />
                </TouchableOpacity>
            </LinearGradient>
        </>
    )
}

export default PatientsDetailView