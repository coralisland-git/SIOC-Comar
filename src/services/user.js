import {map} from 'lodash';
import Http from './http';
import {Dwelling} from "../model";


export default class UserService {
    static async getProfile() {
        const {user} = await Http.get('api/users/profile');
        return (user);
    }

    static async save(user) {
        if (user._id) {
            return Http.put(`api/users/${user._id}`, {user});
        }
        const result = await Http.post('api/users', {user});
        return result;
    }

    static async fetchByRole(role) {
        const {users} = await Http.get(`api/users/byRole?role=${role}`);
        return users;
    }
    static async search(term, userType) {
        const {users} = await Http.get(`api/users/search?q=${term}&userType=${userType}`);
        return map(users, user => ({
            value: user._id, label: `${user.name} ${user.surname} - ${user.email}`
        }));
    }

    static async changeRole(changeParams) {
        const {users} = await Http.put('api/users/changeRole', changeParams);
        return users;
    }

    static async find(id) {
        const {user} = await Http.get(`api/users/${id}`);
        return user;
    }
}
