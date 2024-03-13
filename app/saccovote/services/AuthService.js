import BaseService from './BaseService'


class AuthService extends BaseService {
    signup(payload){
        return this.post('/auth/signup', payload, withToken = false)
    }

}

export default new AuthService();