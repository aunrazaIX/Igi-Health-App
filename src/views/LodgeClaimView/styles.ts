import { StyleSheet } from "react-native";
import { vh } from "../../assets/theme/dimension";
import { COLORS } from "../../assets/theme/colors";

const styles=StyleSheet.create({
    priorGradient: {
        marginTop: vh * 1,
        borderRadius: vh * 1.5,
        padding: vh * 2,
      },
       priorNext: {
          textAlign: 'center',
          color: COLORS.white,
          fontSize: vh * 2,
        },
})

export default styles;