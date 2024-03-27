<h1 align="center">
  react-native-search-select
</h1>

<h4 align="center">
  Select objects from a searchbar
</h4>

</br>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Danilo-Js/react-native-search-select">

  <a href="https://img.shields.io/github/repo-size/Danilo-Js/react-native-search-select/commits/master">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/Danilo-Js/react-native-search-select">
  </a>
  
  <img alt="Repository forks" src="https://img.shields.io/github/forks/Danilo-Js/react-native-search-select">
  
  <img alt="Repository stars" src="https://img.shields.io/github/stars/Danilo-Js/react-native-search-select">
</p>

<p align="center">
  <a href="https://img.shields.io/github/issues/Danilo-Js/react-native-search-select/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Danilo-Js/react-native-search-select">
  </a>

  <img alt="Last commit" src="https://img.shields.io/github/last-commit/Danilo-Js/react-native-search-select">

  <a href="https://www.npmjs.com/package/react-native-react-native-search-bar">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-native-search-select.svg">
  </a>
</p>

<p align="center" direction="row">
<a href="#information_source-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#scroll-props">Props</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<p align="center" direction="row">
  <a href="#configuration-props">Configuration props</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#styling-props">Styling props</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#animation-props">Animation props</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#icon-props">Icon props</a>
</p>

</br>

<p align="center">
  <img alt="Android_MultipleSelect" width="300" src="./Gallery/Android_1.gif">
  <img alt="Android" width="300" src="./Gallery/Android_2.gif">
</p>

</br>

## :information_source: About the project

This project was made for my final paper in the Computer Science course at UFES (Federal University of Espírito Santo), where I created this public library to study the acceptance of the developer community with new proposals for reuse.

