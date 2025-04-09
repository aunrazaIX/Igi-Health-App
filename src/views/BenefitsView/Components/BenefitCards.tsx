import { View, Image, FlatList } from 'react-native';
import React from 'react';
import styles from '../styles';
import { images } from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import { AileronBold, AileronSemiBold } from '../../../components';

const CoverageAndBenefits = [
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },
  {
    title: 'Per insured per disability',
    price: 'Rs. 550,000/-',
  },

];



const BenefitCards = () => {

  const RenderBenefits = ({ item }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#0B4A98', '#48C3FF']}
        style={styles.CardBox}
      >
        <Image source={images.Insured} />
      </LinearGradient>

      <AileronSemiBold
        name={item.title}
        style={styles.insuredTitle}
      />
      <AileronBold
        name={item.price}
        style={styles.insuredPrice}
      />
    </View>
  )

  return (
    <View>
      {/* {CoverageAndBenefits.map((item, index) => (
        <View style={styles.card} key={index}>
          <LinearGradient
            colors={['#0B4A98', '#48C3FF']}
            style={styles.CardBox}
          >
            <Image source={images.Insured} />
          </LinearGradient>

          <AileronSemiBold
            name={item.title}
            style={styles.insuredTitle}
          />
          <AileronBold
            name={item.price}
            style={styles.insuredPrice}
          />
        </View>
      ))} */}
     
    </View>
  );
};

export default BenefitCards;
