import {FlatList} from 'react-native';
import React, {Fragment} from 'react';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {CurvedView, InputField} from '../../components';
import DetailsContainer from '../../components/DetailsContainer';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';
import {styles} from './style';
import RemarksModal from '../../screens/ClaimsHistory/components/RemarksModal';
import NoDataView from '../../components/NoDataView';

const PriorApprovalHistoryView = ({
  data,
  onPressHeaderIcon,
  claimDataLoading,
  searchText,
  setSearchText,
  showRemarks,
  remarks,
  onCloseRemarksModal,
}) => {
  const renderItem = ({item, index}) => (
    <DetailsContainer
      key={index}
      // headerIcon={
      //   item?.ClaimStatus === 'Completed'
      //     ? icons.claimPaid
      //     : item?.ClaimStatus === 'Rejected'
      //     ? icons.rejected
      //     : icons.pending
      // }
      headerIconPressable={false}
      patientName={item.RelationName}
      data={item}
    />
  );
  return (
    <Fragment>
      <TopView
        title="Prior Approval History"
        SecondOpenModal={onPressHeaderIcon}
      />
      <CurvedView>
        <InputField
          placeholder="Search..."
          placeholderTextColor={COLORS.textGrayShade}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputField}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          rightIcon={icons.searchBlack}
        />
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

export default PriorApprovalHistoryView;
