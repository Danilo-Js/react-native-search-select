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
  TextStyle,
} from 'react-native';

import * as Animated from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { s } from './styles';
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
  showSelectedOptionsOnTop?: Boolean;
  setIsShowingList?: Function;  
  setHasSelectedOptions?: Function;
  showSelectedOptionsCounter?: Boolean;

  // styling
  searchContainerStyle?: ViewStyle;
  itemListContainerStyle?: ViewStyle;
  optionsOnTopContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  optionsOnTopTextStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  searchTextColor?: string;
  counterTextStyle?: TextStyle,
  counterContainerStyle?: ViewStyle,

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
  closeTopOptionIcon: string; // create edge case in case not send a name icon
  closeTopOptionIconColor?: string;
  closeTopOptionIconSize?: number;
}

function SearchSelect({
  // configuration
  multipleSelect,
  onSelectOption,
  options,
  setOptions,
  showSelectedOptionsOnTop,
  setIsShowingList,
  setHasSelectedOptions,
  showSelectedOptionsCounter,

  // styling
  searchContainerStyle = {},
  itemListContainerStyle = {},
  optionsOnTopContainerStyle = {},
  inputStyle = {},
  optionsOnTopTextStyle = {},
  placeholder,
  placeholderTextColor,
  searchTextColor,
  counterTextStyle = {},
  counterContainerStyle = {},

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
  closeTopOptionIcon,
  closeTopOptionIconColor,
  closeTopOptionIconSize,
}: SearchSelectProps) {
  const [searchText, setSearchText] = React.useState('');
  const [auxOptions, setAuxOptions] = React.useState<Options[]>(options);
  const [dataList, setDataList] = React.useState<Options[] | false>(false);
  const [canAnimate, setCanAnimate] = React.useState(true);

  const OptionsOnTop = () => {
    const selectedOptions = options.filter(option => option.selected === true); 
    return (
      <View>
        <FlatList
          data={selectedOptions}
          horizontal={true}
          keyExtractor={(item, i) => item.key + i}
          renderItem={({item}) => (
            <View style={{...s.optionsOnTopView, ...optionsOnTopContainerStyle}}>
              <Text style={{...s.optionsOnTopText, ...optionsOnTopTextStyle}}>
                {item.label}{' '}
              </Text>

              <TouchableOpacity onPress={() => handleSetSelectedsItem(options.findIndex(option => option.key === item.key) as any)}>
                <IconSource
                  name={closeTopOptionIcon}
                  color={closeTopOptionIconColor ? closeTopOptionIconColor : colors.errorRed}
                  size={closeTopOptionIconSize ? closeTopOptionIconSize : wp('6%')}
                />
              </TouchableOpacity>
            </View>
          )} 
        />
      </View>
    )
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

    if (onSelectOption) {
      const selectedOption = dataList.find(value => value.key == index);
      onSelectOption(index, selectedOption)
    }

    if (!multipleSelect) {
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
      style={[s.itemContainer, itemListContainerStyle, index === 0 && {marginTop: wp('2%')}]}
      onPress={() => handleSetSelectedsItem(index)}>
      <View style={[s.itemContainer, itemListContainerStyle, index === 0 && {marginTop: wp('2%')}]}>
        <Text style={s.itemText}>{item.label}</Text>
        {!!item.selected && (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {!!optionSelectedIcon && <IconSource
              name={optionSelectedIcon}
              color={optionSelectedIconColor ? optionSelectedIconColor : colors.blue}
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

  const SelectedOptionsCounter = () => (
    <View style={[s.counterStyle, counterContainerStyle]}>
      <Text style={[s.counterText, counterTextStyle]}>
        {options.filter(option => option.selected === true).length}
      </Text>
    </View>
  );

  return (
    <Animated.View
      animation={animationInput && canAnimate ? animationInput : ''}
      style={{flex: 1, flexDirection: 'column', ...searchContainerStyle}}>
      <View>
        {!!showSelectedOptionsOnTop && options.some(option => option.selected === true) && <OptionsOnTop />}
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
                  color={closeIconColor ? closeIconColor : colors.blue}
                  size={closeIconSize ? closeIconSize : wp('6%')}
                />
              </TouchableOpacity>
            ) : !!searchIcon && (
              <IconSource
                name={searchIcon}
                color={searchIconColor ? searchIconColor : colors.grey}
                size={searchIconSize ? searchIconSize : wp('6%')}
              />
            )}
          </View>
          <TextInput
            onChangeText={(text: string) => handleSearch(text)}
            style={{
              ...s.inputStyle,
              ...inputStyle,
              color: searchTextColor ? searchTextColor : colors.text,
            }}
            value={searchText}
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : colors.text
            }
            underlineColorAndroid={'transparent'}
          />
          {!!showSelectedOptionsCounter && options.some(option => option.selected === true) && SelectedOptionsCounter()}
        </View>
        {!!dataList && <ListComponent />}
        </View>
    </Animated.View>
  );
}

export default SearchSelect;