Please leave a ***STAR*** at the [repository](https://github.com/Danilo-Js/react-native-search-select) and contribute to my work.

## :rocket: Getting Started

1. Install [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#installation) and the icon sources you want. In the main example, we use `Ionicons`. You can see all the sources and its icons [here](https://oblador.github.io/react-native-vector-icons/)

2. Install this library. You can use `$ yarn add react-native-search-select` or `$ npm install react-native-search-select`

## :information_source: Usage

1. In [this example](https://github.com/react-native-search-select/UsageExamples/1), you can select several objects, also using the counter and the list of selected objects

<p align="center">
  <img alt="iOS_MultipleSelect" width="300" heigh="600" src="./Gallery/iOS_1.gif">
  <img alt="Android_MultipleSelect" width="300" heigh="600" src="./Gallery/Android_1.gif">
</p>

2. In [this example](https://github.com/react-native-search-select/UsageExamples/2), you can select a single option in a simple way

<p align="center">
  <img alt="iOS" width="300" heigh="600" src="./Gallery/iOS_2.gif">
  <img alt="Android" width="300" heigh="600" src="./Gallery/Android_2.gif">
</p>

## :scroll: Props

### Configuration props

| Property              |                            Type                            | Required | Description                                                                                                |
| --------------------- | :--------------------------------------------------------: | :------: | ---------------------------------------------------------------------------------------------------------- |
| placeholder            |  String   |  False   | placeholder of the searchbar TextInput                                                          |
| options               | array of { key: string; label: string; selected: boolean } |   True   | array of items to search and select                                                                        |
| setOptions            |                          function                          |  False   | function that set the value of options array                                                               |
| multipleSelect        |                          Boolean                           |   True   | if the search should allow to select multiple options or not                                               |
| isPaginated        |                          Boolean                           |   False   | if the list is paginated (default is false)                                            |
| pageSize        |                          Number                           |   False   | in case the list is paginated, what would be the number of items of every page                                               |
| getNextPage        |                          Function                           |   False   | receives the page as a parameter and returns an array with the objects on that page. Without this function, it is understood that the objects on this page are already in the Options array                                               |
| showSelectedOptionsOnTop      |                          Boolean                          |  False   | boolean value that says if the selected option should appear on the top of the bar    |
| showSelectedOptionsCounter |                          Boolean                          |  False   | boolean value to show a counter of selected options. Shows nothing when there is no selected options.                               |
| onSelectOption        |                          Function                           |  False   | function called when the option is selected. Use as (selectedIndex, selectedOption) => {} |
| setIsShowingList      |                          function                          |  False   | function that sets a boolean value that says if the list is showing or not                                 |
| setHasSelectedOptions |                          function                          |  False   | function that sets a boolean value that says if there is any option selected                               |


### Styling props

| Property               |   Type    | Required | Description                                                                                     |
| ---------------------- | :-------: | :------: | ----------------------------------------------------------------------------------------------- |
| placeholderTextColor   |  String   |  False   | color of the placeholder of the searchbar TextInput                                             |
| searchContainerStyle   | ViewStyle |  False   | style of the View that wraps the searchBar                                                      |
| itemListContainerStyle | ViewStyle |  False   | style of the View that wraps the result of the search                              |
| itemListTextStyle | TextStyle |  False   | style of the text of each option                              |
| inputStyle             | ViewStyle |  False   | style of the TextInput                                                                |
| optionsOnTopContainerStyle             | ViewStyle |  False   | style of every view that wraps the selected option at the top of the bar                                                                |
| optionsOnTopTextStyle             | TextStyle |  False   | style of the selected option text at the top of the list                                                                |
| counterTextStyle        |  TextStyle   |  False   | style of the text of the selected options counter |
| counterContainerStyle        |  ViewStyle   |  False   | style of the view of the selected options counter |
| paginationWrapContainerStyle        |  ViewStyle   |  False   | style of the pagination container, applied into ListFooterComponentStyle and into the style of the view that wraps the component |
| paginationComponentContainerStyle        |  ViewStyle   |  False   | style of the pagination container individual components, applied the views that wraps the TouchableOpacity component that changes the page, and into the View componenent that wraps the informs the current page  |
| paginationComponentTextStyle        |  TextStyle   |  False   | style of every text that appears into the pagination component  |


### Animation props

| Property       |  Type  | Required | Description                                                                                                                                            |
| -------------- | :----: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| animationList  | String |  False   | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the entrance of the list  |
| animationInput | String |  False   | name of the choosen [react-native-animatable](https://github.com/oblador/react-native-animatable#animations-2) animation for the entrance of the input |

### Icon props

| Property                |                                               Type                                               |              Required               | Description                                                                                                                                                                           |
| ----------------------- | :----------------------------------------------------------------------------------------------: | :---------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IconSource              | [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon component |                True                 | name of the selected source of the [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons) source                                                           |
| searchIcon              |                                              String                                              |                False                | name of the icon that it will represent the search. It will be located in the right of the searchBar TextInput. It will only appears when there isn’t any item selected on the list   |
| searchIconColor         |                                              String                                              |                False                | color of the icon that represent the search. Default is 'black'                                                                                                                       |
| searchIconSize          |                                              Number                                              |                False                | size of the icon that represent the search. Default is 6% of the width                                                                                                                |
| closeIcon               |                                              String                                              |                False                | name of the icon that it will represent closing the search. It will be located in the right of the searchBar TextInput. It will only appears when there is selected items on the list |
| closeIconColor          |                                              String                                              |                False                | color of the icon that represent closing the search. Default is 'black'                                                                                                               |
| closeIconSize           |                                              Number                                              |                False                | size of the icon that represent closing the search. Default is 6% of the width                                                                                                        |
| optionSelectedIcon      |                                              String                                              | False | name of the icon that it will represent when the the individual item is selected. It will only appers at the right side of the selected item                                          |
| optionSelectedIconColor |                                              String                                              |                False                | color of the icon when the option is selected. Default is 'black'                                                                                                                     |
| optionSelectedIconSize  |                                              Number                                              |                False                | size of the icon when the option is selected. Default is 6% of the width                                                                                                              |
| closeTopOptionIcon      |                                              String                                              | False | name of the icon that it will represent when an option at the top of the bar will be deleted                                          |
| closeTopOptionIconSize  |                                              Number                                              |                False                | size of the icon the icon that it will represent when a selected option at the top of the bar will set as unselected |
| closeTopOptionIconColor |                                              String                                              |                False                | color of the icon the icon that it will represent when a selected option at the top of the bar will set as unselected  |

## :rocket: How to contribute

1) Clone the library repository

```
git clone https://github.com/Danilo-Js/react-native-search-select.git
```

2) Create a test project in the same folder where you cloned the repository

```
npx react-native init teste --template react-native-template-typescript
```

3) Install the library at "teste" by following the [Getting Started](#rocket-getting-started) steps

4) You can test your changes by using the script below. It will compile all the changes and past at the project "teste"

```
yarn compile
```

5) Create your branch, commit and push your changes

6) Wait for feedback approval


## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/Danilo-Js/react-native-search-select/blob/master/LICENSE) for more information.

---

#### Made by Danilo José Lima de Oliveira ♥

#### [Get in touch!](https://www.linkedin.com/in/danilo-js/) with me
