import {Platform} from 'react-native';

export const fonts = {
  DMSans: {
    bold: Platform.select({
      android: 'DMSans_18pt-Bold',
      ios: 'DMSans_18pt-Bold',
    }),
    regular: Platform.select({
      android: 'DMSans_18pt-Regular',
      ios: 'DMSans_18pt-Regular',
    }),
    medium: Platform.select({
      android: 'DMSans_18pt-Medium',
      ios: 'DMSans_18pt-Medium',
    }),
    semibold: Platform.select({
      android: 'DMSans_18pt-SemiBold',
      ios: 'DMSans_18pt-SemiBold',
    }),
  },
  NotoNastaliqUrdu: {
    bold: Platform.select({
      android: 'NotoNastaliqUrdu-Bold',
      ios: 'NotoNastaliqUrdu-Bold',
    }),
    regular: Platform.select({
      android: 'NotoNastaliqUrdu-Regular',
      ios: 'NotoNastaliqUrdu-Regular',
    }),
    medium: Platform.select({
      android: 'NotoNastaliqUrdu-Medium',
      ios: 'NotoNastaliqUrdu-Medium',
    }),
    semibold: Platform.select({
      android: 'NotoNastaliqUrdu-SemidBold',
      ios: 'NotoNastaliqUrdu-SemidBold',
    }),
  },
};
