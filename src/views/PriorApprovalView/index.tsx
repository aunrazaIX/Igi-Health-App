import React from 'react'
import { AileronSemiBold, CurvedView, Select, TopView } from '../../components'
import PatientsDetailView from './components/patientsDetailView'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../assets/theme/colors'
import styles from './styles'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { vh } from '../../assets/theme/dimension'

const PriorApprovalView = ({ data, selectData, goBack }: any) => {

    return (
        <>
            <TopView onPressBack={goBack} title='Prior Approval' />
            <CurvedView containerStyle={styles.curvedStyles}>
                <View style={styles.container}>
                    <Select selectData={selectData} selectLabel={'Patient Information'} selectPlaceholder={'-- Select Patient From List --'} />
                    <PatientsDetailView data={data} />
                </View>
            </CurvedView>
        </>
    )
}

export default PriorApprovalView