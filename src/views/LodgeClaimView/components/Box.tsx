import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { vh } from '../../../assets/theme/dimension'
import { COLORS } from '../../../assets/theme/colors'
import { AileronBold, AileronSemiBold } from '../../../components'

type InfoItem = {
    label: string;
    value: string;
  };

  type BoxProps={
    data:{
        icon: ImageSourcePropType;
        sectionTitle: string;
        info: InfoItem[];
    }
  }

const Box:React.FC<BoxProps> = ({data}) => {
  return (
    <View style={styles.boxContainer}>
          <View style={styles.header}>
            <Image source={data?.icon} style={styles.avatar} />
            <AileronBold style={styles.headerText} name={data?.sectionTitle} />
          </View>
          <View style={styles.details}>
            {data?.info?.map((_item: InfoItem, index: number) => (
              <View style={styles.field} key={index}>
                <AileronSemiBold
                  name={_item?.label}
                  style={styles.detailLabel}
                />
                <AileronSemiBold
                  name={_item?.value}
                  style={styles.detailvalue}
                />
              </View>
            ))}
          </View>
        </View>
  )
}

export default Box

const styles = StyleSheet.create({
    boxContainer: {
        padding: vh,
        width: '100%',
        borderColor: COLORS.black + 44,
        borderWidth: 1,
        borderRadius: vh * 2,
      },
      avatar: {
        width: vh * 4.5,
        height: vh * 4.5,
        marginRight: 10,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerText: {
        flex: 1,
        textAlign: 'left',
        fontSize: vh * 1.8,
        color: COLORS.insuredPrice,
      },
      details: {
        marginTop: 10,
        borderTopWidth: 2,
        borderTopColor: COLORS.dependentBorder,
        borderStyle: 'dashed',
        paddingTop: vh * 1,
        rowGap: vh,
      },
      detailLabel: {
        fontSize: vh * 1.6,
        color: COLORS.personalLabel,
      },
      detailvalue: {
        fontSize: vh * 1.6,
        color: COLORS.personalValue,
      },
      field: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
})