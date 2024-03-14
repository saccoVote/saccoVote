import BaseService from './BaseService'


class AuthService extends BaseService {
    signup(payload){
        return this.post('/auth/signup', payload, withToken = false)
    }

    checkUser(email) {
        return this.get('/auth/check-user/' + email, withToken = false)
    }

    signin(payload) {
        return this.post('/auth/signin', payload, withToken = false)
    }

    getAuthenticatedUser() {
        return this.get('/auth/authenticated-user')
    }

}

export default new AuthService();