/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react';
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
  // array of options
  options: Options[]; 
  setOptions?: Function;

  // sets boolean values
  setIsShowingList?: Function; // if the list is showing or not 
  setHasSelectedData?: Function; // if there is any data selected

  // styling
  listContainerStyle?: ViewStyle;
  itemListContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;

  // texts
  placeholder?: string;
  placeholderTextColor?: string;
  searchTextColor?: string;

  // animations
  animationList?: string; // list of strings of react-native-animatable animations
  animationInput?: string;

  // icons
  SearchIcon: any;
  CloseIcon: any;
  CheckboxIcon: any;
}

function SearchSelect({
  options,
  setIsShowingList,
  setOptions,
  animationList,
  setHasSelectedData,
  animationInput,
  placeholder,
  SearchIcon,
  CloseIcon,
  CheckboxIcon,
  searchTextColor,
  placeholderTextColor,
  itemListContainerStyle = {},
  listContainerStyle = {},
  containerStyle = {},
  inputStyle = {},
}: SearchSelectProps) {
  const [searchText, setSearchText] = useState('');
  const [auxOptions, setAuxOptions] = useState<Options[]>(options);
  const [dataList, setDataList] = useState<Options[] | false>(false);
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    if (!dataList) {
      return;
    }

    let has = false;
    dataList.forEach(creator => {
      if (creator.selected) {
        has = true;
      }
    });
    if (setHasSelectedData) {
      setHasSelectedData(has);
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
            <CheckboxIcon/>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const ListComponent = () => (
    <Animated.View
      animation={animationList && canAnimate ? animationList : ''}
      style={{flex: 1, justifyContent: 'center'}}
      onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={dataList as any}
        extraData={dataList}
        renderItem={({item, index}: any) => RenderItem(item, index)}
        keyExtractor={item => item.key}
      />
    </Animated.View>
  );

  return (
    <Animated.View
      animation={animationInput && canAnimate ? animationInput : ''}
      style={{flex: 1, flexDirection: 'column', ...listContainerStyle}}>
      <View style={{...s.inputContainer, ...containerStyle}}>
        <View style={{paddingTop: wp('2%')}}>
          {dataList ? (
            <TouchableOpacity
              onPress={() => {
                if (dataList) {
                  handleClose();
                }
              }}>
              <CloseIcon/>
            </TouchableOpacity>
          ) : (
            <SearchIcon/>
          )}
        </View>
        <TextInput
          onChangeText={text => handleSearch(text)}
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
    flex: 1,
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
