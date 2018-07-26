export default class Client {
    _id = undefined;
    address = {};
    name = '';
    surname = '';
    email = '';
    documentId = '';
    cuit = '';
    phone = '';
    birthdate = '';
    workPhone = '';
    cellPhone = '';
    observations = '';
    category = 'interesado';
    deleted = false;

    constructor(obj) {
        Object.assign(this, obj);
    }
}
