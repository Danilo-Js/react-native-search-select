/* eslint-disable eqeqeq */
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, } from 'react-native';
import * as Animated from 'react-native-animatable';
import { widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { s } from './styles';
import colors from './colors';
function SearchSelect({ 
// configuration
multipleSelect, onSelectOption, options, setOptions, showSelectedOptionsOnTop, setIsShowingList, setHasSelectedOptions, showSelectedOptionsCounter, 
// styling
searchContainerStyle = {}, itemListContainerStyle = {}, optionsOnTopContainerStyle = {}, inputStyle = {}, optionsOnTopTextStyle = {}, placeholder, placeholderTextColor, searchTextColor, counterTextStyle = {}, counterContainerStyle = {}, 
// animation
animationList, animationInput, 
// icon
IconSource, searchIcon, searchIconColor, searchIconSize, closeIcon, closeIconColor, closeIconSize, optionSelectedIcon, optionSelectedIconColor, optionSelectedIconSize, closeTopOptionIcon, closeTopOptionIconColor, closeTopOptionIconSize, }) {
    const [searchText, setSearchText] = React.useState('');
    const [auxOptions, setAuxOptions] = React.useState(options);
    const [dataList, setDataList] = React.useState(false);
    const [canAnimate, setCanAnimate] = React.useState(true);
    const [hideOptionsOnTop, setHideOptionsOnTop] = React.useState(false);
    const OptionsOnTop = () => {
        const selectedOptions = options.filter(option => option.selected === true);
        return (<View>
        <FlatList data={selectedOptions} horizontal={true} keyExtractor={(item, i) => item.key + i} renderItem={({ item }) => (<View style={Object.assign(Object.assign({}, s.optionsOnTopView), optionsOnTopContainerStyle)}>
              <Text style={Object.assign(Object.assign({}, s.optionsOnTopText), optionsOnTopTextStyle)}>
                {item.label}{' '}
              </Text>

              <TouchableOpacity onPress={() => handleSetSelectedsItem(options.findIndex(option => option.key === item.key))}>
                <IconSource name={closeTopOptionIcon} color={closeTopOptionIconColor ? closeTopOptionIconColor : colors.errorRed} size={closeTopOptionIconSize ? closeTopOptionIconSize : wp('6%')}/>
              </TouchableOpacity>
            </View>)}/>
      </View>);
    };
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
        setHideOptionsOnTop(true);
        if (!e) {
            setDataList(false);
            setCanAnimate(false);
            if (setIsShowingList) {
                setIsShowingList(false);
            }
        }
        else {
            setHideOptionsOnTop(false);
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
        setCanAnimate(false);
        if (setIsShowingList) {
            setIsShowingList(false);
        }
        setHideOptionsOnTop(true);
    };
    const handleSetSelectedsItem = (index, item) => {
        if (!dataList) {
            return;
        }
        if (onSelectOption && item) {
            onSelectOption(index, item);
        }
        if (!multipleSelect) {
            return;
        }
        setHideOptionsOnTop(false);
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
    const RenderItem = (item, index) => (<TouchableOpacity style={[s.itemContainer, itemListContainerStyle, index === 0 && { marginTop: wp('2%') }]} onPress={() => handleSetSelectedsItem(index, item)}>
      <View style={[s.itemContainer, itemListContainerStyle, index === 0 && { marginTop: wp('2%') }]}>
        <Text style={[s.itemText, !!item.selected && { paddingLeft: ('3%') }]}>{item.label}</Text>
        {!!item.selected && (<View style={{ flex: 1, alignItems: 'flex-end', paddingRight: wp('3%') }}>
            {!!optionSelectedIcon && <IconSource name={optionSelectedIcon} color={optionSelectedIconColor ? optionSelectedIconColor : colors.blue} size={optionSelectedIconSize ? optionSelectedIconSize : wp('6%')}/>}
          </View>)}
      </View>
    </TouchableOpacity>);
    const ListComponent = () => (<Animated.View animation={animationList && canAnimate ? animationList : ''} onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList keyboardShouldPersistTaps="always" data={dataList} extraData={dataList} renderItem={({ item, index }) => RenderItem(item, index)} keyExtractor={(item) => item.key}/>
    </Animated.View>);
    const SelectedOptionsCounter = () => (<View style={[s.counterStyle, counterContainerStyle]}>
      <Text style={[s.counterText, counterTextStyle]}>
        {options.filter(option => option.selected === true).length}
      </Text>
    </View>);
    return (<Animated.View animation={animationInput && canAnimate ? animationInput : ''} style={Object.assign({ flex: 1, flexDirection: 'column' }, searchContainerStyle)}>
      <View>
        {!hideOptionsOnTop && !!showSelectedOptionsOnTop && options.some(option => option.selected === true) && <OptionsOnTop />}
        <View style={Object.assign(Object.assign({}, s.inputContainer), searchContainerStyle)}>
          <View style={{ paddingTop: wp('2%') }}>
            {dataList && !!closeIcon ? (<TouchableOpacity onPress={() => {
                if (dataList) {
                    handleClose();
                }
            }}>
                <IconSource name={closeIcon} color={closeIconColor ? closeIconColor : colors.blue} size={closeIconSize ? closeIconSize : wp('6%')}/>
              </TouchableOpacity>) : !!searchIcon && (<IconSource name={searchIcon} color={searchIconColor ? searchIconColor : colors.grey} size={searchIconSize ? searchIconSize : wp('6%')}/>)}
          </View>
          <TextInput onChangeText={(text) => handleSearch(text)} style={Object.assign(Object.assign(Object.assign({}, s.inputStyle), inputStyle), { color: searchTextColor ? searchTextColor : colors.text })} value={searchText} placeholder={placeholder ? placeholder : ''} placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.text} underlineColorAndroid={'transparent'}/>
          {!!showSelectedOptionsCounter && options.some(option => option.selected === true) && SelectedOptionsCounter()}
        </View>
        {!!dataList && <ListComponent />}
        </View>
    </Animated.View>);
}
export default SearchSelect;
