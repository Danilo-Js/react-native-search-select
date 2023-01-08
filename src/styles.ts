import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './colors';

export const s = StyleSheet.create({
  optionsOnTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp('2.5%'), 
    marginTop: 0, 
    marginLeft: 0, 
    padding: wp('2.5%'),
    borderWidth: 1, 
    borderRadius: wp('1%'),
    borderColor: colors.background,
    backgroundColor: colors.background,
  },
  optionsOnTopText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: wp('2%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp('90%'),
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    alignItems: 'flex-start',
    marginHorizontal: wp('2%'),
    paddingHorizontal: wp('2%'),
    fontSize: hp('2.6%'),
    width: wp('90%'),
    height: hp('6%'),
    borderRadius: wp('1%'),
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: wp('1%'),
    height: hp('4.5%'),
    borderRadius: wp('1%'),
    margin: wp('1%'),
    marginTop: wp('1.5%'),
  },
  itemText: {
    fontSize: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1%'),
  },
  counterText: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
    color: colors.errorRed,
  },
});