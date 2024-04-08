import { StyleSheet, View, Text} from 'react-native';
import CustomRadioButton from './CustomRadioButton';


const CustomRadioButtonGroup = ({ options, selectedValue, onSelect }) => (
    <View>
      {options.map((option) => (
        <CustomRadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          selected={selectedValue === option.value}
        //   onPress={() => onSelect(option.value)}
        />
      ))}
    </View>
  );

  export default CustomRadioButtonGroup