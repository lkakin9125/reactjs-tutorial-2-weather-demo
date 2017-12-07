import { subscribe } from './index';
import WeatherReducer from './WeatherReducer';
import LocationReducer from './LocationReducer';
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

var reducer = combineReducers({
    weather: WeatherReducer,
    location: LocationReducer
})
var store = createStore(reducer);


export default store;

