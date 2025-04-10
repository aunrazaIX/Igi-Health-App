import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import DependentBox from '../../../components/DependentBox'
import { AileronBold, AileronRegular } from '../../../components'
import styles from '../styles'
import { icons } from '../../../assets'

const patients = [
    { id: 1, name: 'Imran Naveed Qureshi' },
    { id: 2, name: 'Madiha Imran Qureshi' },
    { id: 3, name: 'Saad Imran Qureshi' },
];

const PatientsSelect = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleSelect = (patient) => {
        setSelectedPatient(patient);
        setDropdownVisible(false);
    };
    return (
        <>
            <DependentBox>
                <AileronRegular name='Patient Information' style={styles.Patient} />

                <View
                    style={styles.selectBox}
                >
                    <AileronBold style={styles.selectText} name={selectedPatient?.name || '-- Select Patient From List --'} />

                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        <Image style={styles.arrow} source={isDropdownVisible ? icons.arrowUp : icons.arrowDown} />
                    </TouchableOpacity>

                </View>

            </DependentBox>
            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={patients}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => handleSelect(item)}
                            >
                                <AileronBold name={item.name} style={styles.listText} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </>
    )
}

export default PatientsSelect