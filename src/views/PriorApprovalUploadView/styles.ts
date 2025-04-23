import {StyleSheet} from 'react-native';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

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
  documentIcon: {
    width: vh * 3.5,
    height: vh * 3.5,
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
  PercentageNumber: {
    textAlign: 'left',
    fontSize: vh * 1.6,
    color: COLORS.maxFile,
  },
  downloadUpSide: {
    flex: 1,
    width: '60%',
    borderRadius: vh * 1,
    backgroundColor: COLORS.downloadGreen,
  },
  uploadFileContainer: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: '100%'
  },
  submitButton: {
    borderRadius: vh * 1.5,
  },
  submitText: {
    fontSize: vh * 2.2,
    fontWeight: '600',
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
  }
});

export default styles;
