/* eslint-disable eqeqeq */
import * as React from 'react';
import {
  View,
  Text,
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
  isPaginated?: boolean; 
  pageSize?: number; 

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
  searchIcon?: string;
  searchIconColor?: string;
  searchIconSize?: number;
  closeIcon: string;
  closeIconColor?: string;
  closeIconSize?: number;
  optionSelectedIcon: string;
  optionSelectedIconColor?: string;
  optionSelectedIconSize?: number;
  closeTopOptionIcon: string;
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
  isPaginated,
  pageSize,

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
  // -- STATES --
  const [searchText, setSearchText] = React.useState(''); // state to handle the search text
  const [canAnimate, setCanAnimate] = React.useState(true); // state to handle if can animate
  const [hideOptionsOnTop, setHideOptionsOnTop] = React.useState(false); // state to hide the options on top
  // data
  const [auxOptions, _] = React.useState<Options[]>(options); // options but in a useState (backup of the options)
  const [dataList, _dataList] = React.useState<Options[]>([]); // options to show in the list
  // pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // -- FUNCTIONS --
  // set the list of options if it is different from the current list
  const setDataList = (newData: Options[]) => {
    if (JSON.stringify(dataList) !== JSON.stringify(newData)) {
      _dataList(newData);
    }
  };

  // returns the list filtered by a page
  const getDataByPage = (options: Options[], page: number): Options[] => {
    if (!pageSize) return [];
    setCurrentPage(page);
    const startIndex = (page - 1) * (pageSize); // calculate the start index
    const endIndex = startIndex + (pageSize); // calculate the end index
    const newItems = options.slice(startIndex, endIndex).slice(startIndex, endIndex).filter((newItem: Options) => dataList.length > 0 || !dataList.some((existingItem: Options) => existingItem.key === newItem.key))
    return newItems;
  }

  // returns the list filtered by the search text
  const getSearchResult = React.useCallback((e: string): Options[] => {
    return auxOptions.filter((op: Options) =>
        op.label.toLowerCase().includes(e),
    );
}, [auxOptions]);

  // function to handle search
  const handleSearch = React.useCallback((e: string) => {
    setSearchText(e);
    e = e.toLowerCase(); // set the search text to lower case
    setHideOptionsOnTop(true);
    // if search is empty, close the list
    if (!e) {
      setDataList([]); // close the list
      setCanAnimate(false); // set the animation to false
      if (setIsShowingList) { // set the state of showing the list to false, if the user send the function
        setIsShowingList(false);
      }
    } else {
      // if search is not empty, set the page to one and filter the list
      setHideOptionsOnTop(false); // can show the options on top
      let result = getSearchResult(e); // get the result
      // if pagination is true, filter the result by page one
      if (isPaginated) {
        result = getDataByPage(result, 1);
      }
      setDataList(result);
    }
  }, [auxOptions, isPaginated, pageSize, dataList]);

  // function to load more items in the list and set the page
  const loadMoreItems = React.useCallback(() => {
    if (!isPaginated || !pageSize || dataList.length > 0) return;
    let result = getSearchResult(searchText); // get the result
    const newResult = getDataByPage(result, currentPage + 1); // get the new items by increased page
    // if there is result, set the list
    if (newResult.length > 0 && dataList) {
      setDataList([...dataList, ...newResult]);
    }
  }, [isPaginated, pageSize, dataList, searchText, currentPage]);

  // function to close the list
  const handleClose = () => {
    setDataList([]); // close the list
    setCanAnimate(false); // set the animation to false
    if (setIsShowingList) { // set the state of showing the list to false, if the user send the function
      setIsShowingList(false);
    }
    setHideOptionsOnTop(true); // hide the options on top
  };

  // function to handle the selection of an option
  const handleSetSelectedsItem = (index: any, item?: Options) => {
    // it is not possible to select an option if there is no list
    if (dataList.length > 0) {
      return;
    }
    // if there is action to select an option, call it
    if (onSelectOption && item) {
      onSelectOption(index, item)
    }
    // do not continue if cannot select multiple options
    if (!multipleSelect) {
      return;
    }
    // update the list, set the selected option as selected
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
    setHideOptionsOnTop(false); // show the options on top
    if (setOptions) { // if there is a function to set the options, call it
      setOptions(auxData);
    }
    setDataList(auxData); // set the list as updated
  };

  // verify if there is selected options every time the list is updated
  React.useEffect(() => {
    if (dataList.length > 0) { return }
    if (setHasSelectedOptions) { // verify if there is selected options
      let has = false; // start as false
      dataList.forEach(child => {
        if (child.selected) {
          has = true; // became true if there is a selected option
        }
      });
      setHasSelectedOptions(has);
    }
    // if there is selected options and the function to show the list is showing, show the list
    if (dataList.length > 0 && setIsShowingList) {
      setIsShowingList(true);
    }
  }, [dataList]);

  // -- COMPONENTS --
  // render the flatlist with the selected options on top
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

  // render the items of the list
  const RenderItem = (item: Options, index: any) => (
    <TouchableOpacity
      style={[s.itemContainer, itemListContainerStyle, index === 0 && {marginTop: wp('2%')}]}
      onPress={() => handleSetSelectedsItem(index, item)}>
      <View style={[s.itemContainer, itemListContainerStyle, index === 0 && {marginTop: wp('2%')}]}>
        <Text style={[s.itemText, !!item.selected && {paddingLeft: ('3%')}]}>{item.label}</Text>
        {!!item.selected && (
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: wp('3%')}}>
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

  // render the list
  const ListComponent = () => (
    <Animated.View
      animation={animationList && canAnimate ? animationList : ''}
      onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList
        onEndReached={() => loadMoreItems()}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="always"
        data={dataList as any}
        extraData={dataList}
        renderItem={({item, index}: any) => RenderItem(item, index)}
        keyExtractor={(item: any) => item.key}
      />
    </Animated.View>
  );

  // render the counter of selected options
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
        {!hideOptionsOnTop && !!showSelectedOptionsOnTop && options.some(option => option.selected === true) && <OptionsOnTop />}
        <View style={{...s.inputContainer, ...searchContainerStyle}}>
          <View style={{paddingTop: wp('2%')}}>
            {dataList.length > 0 && !!closeIcon ? (
              <TouchableOpacity
                onPress={() => {
                  if (dataList.length > 0) {
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
        {!!(dataList.length > 0) && <ListComponent />}
        </View>
    </Animated.View>
  );
}

export default SearchSelect;
