import {
    DWELLING_FIND_SUCCEEDED,
    DWELLING_SAVE_REQUESTED,
    DWELLING_SAVE_SUCCEEDED,
    DWELLINGS_FETCH_SUCCEEDED,
    DWELLINGS_SEARCH_REQUESTED,
    DWELLINGS_SEARCH_SUCCEEDED,
    SAVE_PARTIAL_DWELLING,
    LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED
} from '../actions';

export default function dwelling(state = {}, action) {
    switch (action.type) {
        case DWELLINGS_FETCH_SUCCEEDED:
            return {...state, dwellings: action.dwellings};
        case SAVE_PARTIAL_DWELLING:
            return {...state, dwelling: action.dwelling};
        case DWELLING_FIND_SUCCEEDED:
            return {...state, dwelling: action.dwelling};
        case DWELLING_SAVE_REQUESTED:
            return {...state, saving: true};
        case DWELLING_SAVE_SUCCEEDED:
            return {...state, dwelling: null, saving: false};
        case DWELLINGS_SEARCH_REQUESTED:
            return {...state, searchParams: action.searchParams};
        case DWELLINGS_SEARCH_SUCCEEDED:
            return {...state, searchedDwellings: action.dwellings};
        case LOAD_MORE_DWELLINGS_FETCH_SUCCEEDED:
            return {...state, dwellings: action.dwellings};

        default:
            return state;
    }
}
