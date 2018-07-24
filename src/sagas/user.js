import {call, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    receiveUserProfile,
    notifyUserSavedSuccessfully,
    receiveUsersByRole,
    receiveUsersOptions,
    notifyUserRoleChangedSuccessfully,
    receiveOneUser
} from '../actions';
import UserService from '../services/user';

export function* fetchUserProfile() {
    const userProfile = yield call(UserService.getProfile);
    yield put(receiveUserProfile(userProfile));
}

export function* saveUser({user}) {
    yield call(UserService.save, user);
    yield put(notifyUserSavedSuccessfully());
}

export function* fetchUsersByRole({role}) {
    const usersByRole = yield call(UserService.fetchByRole, role);
    yield put(receiveUsersByRole(usersByRole));
}

export function* searchUsers({term, userType}) {
    yield call(delay, 500);
    const users = yield call(UserService.search, term, userType);
    yield put(receiveUsersOptions(users, userType));
}

export function* changeUserRole({changeParams}) {
    const usersByRole = yield call(UserService.changeRole, changeParams);
    yield put(receiveUsersByRole(usersByRole));
    yield put(notifyUserRoleChangedSuccessfully());
}

export function* fetchUser({id}) {
    console.log(id);
    const user = yield call(UserService.find, id);
    yield put(receiveOneUser(user));
}
