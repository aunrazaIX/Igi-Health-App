import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AileronSemiBold, ConfirmationModal } from '../../../components';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';
import { icons, images } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { setRemarks } from '../../../redux/lodgeSlice';

type UploadDocProps = {
  onSelectDocument: () => void;
  handleCancelFile: () => void;
  claimData: any;
  setterForclaimData: any;
};

const UploadDoc: React.FC<UploadDocProps> = ({
  onSelectDocument,
  selectedDocuments,
  handleCancelFile,
  isUplaoded = false,
  claimData,
  setterForclaimData,
}) => {
  return (
    <View style={styles.uploadFileContainer}>
      <View>
        <View style={styles.uploadBox}>
          <View>
            <Image source={images.priorUpload} style={styles.uploadImage} />
          </View>

          <AileronSemiBold
            name={'Uploading Supporting\nDocuments'}
            style={styles.supporting}
          />
          <TouchableOpacity onPress={onSelectDocument}>
            <AileronSemiBold
              name="Click to Upload"
              style={styles.ClickUpload}
            />
          </TouchableOpacity>
          <AileronSemiBold
            name="(Max. File size: 25 MB)"
            style={styles.maxFile}
          />
        </View>

        {selectedDocuments?.length > 0 &&
          selectedDocuments?.map((item, index) => {
            console.log(item, 'oooooooo');
            return (
              <View style={styles.documentBox} key={index}>
                <View style={styles.documentBoxInside}>
                  <View style={styles.documentNameRow}>
                    <View style={styles.docDetails}>
                      <Image
                        source={icons.document}
                        style={styles.documentIcon}
                      />
                      <View>
                        <AileronSemiBold
                          name={item?.name || ''}
                          style={styles.documentText}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleCancelFile(item, index)}>
                      <Image
                        style={styles.errorIcon}
                        source={icons.errorPopup}
                      />
                    </TouchableOpacity>
                  </View>

                  <View>
                    {isUplaoded && (
                      <Image source={icons.tick} style={styles.tick} />
                    )}
                  </View>
                </View>

                <View>
                  <AileronSemiBold
                    name={`file size : ${item?.fileSizeInMB?.toFixed(3) || ''
                      } MB`}
                    style={styles.fileSizeText}
                  />
                </View>
              </View>
            );
          })}
      </View>

      <View>
        <View style={styles.addRemarks}>
          <AileronSemiBold name="Add Remarks" style={styles.remarks} />
          <View style={styles.remarksBox}>
            <TextInput
              multiline={true}
              value={claimData.claimComments}
              onChangeText={text => setterForclaimData('claimComments', text)}
              style={styles.remarksInput}
              numberOfLines={4}
              placeholder="add remarks"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UploadDoc;

const styles = StyleSheet.create({
  uploadBox: {
    borderColor: COLORS.UploadBorder,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: vh * 0.5,
    padding: vh * 2.5,
    alignItems: 'center',
    marginTop: vh * 2,
  },
  uploadImage: {
    width: vh * 7,
    height: vh * 7,
  },
  supporting: {
    marginVertical: vh * 2,
    fontSize: vh * 2.3,
    color: COLORS.insuredPrice,
  },
  ClickUpload: {
    color: COLORS.benefitTitle,
    fontSize: vh * 1.6,
    marginBottom: vh * 0.7,
  },
  maxFile: {
    fontSize: vh * 1.6,
    color: COLORS.maxFile,
    fontWeight: '400',
  },
  documentBox: {
    borderColor: COLORS.dependentBorder,
    borderWidth: 2,
    marginTop: vh * 2,
    borderRadius: vh * 0.7,
    padding: vh * 2,
  },
  documentBoxInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
  },
  documentText: {
    textAlign: 'left',
    color: COLORS.maxFile,
    fontSize: vh * 1.7,
    lineHeight: vh * 3,
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: vw * 55, // adjust as per your layout
  },
  fileSizeText: {
    // borderWidth: 2,
    // backgroundColor: 'red',
    fontSize: vh * 1.4,
    color: COLORS.cardBackgroundRed,
    // textAlign: 'left',
    marginTop: vh,
  },
  documentSize: {
    textAlign: 'left',
    color: COLORS.documentSize,
    marginBottom: vh * 1.5,
  },
  tick: {
    width: vh * 3.5,
    height: vh * 3.5,
  },
  downloadContainer: {
    flexDirection: 'row',
  },
  downloadBackside: {
    width: vh * 29,
    backgroundColor: 'rgba(230, 231, 235, 1)',
    height: vh * 1,
    borderRadius: vh * 1,
  },
  downloadPercentage: {
    width: vh * 5.1,
  },
  documentIcon: {
    width: vh * 3.5,
    height: vh * 3.5,
  },
  downloadUpSide: {
    flex: 1,
    width: '60%',
    borderRadius: vh * 1,
    backgroundColor: COLORS.downloadGreen,
  },
  PercentageNumber: {
    textAlign: 'left',
    fontSize: vh * 1.6,
    color: COLORS.maxFile,
  },
  remarks: {
    textAlign: 'left',
    fontSize: vh * 2,
    color: COLORS.black,
    marginBlock: vh * 1.5,
  },
  remarksBox: {
    borderColor: COLORS.dependentBorder,
    borderWidth: 2,
    padding: vh * 1,
    borderRadius: vh * 2,
  },
  addRemarks: {
    marginVertical: vh * 1,
  },
  remarksInput: {
    color: COLORS.placeholderColor,
    fontSize: vh * 1.5,
  },
  confimationContainer: {
    height: '52%',
  },
  submitButton: {
    borderRadius: vh * 1.5,
  },
  submitText: {
    fontSize: vh * 2.2,
    fontWeight: '600',
  },
  uploadFileContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    minHeight: '100%',
  },
  uploadButton: {
    marginVertical: vh * 2,
  },
  errorIcon: {
    height: vw * 8,
    width: vw * 8,
  },
  docDetails: {
    flexDirection: 'row',
    gap: vw * 1.2,
  },
});
