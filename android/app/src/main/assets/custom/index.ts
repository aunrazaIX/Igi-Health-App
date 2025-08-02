import {Platform} from 'react-native';

export const fonts = {
  inter: {
    bold: Platform.select({
      android: 'Inter-Bold',
      ios: 'Inter-Bold',
    }),
    regular: Platform.select({
      android: 'Inter-Regular',
      ios: 'Inter-Regular',
    }),
    medium: Platform.select({
      android: 'Inter-Medium',
      ios: 'Inter-Medium',
    }),
    semibold: Platform.select({
      android: 'Inter-SemiBold',
      ios: 'Inter-SemiBold',
    }),
  },
};
