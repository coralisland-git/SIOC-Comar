import {takeEvery} from 'redux-saga';
import {
    SIGN_OUT_REQUESTED,
    DWELLING_SAVE_REQUESTED,
    DWELLINGS_FETCH_REQUESTED,
    DWELLING_FIND_REQUESTED,
    DWELLINGS_SEARCH_REQUESTED,
    USER_PROFILE_REQUESTED,
    USER_SAVE_REQUESTED,
    USERS_BYROLE_REQUESTED,
    USERS_SEARCH_REQUESTED,
    USER_ROLE_CHANGE_REQUESTED,
    LOAD_MORE_DWELLINGS_FETCH_REQUESTED,
    AGENCY_SAVE_REQUESTED,
    AGENCY_FETCH_REQUESTED,
    USER_FETCH_REQUESTED,
    CLIENT_SAVE_REQUESTED,
    CLIENT_FETCH_REQUESTED,
    CLIENT_DELETE_REQUESTED,
    CLIENT_SEARCH_REQUESTED

} from '../actions';
import {saveDwelling, fetchDwellings, findDwelling, searchDwellings, fetchLoadMoreDwellings} from './dwelling';
import {signOut} from './session';
import {saveAgency, fetchAgencies} from './agency';
import {fetchUserProfile, saveUser, fetchUsersByRole, searchUsers, changeUserRole, fetchUser} from './user';
import {saveClient, fetchClients, deleteClient, searchClients} from './client';

export default function* root() {
    yield [
        takeEvery(SIGN_OUT_REQUESTED, signOut),
        takeEvery(DWELLING_SAVE_REQUESTED, saveDwelling),
        takeEvery(DWELLINGS_FETCH_REQUESTED, fetchDwellings),
        takeEvery(DWELLING_FIND_REQUESTED, findDwelling),
        takeEvery(DWELLINGS_SEARCH_REQUESTED, searchDwellings),
        takeEvery(USER_PROFILE_REQUESTED, fetchUserProfile),
        takeEvery(USER_SAVE_REQUESTED, saveUser),
        takeEvery(USERS_BYROLE_REQUESTED, fetchUsersByRole),
        takeEvery(USERS_SEARCH_REQUESTED, searchUsers),
        takeEvery(USER_ROLE_CHANGE_REQUESTED, changeUserRole),
        takeEvery(LOAD_MORE_DWELLINGS_FETCH_REQUESTED, fetchLoadMoreDwellings),
        takeEvery(AGENCY_SAVE_REQUESTED, saveAgency),
        takeEvery(AGENCY_FETCH_REQUESTED, fetchAgencies),
        takeEvery(USER_FETCH_REQUESTED, fetchUser),
        takeEvery(CLIENT_SAVE_REQUESTED, saveClient),
        takeEvery(CLIENT_FETCH_REQUESTED, fetchClients),
        takeEvery(CLIENT_DELETE_REQUESTED, deleteClient),
        takeEvery(CLIENT_SEARCH_REQUESTED, searchClients)
    ];
}
