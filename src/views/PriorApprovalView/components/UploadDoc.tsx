import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AileronSemiBold, Button} from '../../../components';
import {vh} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import {icons, images} from '../../../assets';

const UploadDoc = () => {
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
  const [remarks, setRemarks] = useState('');
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      // mediaType: 'application/*',
      // includeBase64: false,
      quality: 1,
      selectionLimit: 0,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        console.log('response', response);
        setSelectedImages(response.assets);
      }
    });
  };
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
          <TouchableOpacity onPress={pickImage}>
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
        {selectedImages?.map((item, index) => {
          return (
            <View style={styles.documentBox} key={index}>
              <View style={styles.documentBoxInside}>
                <View style={styles.documentNameRow}>
                  <Image source={icons.document} style={styles.documentIcon} />
                  <View>
                    <AileronSemiBold
                      name={item.fileName || ''}
                      style={styles.documentText}
                    />
                    <AileronSemiBold
                      name={`${item.fileSize} KB`}
                      style={styles.documentSize}
                    />
                  </View>
                </View>
                <View>
                  <Image source={icons.tick} style={styles.tick} />
                </View>
              </View>

              <View style={styles.downloadContainer}>
                <View style={styles.downloadBackside}>
                  <View style={styles.downloadUpSide}></View>
                </View>
                <View style={styles.downloadPercentage}>
                  <AileronSemiBold
                    name={'100%'}
                    style={styles.PercentageNumber}
                  />
                </View>
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
              value={remarks}
              onChangeText={setRemarks}
              style={styles.remarksInput}
              numberOfLines={4}
              placeholder="Attached is the medical invoice with a breakdown of treatment expenses, including consultation and medications. Please let me know if additional documentation is needed."
            />
          </View>
        </View>
        <Button
          name="Submit Approval"
          onPress={() => setConfirmationModalVisible(true)}
          containerStyle={styles.submitButton}
          inputStyle={styles.submitText}
        />
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
    gap: vh * 1.5,
  },
  documentText: {
    textAlign: 'left',
    color: COLORS.maxFile,
    fontSize: vh * 1.7,
    lineHeight: vh * 3,
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
    gap: vh * 2,
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
  addRemarks:{
    marginVertical: vh * 3
  },
  remarksInput:{
    color: COLORS.placeholderColor,
    fontSize: vh * 1.5,
  },
  confimationContainer:{
    height: '52%'
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
    justifyContent: 'space-between',
    minHeight: '100%'
  },
});
