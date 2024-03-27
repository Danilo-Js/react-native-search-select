import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import colors from './colors';
export const s = StyleSheet.create({
    // pagination
    paginationWrapContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: wp('1.5%'),
    },
    paginationComponentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.mainOne,
        borderRadius: wp('10%'),
        width: wp('20%'),
        height: hp('4%'),
    },
    paginationComponentText: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
});
