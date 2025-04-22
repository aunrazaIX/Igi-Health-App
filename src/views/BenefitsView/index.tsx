import React from 'react';
import { AileronBold, AileronSemiBold, Container, CurvedView, TopView } from '../../components';
import { images } from '../../assets';
import { FlatList, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { COLORS } from '../../assets/theme/colors';
import { ImageSourcePropType } from 'react-native';


type Props = {
    data: Item[];
}

type Item = {
    title: string;
    price: string;
    image: ImageSourcePropType;
}

const BenefitsView: React.FC<Props> = ({ data }) => {
    const RenderBenefits = ({ item }: { item: Item }) => (
        <View style={styles.card}>
            <LinearGradient
                colors={['#48C3FF', '#0B4A98']}
                start={{ x: -.6, y: 1 }}
                end={{ x: .5, y: .4 }}
                style={styles.CardBox}
            >
                <Image source={item.image} style={styles.coverageCardImage} />
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
        <Container>
            <TopView title={'Benefits'} />
            <CurvedView>
                <LinearGradient
                    colors={COLORS.benefitsCardGradient}
                    style={styles.BenefitsGradients}>
                    <View style={styles.Maximum}>
                        <View style={styles.MaximumLeftBox}>
                            <Image source={images.Logo} style={styles.benefitsLogo} />
                            <AileronBold
                                name={'Maximum\nHospitalization'}
                                style={styles.MaximumTitle}
                            />
                            <AileronBold name={'Benefits!'} style={styles.BenefitsTitle} />
                        </View>
                        <View style={styles.MaximumRightBox}>
                            <Image
                                style={styles.benefitsImage}
                                source={images.maximumBenefits}
                            />
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.coverage}>
                    <AileronBold name={'Coverage &'} style={styles.coverageTitle} />
                    <AileronBold name={' Benefits!'} style={styles.benefitTitle} />
                </View>

                <FlatList
                    data={data}
                    renderItem={RenderBenefits}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainer}
                />
            </CurvedView>
        </Container>
    );
};

export default BenefitsView;
