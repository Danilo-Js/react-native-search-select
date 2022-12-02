<h1 align="center">
  react-native-search-select
</h1>

<h4 align="center">
  Select objects from a searchbar
</h4>

</br>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Danilo-Js/react-native-search-select">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Danilo-Js/react-native-search-select">
  
  <a href="https://img.shields.io/github/repo-size/Danilo-Js/react-native-search-select/commits/master">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/Danilo-Js/react-native-search-select">
  </a>
</p>

<p align="center">
  <a href="https://img.shields.io/github/issues/Danilo-Js/react-native-search-select/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Danilo-Js/react-native-search-select">
  </a>
  
  <img alt="Repository forks" src="https://img.shields.io/github/forks/Danilo-Js/react-native-search-select">
  
  <img alt="Repository stars" src="https://img.shields.io/github/stars/Danilo-Js/react-native-search-select">
</p>

<p align="center" direction="row">
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#scroll-props">Props</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

</br>

## :rocket: Getting Started

1. Install [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#installation) and the icon sources you want. In the main example, we use `Ionicons`. You can see all the sources and its icons [here](https://oblador.github.io/react-native-vector-icons/)

2. Install this library. You can use `$ yarn add react-native-search-select` or `$ npm install react-native-search-select`
   

## :information_source: Usage

```js
import SearchSelect from "react-native-search-select";
```

## :scroll: Props

### Configuration props

| Property              |    Type    |     Required      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| multipleSelect        | Boolean |     True      | if the search should allow to select multiple options or not   |
| onSelectOption        | Boolean |     True only if multipleSelect is false | if the search should allow to select multiple options or not   |
| options               | array of { key: string; label: string; selected: boolean }  |     True      | array of items to search and select   |
| setOptions            |  function  |     False       | function that set the value of options array   |
| setIsShowingList      |  function  |     False     | function that sets a boolean value that says if the list is showing or not |
| setHasSelectedOptions    |  function  |     False     | function that sets a boolean value that says if there is any option selected |

### Styling props

| Property              |    Type    |     Required      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| searchContainerStyle    |  ViewStyle  |     False     | style of the View that wraps the searchBar  |
| itemListContainerStyle|  ViewStyle  |     False     | style of the View that wraps individually the result of the search  |
| inputStyle            |  ViewStyle  |     False     | style of the searchbar TextInput   |
| placeholder           | String | False | placeholder of the searchbar TextInput  |
| placeholderTextColor   | String | False | color of the placeholder of the searchbar TextInput |
| searchTextColor        | String  | False | color of the text of the serch in the serachbar TextInput. It can also be set in the inputStyle |

### Animation props

| Property              |    Type    |     Required      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| animationList   | String  | False | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the entrance of the list |
| animationInput    | String  | False | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the entrance of the input |

### Icon props

| Property              |    Type    |     Required      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| IconSource |  [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon component   | True | Name of the selected source of the [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) source |
| searchIcon |  String   | False | Name of the Icon that it will represent the search. It will be located in the right of the searchBar TextInput. It will only appears when there isn’t any item selected on the list |
| searchIconColor  |  String  |   False | color of the icon that represent the search. Default is 'black' |
| searchIconSize  |  Number  |  False  | size of the icon that represent the search. Default is 6% of the width  |
| closeIcon  |  String     | False | Name of the Icon that it will represent closing the search. It will be located in the right of the searchBar TextInput. It will only appears when there is selected items on the list |
| closeIconColor  |  String  |   False   | color of the icon that represent closing the search. Default is 'black' |
| closeIconSize  |  Number  |  False  | size of the icon that represent closing the search. Default is 6% of the width  |
| optionSelectedIcon  |  String | True only if multipleSelect is true | Name of the Icon that it will represent when the the individual item is selected. It will only appers at the right side of the selected item |
| optionSelectedIconColor  |  String  |  False  | color of the icon when the option is selected. Default is 'black'  |
| optionSelectedIconSize  |  Number  |     False     | size of the icon when the option is selected. Default is 6% of the width  |

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/Danilo-Js/react-native-search-select/blob/master/LICENSE) for more information.

---

#### Made by Danilo José Lima de Oliveira ♥

#### [Get in touch!](https://www.linkedin.com/in/danilo-js/) with me
