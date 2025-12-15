import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {
  AileronRegular,
  AileronSemiBold,
  CurvedView,
  InputField,
} from '../../components';
import DetailsContainer from '../../components/DetailsContainer';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';
import {styles} from './style';
import RemarksModal from '../../screens/ClaimsHistory/components/RemarksModal';
import NoDataView from '../../components/NoDataView';
import {vh, vw} from '../../assets/theme/dimension';
import LinearGradient from 'react-native-linear-gradient';

const ClaimsHistoryView = ({
  data,
  onPressHeaderIcon,
  claimDataLoading,
  type,
  onPressType,
  showRemarks,
  remarks,
  onCloseRemarksModal,
  getHeadingSubHeading,
  searchText,
  setSearchText,
  tabs,
  selectedStatus,
  statusIconMap,
  onSelectTab,
}) => {
  const renderItem = ({item, index}) => {
    return (
      <DetailsContainer
        key={index}
        headerIcon={statusIconMap[item?.claimStatus] ?? ''}
        headerIconPressable={false}
        patientName={item.RelationName}
        data={item}
      />
    );
  };

  return (
    <Fragment>
      <TopView title="Claims History" SecondOpenModal={onPressHeaderIcon} />
      <CurvedView>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => onPressType('In-Process')}
            style={[
              styles.tabView,
              type == 'In-Process' && {backgroundColor: COLORS.faqsSubHeading},
            ]}>
            <AileronSemiBold
              style={[
                styles.claimStatusText,
                type == 'In-Process' && {
                  color: COLORS.white,
                },
              ]}
              name="In-Process"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressType('Processed')}
            style={[
              styles.tabView,
              type == 'Processed' && {backgroundColor: COLORS.faqsSubHeading},
            ]}>
            <AileronSemiBold
              style={[
                styles.claimStatusText,
                type == 'Processed' && {
                  color: COLORS.white,
                },
              ]}
              name="Processed"
            />
          </TouchableOpacity>
        </View>

        {/* <AileronSemiBold
          style={styles.claimSubHeadingText}
          name={getHeadingSubHeading[type]?.heading}
        /> */}
        <AileronRegular
          style={[
            styles.claimSubHeadingText,
            {marginTop: vh * 0.5, fontSize: vw * 3},
          ]}
          name={getHeadingSubHeading[type]?.messsage}
        />
        <InputField
          placeholder="Search..."
          placeholderTextColor={COLORS.textGrayShade}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputField}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          rightIcon={icons.searchBlack}
        />
        {tabs?.map(status => (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.statusButton}
              key={status}
              onPress={() => onSelectTab(status)}>
              {selectedStatus === status ? (
                <LinearGradient
                  style={styles.gradientButton}
                  colors={COLORS.deleteButtonGradient}>
                  <AileronSemiBold style={styles.activeText} name={status} />
                </LinearGradient>
              ) : (
                <View style={styles.button}>
                  <AileronSemiBold style={styles.buttonText} name={status} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
        <FlatList
          ListFooterComponent={
            claimDataLoading && (
              <SimpleLoader color={COLORS.cardBackgroundRed} />
            )
          }
          ListEmptyComponent={
            !claimDataLoading && <NoDataView name={'No Data Found'} />
          }
          contentContainerStyle={styles.containerStyle}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />

        <RemarksModal
          onClose={onCloseRemarksModal}
          show={showRemarks}
          remarks={remarks}
        />
      </CurvedView>
    </Fragment>
  );
};

export default ClaimsHistoryView;
