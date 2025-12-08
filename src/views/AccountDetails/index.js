import {View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import {icons, images} from '../../assets';
import styles from './styles';

import {vh} from '../../assets/theme/dimension';
import ModalLoading from '../../components/ModalLoading';
import NoDataView from '../../components/NoDataView';

const AccountDetailsView = ({data}) => {
  return (
    <Container>
      <TopView title={'Registered Bank Account'} />
      <CurvedView>
        <View style={{paddingBottom: vh * 21}}>
          <ImageBackground
            source={images.accountDetails}
            style={styles.personalImage}>
            <View style={styles.secureTextGrp}>
              <AileronSemiBold
                style={styles.secureText}
                name={'Registered\nBank\nAccount'}
              />
            </View>
          </ImageBackground>
          <AileronRegular
            style={styles.description}
            name="The bank account information shown below is the one currently registered in IGI Life's records and is being used for your claim reimbursements."
          />
          <View style={styles.boxContainer}>
            <View style={styles.header}>
              <Image source={icons.personalDetail} style={styles.avatar} />
              <AileronBold style={styles.headerText} name="Account Details" />
            </View>
            <View style={styles.details}>
              {data?.map((item, index) => (
                <View style={styles.field} key={index}>
                  <AileronSemiBold
                    name={item?.label}
                    style={styles.detailLabel}
                  />
                  <AileronSemiBold
                    name={item?.value}
                    style={styles.detailvalue}
                  />
                </View>
              ))}
            </View>
          </View>
          <AileronRegular
            name="Disclaimer: If these details are incorrect or need updating, please contact IGI Life customer support."
            style={styles.disclaimer}
          />
        </View>
        {/* <ModalLoading loading={loading} /> */}
      </CurvedView>
    </Container>
  );
};

export default AccountDetailsView;
