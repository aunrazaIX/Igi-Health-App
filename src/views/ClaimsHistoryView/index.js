import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {AileronSemiBold, CurvedView} from '../../components';
import DetailsContainer from '../../components/DetailsContainer';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';
import {styles} from './style';
import RemarksModal from '../../screens/ClaimsHistory/components/RemarksModal';

const ClaimsHistoryView = ({
  data,
  onPressHeaderIcon,
  claimDataLoading,
  type,
  onPressType,
  showRemarks,
  remarks,
  onCloseRemarksModal,
}) => {
  const renderItem = ({item, index}) => (
    <DetailsContainer
      key={index}
      headerIcon={
        item?.ClaimStatus == '8'
          ? icons.claimPaid
          : item?.ClaimStatus == '3'
          ? icons.rejected
          : icons.pending
      }
      patientName={item.RelationName}
      data={item}
    />
  );
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
        <FlatList
          contentContainerStyle={styles.containerStyle}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
        {claimDataLoading && <SimpleLoader color={COLORS.cardBackgroundRed} />}

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
