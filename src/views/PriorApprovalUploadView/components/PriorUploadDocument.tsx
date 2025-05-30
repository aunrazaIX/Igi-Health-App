import {View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import {icons, images} from '../../../assets';
import {AileronSemiBold} from '../../../components';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

const PriorUploadDocument = () => {
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

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
        setSelectedImages(response.assets);
      }
    });
  };

  return (
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
          <AileronSemiBold name="Click to Upload" style={styles.ClickUpload} />
        </TouchableOpacity>
        <AileronSemiBold
          name="(Max. File size: 25 MB)"
          style={styles.maxFile}
        />
      </View>
      {selectedImages.map((item, index) => {
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
  );
};

export default PriorUploadDocument;
