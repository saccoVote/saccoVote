import BaseService from "./BaseService";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

class SaccoUserService extends BaseService {

    async addUser(payload){
        return this.post(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/users/`, payload)
    }

    async editUser(userId, payload){
        return this.put(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/users/${userId}/`, payload)
    }

    async getUser(userId){
        return this.get(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/users/${userId}/`)
    }

    async getUsers(){
        return this.get(`/saccos/${await AsyncStorage.getItem('selectedSaccoId')}/users/`)
    }

}

export default new SaccoUserService();