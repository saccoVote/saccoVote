import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';


const CustomRadioButton = ({ value, label, selected, onPress }) => (label);

export default CustomRadioButton


const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 5,
    },
    text: {
      fontSize: 16,
    },
    textSelected: {
      fontWeight: 'bold',
    },
    checkMark: {
      marginLeft: 10,
      width: 10,
      height: 10,
      backgroundColor: 'green',
    },
  });
  