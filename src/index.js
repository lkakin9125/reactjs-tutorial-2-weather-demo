import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import WeatherContainer from './container/WeatherPage';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

ReactDOM.render(<WeatherContainer />, document.getElementById('root'));
registerServiceWorker();

