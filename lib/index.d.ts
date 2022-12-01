import { ViewStyle } from 'react-native';
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
    setIsShowingList?: Function;
    setHasSelectedOptions?: Function;
    searchContainerStyle?: ViewStyle;
    itemListContainerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    placeholder?: string;
    placeholderTextColor?: string;
    searchTextColor?: string;
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
}
declare function SearchSelect({ multipleSelect, onSelectOption, options, setOptions, setIsShowingList, setHasSelectedOptions, searchContainerStyle, itemListContainerStyle, inputStyle, placeholder, placeholderTextColor, searchTextColor, animationList, animationInput, IconSource, searchIcon, searchIconColor, searchIconSize, closeIcon, closeIconColor, closeIconSize, optionSelectedIcon, optionSelectedIconColor, optionSelectedIconSize, }: SearchSelectProps): JSX.Element;
export default SearchSelect;
