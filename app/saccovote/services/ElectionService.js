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
    async getElections() {
        return this.get(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/`)
    }
    async getElectionCandidates(electionId){
        return this.get(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/candidates/`)
    }
    async applyCandidacy(electionId){
        return this.post(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/candidates/`, {})
    }
    async vetCandidate(electionId, candidateId, payload){
        return this.post(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/candidates/${candidateId}/vetting/`, payload)
    }
    async vote(electionId, candidate){
        return this.post(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/elections/${electionId}/votes/`, {candidate})
    }
}

export default new ElectionService()