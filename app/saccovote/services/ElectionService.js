import BaseService from "./BaseService";
import AsyncStorage from '@react-native-async-storage/async-storage';

class ElectionService extends BaseService {
    async addElection(payload) {
        return this.post(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/`, payload)
    }

    async editElection(electionId, payload) {
        return this.put(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/`, payload)
    }

    async getElection(electionId) {
        return this.get(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/`)
    }
}
export default new ElectionService()