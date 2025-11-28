import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {styles} from '../style';
import {AileronSemiBold} from '../../../components';
const CardItem = React.memo(({item, onPress}) => {
  return (
    <View style={styles.cardsContainer}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={styles.dashboardContainerCards}
        activeOpacity={0.8}>
        <Image style={styles.cardLogo} source={item.logo} />
      </TouchableOpacity>

      <View style={styles.cardLabelWrap}>
        <AileronSemiBold
          style={styles.dashboardContainerCardText}
          name={item.name}
          numberOfLines={2}
        />
      </View>
    </View>
  );
});

export default CardItem;
