import {View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  ConfirmationModal,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import {icons, images} from '../../assets';
import styles from './styles';
import DependentBox from '../../components/DependentBox';
import {ScrollView} from 'react-native-gesture-handler';
import {vh} from '../../assets/theme/dimension';
import ModalLoading from '../../components/ModalLoading';
import NoDataView from '../../components/NoDataView';
import {COLORS} from '../../assets/theme/colors';

const PersonalView = ({
  data,
  manageUpdate,
  deleteDepenedent,
  toggleExpand,
  expandedIndex,
  openAddDependent,
  setConfirmationModal,
  confirmationModal,
  resetStates,
  deleteDepenedentLoading,
  dependantLoading,
  modalType,
  onPressDelete,
}) => {
  return (
    <Container>
      <TopView
        title={'Family Details'}
        TopViewFirstIcon={images.AddNew}
        FirstOpenModal={openAddDependent}
      />
      <CurvedView>
        <View style={{paddingBottom: vh * 21}}>
          <ImageBackground
            source={images.SecureFuture}
            style={styles.personalImage}>
            <View style={styles.secureTextGrp}>
              <AileronSemiBold
                style={styles.secureText}
                name={'We\nSecure\nYour'}
              />
              <AileronSemiBold style={styles.futureText} name={'Future!'} />
            </View>
          </ImageBackground>
          <View style={styles.dependentBox}>
            <AileronBold name={'Covered '} style={styles.dependentText} />
            <AileronBold name={'Family Members!'} style={styles.detailsText} />
          </View>
          <ScrollView indicatorStyle={'black'}>
            <View style={{marginBottom: vh * 12}}>
              {data?.length > 0
                ? data?.map((dependent, index) => (
                    <>
                      <DependentBox
                        key={index}
                        containerStyle={styles.dependentBoxStyle}>
                        <TouchableOpacity onPress={() => toggleExpand(index)}>
                          <View style={styles.header}>
                            <Image
                              source={dependent?.image}
                              style={styles.avatar}
                            />
                            <AileronBold
                              style={styles.headerText}
                              name={dependent.dependentDetail[0].value}
                            />

                            <View style={styles.iconsROw}>
                              {expandedIndex.includes(index) && (
                                <View style={styles.deleteEditRow}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      manageUpdate(dependent, index)
                                    }>
                                    <Image
                                      source={icons.edit}
                                      style={styles.editIcon}
                                    />
                                  </TouchableOpacity>

                                  {dependent.dependentDetail.find(
                                    item =>
                                      item.label === 'Relationship :' &&
                                      item.value !== 'Main Member' &&
                                      item.value !== 'Member',
                                  ) && (
                                    <TouchableOpacity
                                      onPress={() =>
                                        deleteDepenedent(dependent, index)
                                      }>
                                      <Image
                                        source={icons.delete}
                                        style={styles.deleteIcon}
                                      />
                                    </TouchableOpacity>
                                  )}
                                </View>
                              )}
                              <Image
                                source={
                                  expandedIndex === index
                                    ? icons.selectArrowUp
                                    : icons.arrowDown
                                }
                                style={styles.icon}
                              />
                            </View>
                          </View>

                          {expandedIndex.includes(index) && (
                            <View style={styles.details}>
                              {dependent?.dependentDetail?.map(
                                (item, index) => (
                                  <>
                                    <View style={styles.detailRow} key={index}>
                                      {item.label !== 'Name :' && (
                                        <>
                                          <AileronSemiBold
                                            name={item?.label}
                                            style={styles.detailLabel}
                                          />

                                          <AileronSemiBold
                                            name={item?.value}
                                            style={styles.detailvalue}
                                          />
                                        </>
                                      )}
                                    </View>
                                  </>
                                ),
                              )}
                            </View>
                          )}
                        </TouchableOpacity>
                      </DependentBox>
                    </>
                  ))
                : !dependantLoading && <NoDataView name={'No Memeber Found'} />}
            </View>
          </ScrollView>
        </View>

        <ModalLoading loading={deleteDepenedentLoading || dependantLoading} />
      </CurvedView>

      <ConfirmationModal
        ConfirmationModalVisible={confirmationModal}
        setConfirmationModalVisible={setConfirmationModal}
        frameImage={
          modalType === 'delete'
            ? icons.ModalSuccessfull
            : icons.modelSuccessful
        }
        confirmationMessage={
          modalType === 'delete'
            ? 'Are you sure you want to apply for deletion request of selected dependent ?'
            : 'Your request of deletion has been successfully applied'
        }
        closeButton={modalType === 'delete' ? false : true}
        deleteButton={modalType === 'delete' ? true : false}
        handleDelete={() => {
          onPressDelete();
        }}
        Successfull={modalType === 'delete' ? false : true}
        CloseButtonText={'Continue To Login'}
        onClose={resetStates}
      />
    </Container>
  );
};

export default PersonalView;
