const initState = {
    condition: null,
    forecast: null
};
// {
//     hk: {
//         condition: {
//             "code": null, //"33",
//             "date": null, //"Tue, 28 Nov 2017 10:00 PM HKT",
//             "temp": null, //"23",
//             "text": null, //"Mostly Clear"
//         },
//         forecast: [
//             // {
//             //     "code": "30",
//             //     "date": "28 Nov 2017",
//             //     "day": "Tue",
//             //     "high": "23",
//             //     "low": "21",
//             //     "text": "Partly Cloudy"
//             // }
//         ]
//     }
// }
export default function weatherReducer(state = initState, action) {
    switch (action.type) {
        case "WEATHER_UPDATE":
            return weatherUpdate(state, action)
    }
    return state;
}

function weatherUpdate(state, action) {
    var newState = {
        ...state,
        ...action.weather
    };
    console.log('action',action);
    console.log('new State',newState);
    // newState[action.location] = action.weather;
    return newState;
}