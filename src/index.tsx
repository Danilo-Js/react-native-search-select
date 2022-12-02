/* eslint-disable eqeqeq */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import * as Animated from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from './colors';

interface Options {
  key: string;
  label: string;
  selected: boolean;
}

interface SearchSelectProps {
  // configuration
  multipleSelect: boolean;
  onSelectOption?: Function;
  options: Options[]; 
  setOptions?: Function;
  setIsShowingList?: Function;  
  setHasSelectedOptions?: Function;

  // styling
  searchContainerStyle?: ViewStyle;
  itemListContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  searchTextColor?: string;

  // animation
  animationList?: string;
  animationInput?: string;

  // icon
  IconSource: any;
  searchIcon?: string; // create edge case in case not send a name icon
  searchIconColor?: string;
  searchIconSize?: number;
  closeIcon: string; // create edge case in case not send a name icon
  closeIconColor?: string;
  closeIconSize?: number;
  optionSelectedIcon: string; // create edge case in case not send a name icon
  optionSelectedIconColor?: string;
  optionSelectedIconSize?: number;
}

function SearchSelect({
  // configuration
  multipleSelect,
  onSelectOption,
  options,
  setOptions,
  setIsShowingList,
  setHasSelectedOptions,

  // styling
  searchContainerStyle = {},
  itemListContainerStyle = {},
  inputStyle = {},
  placeholder,
  placeholderTextColor,
  searchTextColor,

  // animation
  animationList,
  animationInput,

  // icon
  IconSource,
  searchIcon,
  searchIconColor,
  searchIconSize,
  closeIcon,
  closeIconColor,
  closeIconSize,
  optionSelectedIcon,
  optionSelectedIconColor,
  optionSelectedIconSize,
}: SearchSelectProps) {
  const [searchText, setSearchText] = React.useState('');
  const [auxOptions, setAuxOptions] = React.useState<Options[]>(options);
  const [dataList, setDataList] = React.useState<Options[] | false>(false);
  const [canAnimate, setCanAnimate] = React.useState(true);

  React.useEffect(() => {
    let errors: String = '';
    if (multipleSelect === false && onSelectOption === undefined || null) {
      errors += '-> If multipleSelect is true, then you have to send the onSelectOption function. Otherwise nothing will happen when you select a option.\n'
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

  const handleSearch = (e: string) => {
    setSearchText(e);
    e = e.toLowerCase();
    if (!e) {
      setDataList(false);
      setCanAnimate(true);
      if (setIsShowingList) {
        setIsShowingList(false);
      }
    } else {
      const result = auxOptions.filter(op =>
        op.label.toLowerCase().includes(e),
      );
      if (result?.length > 0) {
        handleHasResult(result);
      }
    }
  };

  const handleHasResult = (result: Options[]) => {
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

  const handleSetSelectedsItem = (index: string) => {
    // action to onSelectItem when MultipleSelect is false
    // then add a renderItem optional prop to when the item is selected and when it's not

    if (!dataList) {
      return;
    }

    let auxData: Options[] = [];
    dataList.forEach(d => {
      if (d.key == index) {
        auxData.push({
          ...d,
          selected: !d.selected,
        });
      } else {
        auxData.push(d);
      }
    });

    if (setOptions) {
      setOptions(auxData);
      setAuxOptions(auxData);
    }
    setDataList(auxData);
  };

  const RenderItem = (item: Options, index: any) => (
    <TouchableOpacity
      style={{...s.itemContainer, ...itemListContainerStyle}}
      onPress={() => handleSetSelectedsItem(index)}>
      <View style={{...s.itemContainer, ...itemListContainerStyle}}>
        <Text style={s.itemText}>{item.label}</Text>
        {!!item.selected && (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {!!optionSelectedIcon && <IconSource
              name={optionSelectedIcon}
              color={optionSelectedIconColor ? optionSelectedIconColor : 'black'}
              size={optionSelectedIconSize ? optionSelectedIconSize : wp('6%')}
            />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const ListComponent = () => (
    <Animated.View
      animation={animationList && canAnimate ? animationList : ''}
      onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={dataList as any}
        extraData={dataList}
        renderItem={({item, index}: any) => RenderItem(item, index)}
        keyExtractor={(item: any) => item.key}
      />
    </Animated.View>
  );

  return (
    <Animated.View
      animation={animationInput && canAnimate ? animationInput : ''}
      style={{flex: 1, flexDirection: 'column', ...searchContainerStyle}}>
      <View style={{...s.inputContainer, ...searchContainerStyle}}>
        <View style={{paddingTop: wp('2%')}}>
          {dataList && !!closeIcon ? (
            <TouchableOpacity
              onPress={() => {
                if (dataList) {
                  handleClose();
                }
              }}>
              <IconSource
                name={closeIcon}
                color={closeIconColor ? closeIconColor : 'black'}
                size={closeIconSize ? closeIconSize : wp('6%')}
              />
            </TouchableOpacity>
          ) : !!searchIcon && (
            <IconSource
              name={searchIcon}
              color={searchIconColor ? searchIconColor : 'black'}
              size={searchIconSize ? searchIconSize : wp('6%')}
            />
          )}
        </View>
        <TextInput
          onChangeText={(text: string) => handleSearch(text)}
          style={{
            ...s.inputStyle,
            ...inputStyle,
            color: searchTextColor ? searchTextColor : 'black',
          }}
          value={searchText}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : 'black'
          }
          underlineColorAndroid={'transparent'}
        />
      </View>
      {!!dataList && <ListComponent />}
    </Animated.View>
  );
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
