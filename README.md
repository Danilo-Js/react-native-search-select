<h1 align="center">
  react-native-search-select
</h1>

<h4 align="center">
  Select objects from a searchbar
</h4>

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

1. Install [react-native-vector-icons](https://reactnavigation.org/docs/4.x/getting-started/) and the icon sources you want. In the main example, we use `$ Ionicons`

   You can see all the sources and its icons [here](https://oblador.github.io/react-native-vector-icons/)

## :information_source: Usage

```js
import SearchSelect from "react-native-dynamic-search-select";
```

### Configuration - Props

| Property              |    Type    |     Default      | Description                                                              |
| --------------------- | :--------: | :--------------: | ------------------------------------------------------------------------ |
| style                 | ViewStyle  |     default      | set or override the style object for the main search view                |
| darkMode              |  boolean   |      false       | enable the dark mode                                                     |
| onChangeText          |  function  |     function     | set your own function for the onChangeText logic                         |
| onPress               |  function  |     function     | set your own function for the onPress functionality                      |
| onSearchPress         |  function  |     function     | set your own function for the **search** button's onPress functionality  |
| onClearPress          |  function  |     function     | set your own function for the **clear** button's onPress functionality   |
| onBlur                |  function  |     function     | set your own function for the text input's onBlur functionality          |
| onFocus               |  function  |     function     | set your own function for the text input's onBlur functionality          |
| textInputStyle        | TextStyle  |     default      | set or override the style object for the text input                      |
| searchIconImageStyle  | ImageStyle |     default      | set or override the style object for the search icon image style         |
| clearIconImageStyle   | ImageStyle |     default      | set or override the style object for the clear icon image style          |
| ImageComponent        | component  |      Image       | set your own Image component instead of react-native's default Image one |
| searchIconComponent   | component  |     default      | set your own component instead of Icon for the **search** component      |
| clearIconComponent    | component  |     default      | set your own component instead of Icon for the **clear** component       |
| searchIconImageSource |  ISource   |     default      | change the search icon image source                                      |
| clearIconImageSource  |  ISource   |     default      | change the clear icon image source                                       |
| clearIconImageSource  |  ISource   |     default      | change the clear icon image source                                       |
| placeholder           |   string   | "Search here..." | set your own placeholder string                                          |
| placeholderTextColor  |   color    |    undefined     | set placeholder text color                                               |
| spinnerColor          |   color    |     #fdfdfd      | change the spinner color                                                 |
| spinnerSize           |   number   |     default      | change the spinner size                                                  |
| SpinnerType           | component  |      Circle      | change the spinner type                                                  |
| spinnerVisibility     |  boolean   |      false       | change the spinner visibility                                            |

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/Danilo-Js/react-native-search-select/blob/master/LICENSE) for more information.

---

#### Made by Danilo José Lima de Oliveira ♥

#### [Get in touch!](https://www.linkedin.com/in/danilo-js/) with me
