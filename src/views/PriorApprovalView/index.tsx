import React from 'react'
import { AileronSemiBold, CurvedView, Select, TopView } from '../../components'
import PatientsDetailView from './components/patientsDetailView'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../assets/theme/colors'
import styles from './styles'
import { TouchableOpacity, View } from 'react-native'

// const patients = [
//     { id: 1, name: 'Imran Naveed Qureshi' },
//     { id: 2, name: 'Madiha Imran Qureshi' },
//     { id: 3, name: 'Saad Imran Qureshi' },
// ];

const PriorApprovalView = ({ data, selectData }: any) => {

    return (
        <>
            <TopView title='Prior Approval' />
            <CurvedView>
                <View style={styles.container}>
                    <View>
                        <Select selectData={selectData} selectLabel={'Patient Information'} selectPlaceholder={'-- Select Patient From List --'} />

                        <PatientsDetailView data={data} />
                    </View>
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

            </CurvedView>
        </>
    )
}

export default PriorApprovalView