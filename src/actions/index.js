export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';

export function requestSignOut() {
    return {type: SIGN_OUT_REQUESTED};
}

export const SAVE_PARTIAL_DWELLING = 'SAVE_PARTIAL_DWELLING';

export function savePartialDwelling(dwelling) {
    return {type: SAVE_PARTIAL_DWELLING, dwelling};
}

export const DWELLING_SAVE_REQUESTED = 'DWELLING_SAVE_REQUESTED ';
export const DWELLING_SAVE_SUCCEEDED = 'DWELLING_SAVE_SUCCEEDED ';

export function requestSaveDwelling(dwelling) {
    return {type: DWELLING_SAVE_REQUESTED, dwelling};
}

export function notifyDwellingSavedSuccessfully() {
    return {type: DWELLING_SAVE_SUCCEEDED};
}


export const DWELLINGS_FETCH_REQUESTED = 'DWELLINGS_FETCH_REQUESTED';
export const DWELLINGS_FETCH_SUCCEEDED = 'DWELLINGS_FETCH_SUCCEEDED';

export function requestDwellings() {
    return {type: DWELLINGS_FETCH_REQUESTED};
}

export function receiveDwellings(dwellings) {
    return {type: DWELLINGS_FETCH_SUCCEEDED, dwellings};
}

export const DWELLING_FIND_REQUESTED = 'DWELLING_FIND_REQUESTED';
export const DWELLING_FIND_SUCCEEDED = 'DWELLING_FIND_SUCCEEDED';

export function requestDwelling(id) {
    return {type: DWELLING_FIND_REQUESTED, id};
}

export function receiveOneDwelling(dwelling) {
    return {type: DWELLING_FIND_SUCCEEDED, dwelling};
}

export const DWELLINGS_SEARCH_REQUESTED = 'DWELLINGS_SEARCH_REQUESTED';
export const DWELLINGS_SEARCH_SUCCEEDED = 'DWELLINGS_SEARCH_SUCCEEDED';

export function requestFindDwellings(searchParams) {
    return {type: DWELLINGS_SEARCH_REQUESTED, searchParams};
}

export function receiveFindedDwellings(dwellings) {
    return {type: DWELLINGS_SEARCH_SUCCEEDED, dwellings};
}

export const USER_PROFILE_REQUESTED = 'USER_PROFILE_REQUESTED';
export const USER_PROFILE_SUCCEEDED = 'USER_PROFILE_SUCCEEDED';

export function requestUserProfile() {
    return {type: USER_PROFILE_REQUESTED};
}

export function receiveUserProfile(userProfile) {
    return {type: USER_PROFILE_SUCCEEDED, userProfile};
}

export const USER_SAVE_REQUESTED = 'USER_SAVE_REQUESTED';
export const USER_SAVE_SUCCEEDED = 'USER_SAVE_SUCCEEDED';

export function requestSaveUser(user) {
    return {type: USER_SAVE_REQUESTED, user};
}

export function notifyUserSavedSuccessfully() {
    return {type: USER_SAVE_SUCCEEDED};
}

export const USERS_BYROLE_REQUESTED = 'USERS_BYROLE_REQUESTED';
export const USERS_BYROLE_SUCCEEDED = 'USERS_BYROLE_SUCCEEDED';

export function requestUsersByRole(role) {
    return {type: USERS_BYROLE_REQUESTED, role};
}

export function receiveUsersByRole(usersByRole) {
    return {type: USERS_BYROLE_SUCCEEDED, usersByRole};
}

export const USERS_SEARCH_REQUESTED = 'USERS_SEARCH_REQUESTED';
export const USERS_SEARCH_SUCCEEDED = 'EMPLOYEES_SEARCH_SUCCEEDED';

export function requestSearchUsers(term, userType) {
    return {type: USERS_SEARCH_REQUESTED, term, userType};
}

export function receiveUsersOptions(usersOptions, userType) {
    return {type: USERS_SEARCH_SUCCEEDED, usersOptions, userType};
}

export const USER_ROLE_CHANGE_REQUESTED = 'USER_ROLE_CHANGE_REQUESTED';
export const USER_ROLE_CHANGE_SUCCEEDED = 'USER_ROLE_CHANGE_SUCCEEDED';

export function requestChangeUserRole(changeParams) {
    return {type: USER_ROLE_CHANGE_REQUESTED, changeParams};
}

export function notifyUserRoleChangedSuccessfully(usersOptions) {
    return {type: USER_ROLE_CHANGE_SUCCEEDED, usersOptions};
}

export const CLEAR_USERS = 'CLEAR_USERS';

export function clearUsers() {
    return {type: CLEAR_USERS};
}

export const LOAD_MORE_DWELLINGS_FETCH_REQUESTED = 'LOAD_MORE_DWELLINGS_FETCH_REQUESTED';
export const LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED = 'LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED';

export function requestLoadMoreDwellings(searchParams) {
    return {type: LOAD_MORE_DWELLINGS_FETCH_REQUESTED, searchParams};
}

export function receiveLoadMoreDwellings(dwellings) {
    return {type: LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED, dwellings};
}
export const SET_MAP_REFS = 'SET_MAP_REFS';

export function setMapRefs(currentPosition) {
    return {type: SET_MAP_REFS, currentPosition};
}

export const AGENCY_FETCH_REQUESTED = 'AGENCY_FETCH_REQUESTED ';
export const AGENCY_FETCH_SUCCEEDED = 'AGENCY_FETCH_SUCCEEDED ';

export function requestAgencies() {
    return {type: AGENCY_FETCH_REQUESTED};
}

export function receiveAgencies(agencies) {
    return {type: AGENCY_FETCH_SUCCEEDED, agencies};
}

export const AGENCY_SAVE_REQUESTED = 'AGENCY_SAVE_REQUESTED ';
export const AGENCY_SAVE_SUCCEEDED = 'AGENCY_SAVE_SUCCEEDED ';

export function requestSaveAgency(agency) {
    return {type: AGENCY_SAVE_REQUESTED, agency};
}

export function notifyAgencySavedSuccessfully() {
    return {type: AGENCY_SAVE_SUCCEEDED};
}

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED ';
export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED ';

export function requestUser(id) {
    return {type: USER_FETCH_REQUESTED, id};
}

export function receiveOneUser(user) {
    return {type: USER_FETCH_SUCCEEDED, user};
}
