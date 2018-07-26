import {map} from 'lodash';
import Http from './http';


export default class ClientService {
    static async save(client) {
        if (client._id) {
            return Http.put(`api/clients/${client._id}`, {client});
        }
        const result = await Http.post('api/clients', {client});
        return result;
    }
    
    static async fetch() {
        const {clients} = await Http.get('api/clients/');
        return clients;
    }
    
    static async delete(clientId) {
        return Http.put(`api/clients/delete/${clientId}`);
    }

    static async search(term) {
        const {clients} = await Http.get(`api/clients/search?q=${term}`);
        return map(clients, client => ({
            value: client._id, label: `${client.name} ${client.surname} - ${client.email}`
        }));
    }
}
