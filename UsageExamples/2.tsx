import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import SearchSelect from 'react-native-search-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [options, setOptions] = useState([
    {
      key: '0',
      label: 'Option 1',
      selected: false,
    },
    {
      key: '1',
      label: 'Option 2',
      selected: false,
    },
    {
      key: '2',
      label: 'Option 3',
      selected: false,
    },
  ]);

  return (
    <View style={{flex: 1, paddingTop: 35, alignItems: 'center'}}>
      <SearchSelect
        // configuration
        multipleSelect={false}
        options={options}
        onSelectOption={(index, option) =>
          Alert.alert(`Option selected: ${option.label}`)
        }
        // animation
        animationInput="bounceIn"
        animationList="fadeInUpBig"
        // styling
        placeholder="Search for options"
        // icon
        IconSource={Ionicons}
        searchIcon="ios-search-outline"
        closeIcon="ios-close-circle"
        optionSelectedIcon="ios-checkbox"
      />
    </View>
  );
};

export default App;
