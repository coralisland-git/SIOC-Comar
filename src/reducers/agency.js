import {AGENCY_SAVE_SUCCEEDED, AGENCY_SAVE_REQUESTED, AGENCY_FETCH_SUCCEEDED} from '../actions';

export default function dwelling(state = {}, action) {
    switch (action.type) {
        case AGENCY_FETCH_SUCCEEDED:
            return {...state, agencies: action.agencies};
        case AGENCY_SAVE_REQUESTED:
            return {...state, saving: true};
        case AGENCY_SAVE_SUCCEEDED:
            return {...state, agency: null, saving: false};
        default:
            return state;
    }
}
