import React from 'react';
import {
    AileronBold,
    AileronSemiBold,
    Container,
    CurvedView,
    TopView,
} from '../../components';
import { images } from '../../assets';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import BenefitCards from './Components/BenefitCards';

const BenefitsView = () => {
    return (
        <Container>
            <TopView title={'Benefits'} />

            <CurvedView>
                <LinearGradient
                    colors={['#FFE9EC', '#ECF1FC']}
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
                            {/* <Image source={images.maximumBenefits} /> */}
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.coverage}>
                    <AileronBold name={'Coverage &'} style={styles.coverageTitle} />
                    <AileronBold name={' Benefits!'} style={styles.benefitTitle} />
                </View>

                <BenefitCards />
            </CurvedView>
        </Container>
    );
};

export default BenefitsView;
