import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
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
import {personalDetail} from '../../types/personalTypes';
import ConfimationModal from '../../components/Modal/confimationModal';
import {ScrollView} from 'react-native-gesture-handler';
import {vh} from '../../assets/theme/dimension';
import AddModal from '../../components/Modal/AddModal';
import ModalLoading from '../../components/ModalLoading';

type Props = {
  data: dependentDetail[];
  deleteDepenedentLoading: any;
  relationshipOptions: personalDetail[];
  goBack: () => void;
  handleSubmit?: () => void;
  manageUpdate?: () => void;
  setModalVisible: (val: boolean) => void;
  modalVisible: boolean;
  deleteDepenedent: () => void;
  confimationModalVisible: boolean;
  setConfimationModalVisible: (val: boolean) => void;
  toggleExpand: (index: number) => void;
  expandedIndex: number | null;
  openAddDependent: () => void;
  setConfirmationModal: () => void;
  confirmationModal: boolean;
  resetStates: () => void;
  dependantLoading: boolean;
  modalType: any;
  onPressDelete: any;
};
type dependentDetail = {
  dependent: string;
  image: ImageSourcePropType;
  dependentDetail: Item[];
};

type Item = {
  label: string;
  value: string;
};

const PersonalView: React.FC<Props> = ({
  data,
  goBack,
  manageUpdate,
  deleteDepenedent,
  confimationModalVisible,
  setConfimationModalVisible,
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
        onPressBack={goBack}
        title={'Personal'}
        TopViewFirstIcon={images.AddNew}
        FirstOpenModal={openAddDependent}
      />
      <CurvedView>
        <ScrollView>
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
              <AileronBold
                name={'Family Members!'}
                style={styles.detailsText}
              />
            </View>

            {data?.map((dependent, index) => (
              <>
                {console.log('depende', dependent)}
                <DependentBox
                  key={index}
                  containerStyle={styles.dependentBoxStyle}>
                  <TouchableOpacity onPress={() => toggleExpand(index)}>
                    <View style={styles.header}>
                      <Image source={dependent?.image} style={styles.avatar} />
                      <AileronBold
                        style={styles.headerText}
                        name={dependent.dependentDetail[0].value}
                      />

                      <View style={styles.iconsROw}>
                        {expandedIndex === index && (
                          <View style={styles.deleteEditRow}>
                            <TouchableOpacity
                              onPress={() => manageUpdate(dependent, index)}>
                              <Image
                                source={icons.edit}
                                style={styles.editIcon}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                deleteDepenedent(dependent, index)
                              }>
                              <Image
                                source={icons.delete}
                                style={styles.deleteIcon}
                              />
                            </TouchableOpacity>
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

                    {expandedIndex === index && (
                      <View style={styles.details}>
                        {dependent?.dependentDetail?.map((item, index) => (
                          <>
                            {console.log(item, 'pppp')}

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
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                </DependentBox>
              </>
            ))}
          </View>
        </ScrollView>

        <ModalLoading loading={deleteDepenedentLoading || dependantLoading} />
      </CurvedView>

      {/* <AddModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        gender={gender}
        relation={relationshipOptions}
        onPressSubmit={handleSubmit}
      /> */}

      <ConfirmationModal
        ConfirmationModalVisible={confirmationModal}
        setConfirmationModalVisible={setConfirmationModal}
        frameImage={icons.ModalSuccessfull}
        confirmationMessage={
          modalType === 'delete'
            ? 'are you sure you want to applied for request deletion'
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
