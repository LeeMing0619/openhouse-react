import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';

export const initialState = {
    accountinfo:null,
    status: 10,

    loadingtxt:'',
    realtortitles: null,
    realtortitlesstatus: 10,
    title: '',

    brokername: null,
    brokernamestatus: 10,
    broker: null,

    origination: null,
    originationstatus: 10,
    orgitem: null,

    realtorstatus: 10,

    newaccountinfo:null,
    newaccountstatus: 10,
}


const createaccount = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.USER_INIT:{
            return {
                ...initialState
            }
        }
        case Actions.CREATE_ACCOUNT_START:{
            return {
                ...state,
                accountinfo:null,
            }
        }
        case Actions.CREATE_ACCOUNT_SUCCESS:{
            return {
                ...state,
                accountinfo:action.payload,
            }
        }
        case Actions.CREATE_ACCOUNT_FAILD:{
            return {
                ...state,
                accountinfo: null,
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_START:{
            return {
                ...state,
                loadingtxt:'Updating data...',
                realtortitles:null,
                realtortitlesstatus:100,
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_SUCCESS:{
            return {
                ...state,
                realtortitles:action.payload,
                realtortitlesstatus: 200
            }
        }
        case Actions.CREATE_ACCOUNT_DATA_FAILD:{
            return {
                ...state,
                realtortitlesstatus: 400,
                realtortitles:null,
            }
        }
        case Actions.GET_BROKERS_NAME_START:{
            return {
                ...state,
                brokername:null,
                brokernamestatus: 100,
                title:'',
                loadingtxt:'Updating Title...',
            }
        }
        case Actions.GET_BROKERS_NAME_SUCCESS:{
            return {
                ...state,
                brokername:action.payload,
                brokernamestatus: 200,
                title:action.title,
            }
        }
        case Actions.GET_BROKERS_NAME_FAILD:{
            return {
                ...state,
                brokernamestatus: 400,
                brokername:null,
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_START:{
            return {
                ...state,
                origination:null,
                originationstatus: 100,
                loadingtxt:'Updating Broker...',
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_SUCCESS:{
            return {
                ...state,
                origination:action.payload,
                broker: action.title,
                originationstatus: 200,
            }
        }
        case Actions.GET_ORIGINATIONS_LIST_FAILD:{
            return {
                ...state,
                origination:null,
                originationstatus: 400,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_START:{
            return {
                ...state,
                loadingtxt:'Updating Realtor...',
                orgitem:null,
                realtorstatus: 100,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_SUCCESS:{
            return {
                ...state,
                orgitem:action.payload,
                realtorstatus: 200,
            }
        }
        case Actions.SET_ORIGINATION_ITEM_FAILD:{
            return {
                ...state,
                orgitem: null,
                realtorstatus: 400,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_START:{
            return {
                ...state,
                newaccountinfo:null,
                newaccountstatus:100,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_SUCCESS:{
            return {
                ...state,
                newaccountinfo:action.payload,
                newaccountstatus: 200
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_FAILD:{
            return {
                ...state,
                newaccountstatus: 400,
                newaccountinfo:null,
            }
        }
        case Actions.CREATE_NEW_ACCOUNT_EMAIL_FAILD:{
            return{
                ...state,
                newaccountstatus: 500,
                newaccountinfo:null,
            }
        }
        case Actions.USER_LOG_OUT:{
            return {
                ...initialState,
            }
        }
        default:
        {
            return state
        }
    }
}

const persistConfig = {
    key: 'createaccount',
    storage: storage,
    // blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, createaccount);
