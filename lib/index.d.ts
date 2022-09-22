/// <reference types="react" />
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
    SearchIcon: any;
    CloseIcon: any;
    CheckboxIcon: any;
}
declare function SearchSelect({ options, setIsShowingList, setOptions, animationList, setHasSelectedData, animationInput, placeholder, SearchIcon, CloseIcon, CheckboxIcon, searchTextColor, placeholderTextColor, itemListContainerStyle, listContainerStyle, containerStyle, inputStyle, }: SearchSelectProps): JSX.Element;
export default SearchSelect;
