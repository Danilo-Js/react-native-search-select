import { ViewStyle } from 'react-native';
interface Options {
    key: string;
    label: string;
    selected: boolean;
}
interface SearchSelectProps {
    options: Options[];
    setOptions?: Function;
    setIsShowingList?: Function;
    setHasSelectedData?: Function;
    listContainerStyle?: ViewStyle;
    itemListContainerStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    placeholder?: string;
    placeholderTextColor?: string;
    searchTextColor?: string;
    animationList?: string;
    animationInput?: string;
    IconSource: any;
    searchIcon: string;
    closeIcon: string;
    checkboxIcon: string;
    valueSelectedIconColor?: string;
    valueSelectedIconSize?: number;
    closeIconColor?: string;
    closeIconSize?: number;
    searchIconColor?: string;
    searchIconSize?: number;
}
declare function SearchSelect({ options, setIsShowingList, setOptions, animationList, setHasSelectedData, animationInput, placeholder, IconSource, searchIcon, closeIcon, checkboxIcon, valueSelectedIconColor, valueSelectedIconSize, closeIconColor, closeIconSize, searchIconColor, searchIconSize, searchTextColor, placeholderTextColor, itemListContainerStyle, listContainerStyle, containerStyle, inputStyle, }: SearchSelectProps): JSX.Element;
export default SearchSelect;
