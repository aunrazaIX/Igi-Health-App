import React from 'react'
import { AileronBold, CurvedView, TopView } from '../../components'
import PatientsSelect from './components/PatientsSelect'
import DependentBox from '../../components/DependentBox'
import PatientsDetailView from './components/patientsDetailView'

const PriorApprovalView = () => {

    return (
        <>
            <TopView title='Prior Approval' />
            <CurvedView>
                <PatientsSelect />

                <PatientsDetailView />
            </CurvedView>
        </>
    )
}

export default PriorApprovalView