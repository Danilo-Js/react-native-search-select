var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable eqeqeq */
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, } from 'react-native';
import * as Animated from 'react-native-animatable';
import { widthPercentageToDP as wp, } from 'react-native-responsive-screen';
function SearchSelect({ 
// configuration
multipleSelect, onSelectOption, options, setOptions, showSelectedOptionsOnTop, setIsShowingList, setHasSelectedOptions, showSelectedOptionsCounter, isPaginated, pageSize, getNextPage, 
// styling
placeholder, placeholderTextColor, itemListContainerStyle = {}, // style of the View that wraps the result of the search
itemListTextStyle = {}, // style of the text of each option
searchContainerStyle = {}, // style of the View that wraps the searchBar
inputStyle = {}, // style of the TextInput
optionsOnTopContainerStyle = {}, // style of every view that wraps the selected option at the top of the
optionsOnTopTextStyle = {}, // style of the selected option text at the top of the list
counterTextStyle = {}, // style of the text of the selected options counter
counterContainerStyle = {}, // style of the view of the selected options counter
paginationComponentContainerStyle = {}, paginationComponentTextStyle = {}, paginationWrapContainerStyle = {}, 
// animation
animationList, animationInput, 
// icon
IconSource, searchIcon, searchIconColor, searchIconSize, closeIcon, closeIconColor, closeIconSize, optionSelectedIcon, optionSelectedIconColor, optionSelectedIconSize, closeOptionOnTopIcon, closeOptionOnTopIconColor, closeOptionOnTopIconSize, }) {
    // -- STATES --
    const [searchText, setSearchText] = React.useState(''); // state to handle the search text
    const [canAnimate, setCanAnimate] = React.useState(true); // state to handle if can animate
    const [hideOptionsOnTop, setHideOptionsOnTop] = React.useState(false); // state to hide the options on top
    const [isSearchClosed, setIsSearchClosed] = React.useState(false); // state to handle if the search is closed
    // data
    const [auxOptions, _] = React.useState(options); // options but in a useState (backup of the options)
    const [dataList, setDataList] = React.useState([]); // options to show in the list
    const [selectedKeys, setSelectedKeys] = React.useState([]); // array with keys of the selected options
    // pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    // -- FUNCTIONS --
    // returns the list filtered by a page
    const getDataByPage = (options, page) => {
        // Return an empty array if pageSize is not set
        if (!pageSize)
            return [];
        // Calculate the starting index for the current page
        const startIndex = (page - 1) * pageSize;
        // Calculate the ending index for the current page
        const endIndex = startIndex + pageSize;
        // Slice the options array to get only the items for the current page
        return options.slice(startIndex, endIndex);
    };
    // returns the list filtered by the search text
    const getSearchResult = React.useCallback((e) => {
        return auxOptions.filter(op => op.label.toLowerCase().includes(e));
    }, [auxOptions]);
    // function to handle search
    const handleSearch = (e) => {
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
            result.forEach((item, index) => {
                if (selectedKeys.some(e => item.key === e)) {
                    result[index].selected = true;
                }
                else {
                    result[index].selected = false;
                }
            });
        }
        else {
            // if there are no selected options in the backup list, set all the options as not selected
            result.forEach((_, index) => {
                result[index].selected = false;
            });
        }
        setDataList(result);
    };
    // function to load the previous page
    const loadNextPage = () => __awaiter(this, void 0, void 0, function* () {
        if (!isPaginated || !pageSize)
            return; // continue only if the list is paginated
        if (getNextPage && ((currentPage + 1) <= pageSize)) { // if there is a function to get the next page
            setCurrentPage(currentPage + 1); // set the current page to the next page
            let pagedData = yield getNextPage(currentPage + 1); // get the data from next page
            if (pagedData && pagedData.length > 0) { // if the data is not empty, add it to the list
                setDataList(pagedData.filter((op) => op.label.toLowerCase().includes(searchText)));
            }
            return;
        }
        // if the list is less than the page size, do not continue or
        // if the next page is empty, do not continue
        if (dataList.length < pageSize || getDataByPage(getSearchResult(searchText), currentPage + 1).length === 0)
            return;
        setCurrentPage(currentPage + 1); // set the current page to the next page
        setDataList(getDataByPage(getSearchResult(searchText), currentPage + 1));
    });
    // function to load the previous page
    const loadPreviousPage = () => {
        setCurrentPage(currentPage - 1);
        setDataList(getDataByPage(getSearchResult(searchText), currentPage - 1));
    };
    // function to add a key to the array of selected keys
    const addSelectedKey = (key) => {
        setSelectedKeys([...selectedKeys, key]);
    };
    // function to remove a key from the array of selected keys
    const removeSelectedKey = (key) => {
        setSelectedKeys(selectedKeys.filter(e => e !== key));
    };
    // function to close the list and the search
    const handleClose = () => {
        Keyboard.dismiss();
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
    const handleSetSelectedsItem = (index, item) => {
        // if there are action to select an option, call it
        if (onSelectOption && item) {
            onSelectOption(index, item);
        }
        // do not continue if cannot select multiple options
        if (!multipleSelect) {
            return;
        }
        // update the array of options, according to the selected option
        let auxData = [];
        dataList.forEach(d => {
            if (d.key === index) {
                // if the option is not selected, add it to the array of selected keys
                if (!d.selected) {
                    addSelectedKey(d.key);
                }
                else {
                    // if the option is selected, remove it from the array of selected keys
                    removeSelectedKey(d.key);
                }
                // update the option
                auxData.push(Object.assign(Object.assign({}, d), { selected: !d.selected }));
            }
            else {
                auxData.push(Object.assign({}, d));
            }
        });
        setHideOptionsOnTop(false); // show the options on top
        setDataList(auxData); // set the list as updated
    };
    // every time the selectedKeys are updated, verify if there are setOptions function and call it with the updated options
    React.useEffect(() => {
        if (setOptions) {
            let options = [];
            auxOptions.forEach((option) => {
                if (selectedKeys.some(e => option.key === e)) {
                    options.push(Object.assign(Object.assign({}, option), { selected: true }));
                }
                else {
                    options.push(Object.assign(Object.assign({}, option), { selected: false }));
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
        const selectedOptions = auxOptions.filter(option => selectedKeys.some(e => option.key === e));
        return (<View>
        <FlatList data={selectedOptions} extraData={selectedOptions} horizontal={true} keyExtractor={(item, i) => item.key + i} renderItem={({ item }) => (<View style={optionsOnTopContainerStyle}>
              <Text numberOfLines={1} style={optionsOnTopTextStyle}>
                {item.label}{' '}
              </Text>
              <TouchableOpacity onPress={() => removeSelectedKey(item.key)}>
                <IconSource name={closeOptionOnTopIcon} color={closeOptionOnTopIconColor} size={closeOptionOnTopIconSize}/>
              </TouchableOpacity>
            </View>)}/>
      </View>);
    };
    // render the items of the list
    const RenderItem = (item, index) => (<TouchableOpacity style={itemListContainerStyle} onPress={() => handleSetSelectedsItem(item.key, item)}>
      <Animated.View animation={animationList && canAnimate ? animationList : ''} style={itemListContainerStyle}>
        <Text numberOfLines={1} style={[itemListTextStyle, !!selectedKeys.some(e => e === item.key) && { paddingLeft: wp('3%') }]}>{item.label}</Text>
        {!!selectedKeys.some(e => e === item.key) && (<View style={{ flex: 1, alignItems: 'flex-end', paddingRight: wp('3%') }}>
            {!!optionSelectedIcon && <IconSource name={optionSelectedIcon} color={optionSelectedIconColor} size={optionSelectedIconSize}/>}
          </View>)}
      </Animated.View>
    </TouchableOpacity>);
    // component of the pagination
    const PaginationComponent = () => (<View style={paginationWrapContainerStyle}>
      {currentPage > 1 && (<TouchableOpacity style={paginationComponentContainerStyle} onPress={() => loadPreviousPage()}>
          <Text style={paginationComponentTextStyle}>{'<'}</Text>
        </TouchableOpacity>)}
      <View style={paginationComponentContainerStyle}>
        <Text style={paginationComponentTextStyle}>{currentPage}</Text>
      </View>
      <TouchableOpacity style={paginationComponentContainerStyle} onPress={() => loadNextPage()}>
          <Text style={paginationComponentTextStyle}>{'>'}</Text>
      </TouchableOpacity>
    </View>);
    // render the list
    const ListComponent = () => (<Animated.View animation={animationList && canAnimate ? animationList : ''} onAnimationEnd={() => setCanAnimate(false)}>
      <FlatList onEndReachedThreshold={0.5} keyboardShouldPersistTaps="always" data={dataList} extraData={selectedKeys.length} renderItem={({ item, index }) => isSearchClosed ? null : RenderItem(item, index)} keyExtractor={(item) => item.key} ListFooterComponentStyle={paginationWrapContainerStyle} ListFooterComponent={() => isPaginated && !isSearchClosed ? PaginationComponent() : null}/>
    </Animated.View>);
    // render the counter of selected options
    const SelectedOptionsCounter = () => (<View style={counterContainerStyle}>
      <Text style={counterTextStyle}>
        {selectedKeys.length}
      </Text>
    </View>);
    return (<Animated.View animation={animationInput && canAnimate ? animationInput : ''} style={searchContainerStyle}>
      <View>
        {!hideOptionsOnTop && !!showSelectedOptionsOnTop && selectedKeys.length > 0 && <OptionsOnTop />}
        <View style={searchContainerStyle}>
          <View style={{ paddingTop: wp('3%') }}>
            {dataList.length > 0 && !!closeIcon ? (<TouchableOpacity onPress={() => handleClose()}>
                <IconSource name={closeIcon} color={closeIconColor} size={closeIconSize}/>
              </TouchableOpacity>) : !!searchIcon && (<IconSource name={searchIcon} color={searchIconColor} size={searchIconSize}/>)}
          </View>
          <TextInput onChangeText={(text) => handleSearch(text)} style={inputStyle} value={searchText} placeholder={placeholder ? placeholder : ''} placeholderTextColor={placeholderTextColor} underlineColorAndroid={'transparent'}/>
          {!!showSelectedOptionsCounter && selectedKeys.length > 0 && SelectedOptionsCounter()}
        </View>
        {!!(dataList.length > 0) && <ListComponent />}
        </View>
    </Animated.View>);
}
export default SearchSelect;
