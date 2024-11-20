/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchSelect from "react-native-search-select";
import Ionicons from "react-native-vector-icons/Ionicons";

// Function to generate a large number of options
const generateOptions = (size) =>
  Array.from({ length: size }, (_, i) => ({
    key: `$key-${i}`,
    label: `Option ${i + 1}`,
    selected: false,
  }));
const seeds = generateOptions(100); // generating 100 options

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const App = ({
  options: initialOptions = seeds,
  isPaginated = true,
  pageSize = 10,
  ...props
}) => {
  const [options, setOptions] = useState(initialOptions);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 35,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <SearchSelect
        // configuration
        multipleSelect={true}
        options={options}
        setOptions={setOptions}
        showSelectedOptionsOnTop={true}
        showSelectedOptionsCounter={true}
        isPaginated={isPaginated} // Allow user to override
        pageSize={pageSize} // Allow user to override
        // animation
        animationInput="bounceIn"
        animationList="fadeInUpBig"
        // styling
        placeholder="Search for options"
        placeholderTextColor="#333333"
        itemListContainerStyle={s.itemListContainerStyle} // renderItem (search result)
        itemListTextStyle={s.itemListTextStyle}
        searchContainerStyle={s.searchContainerStyle} // searchbar
        inputStyle={s.inputStyle}
        optionsOnTopContainerStyle={s.optionsOnTopContainerStyle} // options on top (selected options at the top of the list)
        optionsOnTopTextStyle={s.optionsOnTopTextStyle}
        counterContainerStyle={s.counterContainerStyle} // options counter
        counterTextStyle={s.counterTextStyle}
        paginationWrapContainerStyle={s.paginationWrapContainerStyle} // pagination
        paginationComponentContainerStyle={s.paginationComponentContainerStyle}
        paginationComponentTextStyle={s.paginationComponentTextStyle}
        // icon
        IconSource={Ionicons}
        searchIcon="ios-search-outline" // search icon
        searchIconColor="#333333"
        searchIconSize={widthPercentageToDP("6%")}
        closeIcon="ios-close-circle" // close icon
        closeIconColor="#333333"
        closeIconSize={widthPercentageToDP("6%")}
        optionSelectedIcon="checkmark-outline" // option selected icon
        optionSelectedIconColor="#efefef"
        optionSelectedIconSize={widthPercentageToDP("6%")}
        closeOptionOnTopIcon="ios-close-circle-outline" // close top option icon
        closeOptionOnTopIconColor="#efefef"
        closeOptionOnTopIconSize={widthPercentageToDP("6%")}
        {...props} // Spread user-provided props to allow overrides
      />
    </View>
  );
};

const s = StyleSheet.create({
  // renderItem (search result)
  // style of the View that wraps the result of the search
  itemListContainerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    height: heightPercentageToDP("4.5%"),
    borderRadius: widthPercentageToDP("3%"),
    margin: widthPercentageToDP("1%"),
    marginTop: widthPercentageToDP("1.5%"),
  },
  // style of the text of each option
  itemListTextStyle: {
    maxWidth: widthPercentageToDP("80%"),
    fontSize: widthPercentageToDP("4%"),
    alignItems: "center",
    justifyContent: "center",
  },

  // searchbar
  // style of the View that wraps the searchBar
  searchContainerStyle: {
    paddingTop: widthPercentageToDP("2%"),
    flexDirection: "row",
    marginHorizontal: widthPercentageToDP("2%"),
    justifyContent: "center",
    alignItems: "flex-start",
    width: widthPercentageToDP("90%"),
  },
  // style of the TextInput
  inputStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgrey",
    alignItems: "flex-start",
    marginHorizontal: widthPercentageToDP("2%"),
    paddingHorizontal: widthPercentageToDP("2%"),
    fontSize: heightPercentageToDP("2.6%"),
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("6%"),
    borderRadius: widthPercentageToDP("1%"),
    color: "#333333",
  },

  // options on top (selected options at the top of the list)
  // style of every view that wraps the selected option at the top of the
  optionsOnTopContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    margin: widthPercentageToDP("2.5%"),
    marginTop: 0,
    marginLeft: 0,
    padding: widthPercentageToDP("2.5%"),
    borderWidth: 1,
    borderRadius: widthPercentageToDP("1%"),
    borderColor: "#333333",
    backgroundColor: "#333333",
  },
  // style of the selected option text at the top of the list
  optionsOnTopTextStyle: {
    maxWidth: widthPercentageToDP("80%"),
    fontWeight: "bold",
  },

  // options counter
  // style of the view of the selected options counter
  counterContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: heightPercentageToDP("1%"),
  },
  // style of the text of the selected options counter
  counterTextStyle: {
    fontWeight: "bold",
    fontSize: widthPercentageToDP("5%"),
    color: "#333333",
  },

  // pagination
  paginationWrapContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: widthPercentageToDP("1.5%"),
  },
  paginationComponentContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#333333",
    borderRadius: widthPercentageToDP("10%"),
    width: widthPercentageToDP("20%"),
    height: heightPercentageToDP("4%"),
  },
  paginationComponentTextStyle: {
    fontSize: widthPercentageToDP("4%"),
    fontWeight: "bold",
  },
});

export default App;
