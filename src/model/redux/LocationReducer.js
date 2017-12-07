const initState = {
    location: { name: 'Hong Kong', value: 'hk', woeid: 2165352 }
}
export default function locationReducer(state = initState, action) {
    switch (action.type) {
        case "LOCATION_UPDATE":
            return locationUpdate(state, action)
    }
    return state;
}

function locationUpdate(state, action) {
    return {
        ...state,
        location: action.payload
    }
}