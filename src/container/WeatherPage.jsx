import React, { Component } from 'react';
import WeatherView from '../component/WeatherView';
import Weather from '../model/dao/Weather';
import LocationFactory from '../model/dao/Location';
import Store from '../model/redux/';
class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currLocation: LocationFactory.getLocation(),
            forecast: Weather.getForecast(),
            currWeather: Weather.getCurrWeather()
        }
    }
    componentWillMount() {
        this.unSub = Store.subscribe(() => {
            if (this.state.currLocation.woeid != LocationFactory.getWoeid()) {
                Weather.downloadWeather()
            }
            this.setState({
                currLocation: LocationFactory.getLocation(),
                forecast: Weather.getForecast(),
                currWeather: Weather.getCurrWeather()
            })
        })
        Weather.downloadWeather()
    }

    componentWillUnmount() {
        this.unSub();
    }

    handleLocationChange(event, value) {
        LocationFactory.setLocationViaWoeid(value);
    }

    
    render() {
        return (
            <WeatherView
                {...this.state}
                handleLocationChange={this.handleLocationChange}
                locations={LocationFactory.getAllLocation()}
                gitHubUrl="https://github.com/lkakin9125/reactjs-tutorial-2-weather-demo"
            />
        );
    }
}

export default WeatherContainer;
