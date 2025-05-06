import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme/colors";
import { vh, vw } from "../../assets/theme/dimension";

const styles = StyleSheet.create({
    personalImage: {
        resizeMode: 'contain',
        width: '100%',
        height: vh * 24
    },
    secureTextGrp: {
        height: '100%',
        justifyContent: 'center',
        padding: vh * 2,
    },

    secureText: {
        color: COLORS.coverageTitle,
        textAlign: 'left',
        fontSize: vh * 3,
    },
    futureText: {
        color: COLORS.benefitTitle,
        textAlign: 'left',
        fontSize: vh * 3,
    },
    dependentBox: {
        flexDirection: 'row',
        marginTop: vh * 3,
    },
    dependentText: {
        fontSize: vh * 2.2,
        color: COLORS.coverageTitle,
    },
    detailsText: {
        fontSize: vh * 2.2,
        color: COLORS.benefitTitle,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: vh * 5,
        height: vh * 5,
        borderRadius: 20,
        marginRight: 10,
    },
    headerText: {
        flex: 1,
        textAlign: 'left',
        fontSize: vh * 1.8,
        color: COLORS.insuredPrice
    },
    icon: {
        width: vw * 6.6,
        height: vw * 6.6,
        resizeMode: 'contain',
    },
    details: {
        marginTop: 10,
        borderTopWidth: 2,
        borderTopColor: COLORS.dependentBorder,
        borderStyle: 'dashed',
        paddingTop: vh * 1,
        gap: vh * 1.5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // detailsListContainer: {
    //     gap: vh * 1.5
    // },
    iconsROw: {
        flexDirection: 'row',
        gap: vh * 1,
        alignItems: 'center'
    },
    editIcon: {
        width: vh * 3,
        height: vh * 3
    },
    deleteIcon: {
        width: vh * 3,
        height: vh * 3

    },
    detailLabel: {
        fontSize: vh * 1.6,
        color: COLORS.personalLabel
    },
    detailvalue: {
        fontSize: vh * 1.6,
        color: COLORS.personalValue
    },
    deleteEditRow: {
        flexDirection: 'row',
        gap: vh * 1
    },
    dependentBoxStyle: {
        padding: vw * 3.5,
    },
})

export default styles;