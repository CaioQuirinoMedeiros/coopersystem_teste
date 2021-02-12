import {Platform} from 'react-native';

export const typography = {
  regular: Platform.select({ios: 'Rubik', android: 'Rubik'}),
  light: Platform.select({ios: 'Rubik-Light', android: 'Rubik-Light'}),
  italic: Platform.select({ios: 'Rubik-Italic', android: 'Rubik-Italic'}),
  medium: Platform.select({ios: 'Rubik-Medium', android: 'Rubik-Medium'}),
};
