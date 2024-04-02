import { API_URL } from '@env';
import  AsyncStorage  from '@react-native-async-storage/async-storage';


export default class BaseService {
    static #instance;
    
    constructor() {
        if (!BaseService.#instance) {
            BaseService.#instance = this;
        }
        return BaseService.#instance;
    }

    get API_URL() {
        return API_URL;
    }

    // Method to intercept requests and add Authorization token
    async #fetch(endpoint, options = {}, withToken = true) {
        console.log("Fetching...");
        const headers = new Headers(options.headers || {});
        if (withToken) {
            const token = await AsyncStorage.getItem('token');
            headers.append('Authorization', `Token ${token}`);
        }
        
        return fetch(`${this.API_URL}${endpoint}`, {
            ...options,
            headers,
        });
    }

    #getOptions(method, payload) {
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }
    }

    // Basic HTTP GET method
    get(endpoint, withToken = true) {
        return this.#fetch(endpoint, {}, withToken);
    }

    // Basic HTTP POST method
    post(endpoint, payload, withToken = true) {
        return this.#fetch(endpoint, this.#getOptions('POST', payload), withToken);
    }

    // Basic HTTP PUT method
    put(endpoint, payload, withToken = true) {  
        return this.#fetch(endpoint, this.#getOptions('PUT', payload), withToken); 
    }

    // Basic HTTP DELETE method
    delete(endpoint, withToken = true) {
        return this.#fetch(endpoint, {
            method: 'DELETE',
        }, withToken);
    }

    // Basic HTTP PATCH method
    patch(endpoint, payload, withToken = true) {
        return this.#fetch(endpoint, this.#getOptions('PATCH', payload), withToken);
    }
}
