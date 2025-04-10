import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';

const PanelHospitalListView = () => {
  return (
    <View>
      <TopView title="Panel Hospital List" icon={icons.search} />

      <CurvedView>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerHeader}>

            <View style={styles.infoContainerHeaderRight}>
              <View style={styles.infoContainerHeaderRightList}>
                <View>
                  <Image source={icons.listIcon} />
                </View>

                <AileronBold
                  style={styles.infoContainerHeaderText}
                  name="List"
                  numberOfLines={1}
                />
              </View>

              <View style={styles.infoContainerHeaderRightMap}>
                <View>
                  <Image source={icons.map} />
                </View>
                <AileronBold
                  style={styles.infoContainerHeaderActriveText}
                  name="Map"
                  numberOfLines={1}
                />
              </View>
            </View>

            <View style={styles.infoContainerHeaderTabs}>
              <TouchableOpacity>
                <Image source={icons.hospital} />
                <AileronBold name=''/>
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={icons.labs} />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </CurvedView>
    </View>
  );
};

export default PanelHospitalListView;
