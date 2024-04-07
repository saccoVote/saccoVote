import BaseService from './BaseService'
import AsyncStorage from '@react-native-async-storage/async-storage';


class SaccoService extends BaseService {
    getSaccos(){
        return this.get('/saccos/');
    }
    /* postSaccos(payload){
        return this.post('/saccos', payload, withToken = false)
    } */

    async getSelectedSacco() {
        return this.get('/saccos/' + await AsyncStorage.getItem('selectedSaccoId'))
    }
}


export default new SaccoService();
