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
  paginationComponentTextStyle?: TextStyle;
  paginationComponentContainerStyle?: ViewStyle;
  paginationWrapContainerStyle?: ViewStyle;
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
  paginationComponentTextStyle = {},
  paginationComponentContainerStyle = {},
  paginationWrapContainerStyle = {},
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
  const [isSearchClosed, setIsSearchClosed] = React.useState(false); // state to handle if the search is closed
  // data
  const [auxOptions, _] = React.useState<Options[]>(options); // options but in a useState (backup of the options)
  const [dataList, setDataList] = React.useState<Options[]>([]); // options to show in the list
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]); // array with keys of the selected options
  // pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // -- FUNCTIONS --
  // returns the list filtered by a page
  const getDataByPage = (options: Options[], page: number): Options[] => {
    // Return an empty array if pageSize is not set
    if (!pageSize) return [];
    // Calculate the starting index for the current page
    const startIndex = (page - 1) * pageSize;
    // Calculate the ending index for the current page
    const endIndex = startIndex + pageSize;

    // Slice the options array to get only the items for the current page
    return options.slice(startIndex, endIndex);
  }

  // returns the list filtered by the search text
  const getSearchResult = React.useCallback((e: string): Options[] => {
    return auxOptions.filter(op => op.label.toLowerCase().includes(e));
  }, [auxOptions]);

  // function to handle search
  const handleSearch = (e: string) => {
    e = e.toLowerCase(); // set the search text to lower case
    setSearchText(e);
    // if search is empty, close the list
    if (!e || e === '') {
      handleClose();
      return;
    }
    setHideOptionsOnTop(false); // can show the options on top
    setIsSearchClosed(false); // set the search as open
    let result = getSearchResult(e); // get the result
    // if pagination is true, filter the result by page one
    if (isPaginated) { // if pagination is true, filter the result by page one
      setCurrentPage(1); 
      result = getDataByPage(result, 1);
    } 
    // if there are selected options in the backup list, set them as selected at the result
    if (multipleSelect === true && selectedKeys.length > 0) { 
      result.forEach((item: Options, index: number) => {
        if (selectedKeys.some(e=> item.key === e)) {
          result[index].selected = true;
        } else {
          result[index].selected = false;
        }
      })
    } else {
      // if there are no selected options in the backup list, set all the options as not selected
      result.forEach((_, index: number) => {
        result[index].selected = false;
      })
    }
    setDataList(result);
  };

  // function to load the previous page
  const loadNextPage = () => {
    if (!pageSize) return; // pageSize is required for the next verification
    // if the list is less than the page size, do not continue or
    // if the next page is empty, do not continue
    if (dataList.length < pageSize || getDataByPage(getSearchResult(searchText), currentPage + 1).length === 0) return; 
    setCurrentPage(currentPage + 1);
    setDataList(getDataByPage(getSearchResult(searchText), currentPage + 1));
  }

  // function to load the previous page
  const loadPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setDataList(getDataByPage(getSearchResult(searchText), currentPage - 1));
  }

  // function to add a key to the array of selected keys
  const addSelectedKey = (key: string) => {
    setSelectedKeys([...selectedKeys, key]);
  }

  // function to remove a key from the array of selected keys
  const removeSelectedKey = (key: string) => {
    setSelectedKeys(selectedKeys.filter(e => e !== key));
  }

  // function to close the list and the search
  const handleClose = () => {
    setSearchText(''); // set the search text to empty
    setIsSearchClosed(true); // close the list
    setCanAnimate(false); // set the animation to false
    if (setIsShowingList) { // set the state of showing the list to false, if the user send the function
      setIsShowingList(false);
    }
    setCurrentPage(1); // set the page to one
    setHideOptionsOnTop(true); // hide the options on top
  };

  // function to handle the selection of an option
  const handleSetSelectedsItem = (index: any, item?: Options) => {
    // if there are action to select an option, call it
    if (onSelectOption && item) {
      onSelectOption(index, item)
    }
    // do not continue if cannot select multiple options
    if (!multipleSelect) {
      return;
    }
    // update the array of options, according to the selected option
    let auxData: Options[] = [];
    dataList.forEach(d => {
      if (d.key === index) {
        // if the option is not selected, add it to the array of selected keys
        if (!d.selected) {
          addSelectedKey(d.key);
        } else {
          // if the option is selected, remove it from the array of selected keys
          removeSelectedKey(d.key);
        }
        // update the option
        auxData.push({
          ...d,
          selected: !d.selected,
        });
      } else {
        auxData.push({
          ...d,
        });
      }
    });
    setHideOptionsOnTop(false); // show the options on top
    setDataList(auxData); // set the list as updated
  };

  // every time the selectedKeys are updated, verify if there are setOptions function and call it with the updated options
  React.useEffect(() => {
    if (setOptions) {
      let options: Options[] = [];
      auxOptions.forEach((option: Options) => {
        if (selectedKeys.some(e=> option.key === e)) {
          options.push({
            ...option,
            selected: true,
          });
        } else {
          options.push({
            ...option,
            selected: false,
          });
        }
      });
      setOptions(options);
    }
  }, [selectedKeys]);

  // verify if there are selected options
  // verify if the list is showing
  React.useEffect(() => {
    if (setHasSelectedOptions) { // verify if there are selected options
      setHasSelectedOptions(selectedKeys.length > 0);
    }
    if (setIsShowingList) { // verify if the list is showing or if the search is closed
      setIsShowingList(isSearchClosed && dataList.length > 0);
    }
  }, [isSearchClosed, selectedKeys, dataList]);

  // -- COMPONENTS --
  // render the flatlist with the selected options on top
  const OptionsOnTop = () => {
    const selectedOptions = auxOptions.filter(option => selectedKeys.some(e=> option.key === e)); 
    return (
      <View>
        <FlatList
          data={selectedOptions}
          extraData={selectedOptions}
          horizontal={true}
          keyExtractor={(item, i) => item.key + i}
          renderItem={({item}) => (
            <View style={{...s.optionsOnTopView, ...optionsOnTopContainerStyle}}>
              <Text numberOfLines={1} style={{...s.optionsOnTopText, ...optionsOnTopTextStyle}}>
                {item.label}{' '}
              </Text>
              <TouchableOpacity onPress={() => removeSelectedKey(item.key)}>
                <IconSource
                  name={closeTopOptionIcon}
                  color={closeTopOptionIconColor ? closeTopOptionIconColor : colors.white}
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
      onPress={() => handleSetSelectedsItem(item.key, item)}>
      <Animated.View animation={animationList && canAnimate ? animationList : ''} style={[s.itemContainer, itemListContainerStyle, index === 0 && {marginTop: wp('2%')}]}>
        <Text numberOfLines={1} style={[s.itemText, !!selectedKeys.some(e => e === item.key) && {paddingLeft: wp('3%')}]}>{item.label}</Text>
        {!!selectedKeys.some(e => e === item.key) && (
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: wp('3%')}}>
            {!!optionSelectedIcon && <IconSource
              name={optionSelectedIcon}
              color={optionSelectedIconColor ? optionSelectedIconColor : colors.white}
              size={optionSelectedIconSize ? optionSelectedIconSize : wp('6%')}
            />}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );

  // component of the pagination
  const PaginationComponent = () => (
    <View style={{...s.paginationWrapContainer, ...paginationWrapContainerStyle}}>
      {currentPage > 1 && (
        <TouchableOpacity
          style={{...s.paginationComponentContainer, ...paginationComponentContainerStyle}}
          onPress={() => loadPreviousPage()}>
          <Text style={{...s.paginationComponentText, ...paginationComponentTextStyle}}>{'<'}</Text>
        </TouchableOpacity>
      )}
      <View style={{...s.paginationComponentContainer, ...paginationComponentContainerStyle}}>
        <Text style={{...s.paginationComponentText, ...paginationComponentTextStyle}}>{currentPage}</Text>
      </View>
      <TouchableOpacity
        style={{...s.paginationComponentContainer, ...paginationComponentContainerStyle}}
        onPress={() => loadNextPage()}>
          <Text style={{...s.paginationComponentText, ...paginationComponentTextStyle}}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );

  // render the list
  const ListComponent = () => (
    <Animated.View
    animation={animationList && canAnimate ? animationList : ''}
    onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="always"
        data={dataList as any}
        extraData={selectedKeys.length}
        renderItem={({item, index}: any) => isSearchClosed ? null : RenderItem(item, index)}
        keyExtractor={(item: any) => item.key}
        ListFooterComponentStyle={[s.paginationWrapContainer, paginationWrapContainerStyle]}
        ListFooterComponent={() => isPaginated && !isSearchClosed ? PaginationComponent() : null}
      />
    </Animated.View>
  );

  // render the counter of selected options
  const SelectedOptionsCounter = () => (
    <View style={{...s.counterStyle, ...counterContainerStyle}}>
      <Text style={{...s.counterText, ...counterTextStyle}}>
        {selectedKeys.length}
      </Text>
    </View>
  );

  return (
    <Animated.View
      animation={animationInput && canAnimate ? animationInput : ''}
      style={{flex: 1, flexDirection: 'column', ...searchContainerStyle}}>
      <View>
        {!hideOptionsOnTop && !!showSelectedOptionsOnTop && selectedKeys.length > 0 && <OptionsOnTop />}
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
                  color={closeIconColor ? closeIconColor : colors.mainOne}
                  size={closeIconSize ? closeIconSize : wp('6%')}
                />
              </TouchableOpacity>
            ) : !!searchIcon && (
              <IconSource
                name={searchIcon}
                color={searchIconColor ? searchIconColor : colors.mainOne}
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
          {!!showSelectedOptionsCounter && selectedKeys.length > 0 && SelectedOptionsCounter()}
        </View>
        {!!(dataList.length > 0) && <ListComponent />}
        </View>
    </Animated.View>
  );
}

export default SearchSelect;
