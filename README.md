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
  
  <img alt="Repository license" src="https://img.shields.io/github/license/Danilo-Js/react-native-search-select">
</p>

<p align="center" direction="row">
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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

### Configuration - Props

| Property              |    Type    |     Required      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| options               | array of { key: string; label: string; selected: boolean }  |     true      | array of items to search and select   |
| setOptions            |  function  |     .       | function that set the value of options array   |
| setIsShowingList      |  function  |     .     | function that sets a boolean value that says if the list is showing or not |
| setHasSelectedData    |  function  |     .     | function that sets a boolean value that says if there is any data selected |
| listContainerStyle    |  ViewStyle  |     .     | .  |
| itemListContainerStyle|  ViewStyle  |     .     | .  |
| containerStyle        |  ViewStyle  |     .     | .  |
| inputStyle            |  ViewStyle  |     .     | .  |
| placeholder           | String | . | . |
| placeholderTextColor   | String | . | . |
| searchTextColor        | String  | . | . |
| animationList   | String  | . | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the list |
| animationInput    | String  | . | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the input |
| SearchIcon |  [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon component   | . | . |
| CloseIcon  |  [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon component     | . | . |
| CheckboxIcon  |  [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon component     | . | . |

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/Danilo-Js/react-native-search-select/blob/master/LICENSE) for more information.

---

#### Made by Danilo José Lima de Oliveira ♥

#### [Get in touch!](https://www.linkedin.com/in/danilo-js/) with me
