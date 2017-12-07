import store from '../redux';

const locations = [
    { name: 'Hong Kong', value: 'hk', woeid: 2165352 },
    { name: 'Beijing', value: 'hk', woeid: 2151330 },
    { name: 'Tokyo', value: 'hk', woeid: 1118370 },
    { name: 'New York', value: 'hk', woeid: 2459115 },
    { name: 'California', value: 'hk', woeid: 23511745 },
]

function getState() {
    return store.getState().location;
}

function setLocation(location) {
    store.dispatch({
        type: 'LOCATION_UPDATE',
        payload: location
    });

}

function getLocation() {
    return getState().location;
}

function getWoeid(){
    return getLocation().woeid;
}

function getAllLocation(){
    return locations;
}
function setLocationViaWoeid(woeid){
    var filterResult = getAllLocation().filter((location)=>{return location.woeid == woeid});
    if(filterResult){
        setLocation(filterResult[0]);
        return true;
    }else{
        return false;
    }
}

export default {
    getLocation,
    setLocation,
    getWoeid,
    getAllLocation,
    setLocationViaWoeid
}