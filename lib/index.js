/* eslint-disable eqeqeq */
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, } from 'react-native';
import * as Animated from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import colors from './colors';
function SearchSelect({ 
// configuration
multipleSelect, onSelectOption, options, setOptions, setIsShowingList, setHasSelectedOptions, 
// styling
searchContainerStyle = {}, itemListContainerStyle = {}, inputStyle = {}, placeholder, placeholderTextColor, searchTextColor, 
// animation
animationList, animationInput, 
// icon
IconSource, searchIcon, searchIconColor, searchIconSize, closeIcon, closeIconColor, closeIconSize, optionSelectedIcon, optionSelectedIconColor, optionSelectedIconSize, }) {
    const [searchText, setSearchText] = React.useState('');
    const [auxOptions, setAuxOptions] = React.useState(options);
    const [dataList, setDataList] = React.useState(false);
    const [canAnimate, setCanAnimate] = React.useState(true);
    React.useEffect(() => {
        let errors = '';
        if (multipleSelect === false && onSelectOption === undefined || null) {
            errors += '-> If multipleSelect is true, then you have to send the onSelectOption function. Otherwise nothing will happen when you select a option.\n';
        }
        if (errors !== '') {
            console.log('-- PROP ERRORS at RN-Search-Select -- \n' + errors); // try to make this error shows properly, then add all other errors
        }
    }, []);
    React.useEffect(() => {
        if (!dataList) {
            return;
        }
        let has = false;
        dataList.forEach(creator => {
            if (creator.selected) {
                has = true;
            }
        });
        if (setHasSelectedOptions) {
            setHasSelectedOptions(has);
        }
    }, [dataList]);
    const handleSearch = (e) => {
        setSearchText(e);
        e = e.toLowerCase();
        if (!e) {
            setDataList(false);
            setCanAnimate(true);
            if (setIsShowingList) {
                setIsShowingList(false);
            }
        }
        else {
            const result = auxOptions.filter(op => op.label.toLowerCase().includes(e));
            if ((result === null || result === void 0 ? void 0 : result.length) > 0) {
                handleHasResult(result);
            }
        }
    };
    const handleHasResult = (result) => {
        setDataList(result);
        if (setIsShowingList) {
            setIsShowingList(true);
        }
    };
    const handleClose = () => {
        setDataList(false);
        setCanAnimate(true);
        if (setIsShowingList) {
            setIsShowingList(false);
        }
    };
    const handleSetSelectedsItem = (index) => {
        // action to onSelectItem when MultipleSelect is false
        // then add a renderItem optional prop to when the item is selected and when it's not
        if (!dataList) {
            return;
        }
        let auxData = [];
        dataList.forEach(d => {
            if (d.key == index) {
                auxData.push(Object.assign(Object.assign({}, d), { selected: !d.selected }));
            }
            else {
                auxData.push(d);
            }
        });
        if (setOptions) {
            setOptions(auxData);
            setAuxOptions(auxData);
        }
        setDataList(auxData);
    };
    const RenderItem = (item, index) => (<TouchableOpacity style={Object.assign(Object.assign({}, s.itemContainer), itemListContainerStyle)} onPress={() => handleSetSelectedsItem(index)}>
      <View style={Object.assign(Object.assign({}, s.itemContainer), itemListContainerStyle)}>
        <Text style={s.itemText}>{item.label}</Text>
        {!!item.selected && (<View style={{ flex: 1, alignItems: 'flex-end' }}>
            {!!optionSelectedIcon && <IconSource name={optionSelectedIcon} color={optionSelectedIconColor ? optionSelectedIconColor : 'black'} size={optionSelectedIconSize ? optionSelectedIconSize : wp('6%')}/>}
          </View>)}
      </View>
    </TouchableOpacity>);
    const ListComponent = () => (<Animated.View animation={animationList && canAnimate ? animationList : ''} onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList keyboardShouldPersistTaps="always" data={dataList} extraData={dataList} renderItem={({ item, index }) => RenderItem(item, index)} keyExtractor={(item) => item.key}/>
    </Animated.View>);
    return (<Animated.View animation={animationInput && canAnimate ? animationInput : ''} style={Object.assign({ flex: 1, flexDirection: 'column' }, searchContainerStyle)}>
      <View style={Object.assign(Object.assign({}, s.inputContainer), searchContainerStyle)}>
        <View style={{ paddingTop: wp('2%') }}>
          {dataList && !!closeIcon ? (<TouchableOpacity onPress={() => {
                if (dataList) {
                    handleClose();
                }
            }}>
              <IconSource name={closeIcon} color={closeIconColor ? closeIconColor : 'black'} size={closeIconSize ? closeIconSize : wp('6%')}/>
            </TouchableOpacity>) : !!searchIcon && (<IconSource name={searchIcon} color={searchIconColor ? searchIconColor : 'black'} size={searchIconSize ? searchIconSize : wp('6%')}/>)}
        </View>
        <TextInput onChangeText={(text) => handleSearch(text)} style={Object.assign(Object.assign(Object.assign({}, s.inputStyle), inputStyle), { color: searchTextColor ? searchTextColor : 'black' })} value={searchText} placeholder={placeholder ? placeholder : ''} placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'black'} underlineColorAndroid={'transparent'}/>
      </View>
      {!!dataList && <ListComponent />}
    </Animated.View>);
}
const s = StyleSheet.create({
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
        backgroundColor: colors.white,
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
        backgroundColor: colors.white,
        paddingHorizontal: wp('1%'),
        height: hp('4.5%'),
        borderRadius: wp('1%'),
        margin: wp('1%'),
    },
    itemText: {
        fontSize: wp('4%'),
        alignItems: 'center',
    },
});
export default SearchSelect;
