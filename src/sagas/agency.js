import {call, put} from 'redux-saga/effects';
import {notifyAgencySavedSuccessfully, receiveAgencies} from '../actions';
import AgencyService from '../services/agency';

export function* saveAgency({agency}) {
    yield call(AgencyService.save, agency);
    yield put(notifyAgencySavedSuccessfully());
}

export function* fetchAgencies() {
    const agencies = yield call(AgencyService.fetch);
    yield put(receiveAgencies(agencies));
}
