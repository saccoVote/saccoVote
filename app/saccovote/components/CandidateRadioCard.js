import { RadioButtonItem } from "expo-radio-button";
import { StyleSheet, Text, View, Image } from "react-native";


const avatar = require('../assets/images/profile.png')

const CandidateRadioCard = ({ election, candidate, navigation, setChosenCandidate }) => {
    return (
        <RadioButtonItem value={candidate.id}
            label={
                <View style={styles.candidateRadioCard}>
                    <View style={styles.candidateTextContainer}>
                        <Text style={styles.candidateName}>{candidate.fullname}</Text>
                    </View>
                    <Image source={avatar} style={styles.candidateAvatar} />
                </View>
            }
        />
    )
}

export default CandidateRadioCard

const styles = StyleSheet.create(
    {
        candidateName: {
            fontSize: 15,
            textAlign: 'left',
        },
        candidateRadioCard: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FOFOFO',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 8,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            marginBottom: 25,
        },
        // candidateTextContainer: {
        //   flex: 1,
        // },
        candidateAvatar: {
            marginLeft: 16,
            width: 50,
            height: 50,
            borderRadius: 25,
        },
    }
)