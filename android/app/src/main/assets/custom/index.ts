import {Platform} from 'react-native';

export const fonts = {
  Aileron: {
    bold: Platform.select({
      android: 'Aileron-Bold',
      ios: 'Aileron-Bold',
    }),
    regular: Platform.select({
      android: 'Aileron-Regular',
      ios: 'Aileron-Regular',
    }),
    light: Platform.select({
      android: 'Aileron-Light',
      ios: 'Aileron-Light',
    }),
    semibold: Platform.select({
      android: 'Aileron-SemiBold',
      ios: 'Aileron-SemiBold',
    }),
  },
};
