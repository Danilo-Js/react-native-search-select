import * as React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
interface Options {
    key: string;
    label: string;
    selected: boolean;
}
interface SearchSelectProps {
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
    getNextPage?: Function;
    itemListContainerStyle?: ViewStyle;
    itemListTextStyle?: TextStyle;
    paginationComponentTextStyle?: TextStyle;
    paginationComponentContainerStyle?: ViewStyle;
    paginationWrapContainerStyle?: ViewStyle;
    searchContainerStyle?: ViewStyle;
    optionsOnTopContainerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    optionsOnTopTextStyle?: TextStyle;
    placeholder?: string;
    placeholderTextColor?: string;
    counterTextStyle?: TextStyle;
    counterContainerStyle?: ViewStyle;
    animationList?: string;
    animationInput?: string;
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
    closeOptionOnTopIcon: string;
    closeOptionOnTopIconColor?: string;
    closeOptionOnTopIconSize?: number;
}
declare function SearchSelect({ multipleSelect, onSelectOption, options, setOptions, showSelectedOptionsOnTop, setIsShowingList, setHasSelectedOptions, showSelectedOptionsCounter, isPaginated, pageSize, getNextPage, placeholder, placeholderTextColor, itemListContainerStyle, // style of the View that wraps the result of the search
itemListTextStyle, // style of the text of each option
searchContainerStyle, // style of the View that wraps the searchBar
inputStyle, // style of the TextInput
optionsOnTopContainerStyle, // style of every view that wraps the selected option at the top of the
optionsOnTopTextStyle, // style of the selected option text at the top of the list
counterTextStyle, // style of the text of the selected options counter
counterContainerStyle, // style of the view of the selected options counter
paginationComponentContainerStyle, paginationComponentTextStyle, paginationWrapContainerStyle, animationList, animationInput, IconSource, searchIcon, searchIconColor, searchIconSize, closeIcon, closeIconColor, closeIconSize, optionSelectedIcon, optionSelectedIconColor, optionSelectedIconSize, closeOptionOnTopIcon, closeOptionOnTopIconColor, closeOptionOnTopIconSize, }: SearchSelectProps): React.JSX.Element;
export default SearchSelect;
