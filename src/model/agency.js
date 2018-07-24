export default class Agency {
    _id = undefined;
    auctioneer = {};
    captain = {};
    address = {};
    name = '';
    email = '';
    whatsapp = '';
    phone = '';
    constructor(obj) {
        Object.assign(this, obj);
    }
}
