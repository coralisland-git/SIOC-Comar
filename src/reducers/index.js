import {combineReducers} from 'redux';
import dwelling from './dwelling';
import user from './user';
import map from './map';
import agency from './agency';

export default combineReducers({
    dwelling, user, map, agency
});
