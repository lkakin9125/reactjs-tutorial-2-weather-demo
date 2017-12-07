import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { FormControl, FormHelperText, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Weather from '../model/dao/Weather';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { CircularProgress } from 'material-ui/Progress';
import GitHubIcon from './GitHubIcon';
class WeatherView extends Component {
  renderActionBar() {
    return (
      <AppBar position="static">
        <Toolbar>
          <a href={this.props.gitHubUrl}>
          <IconButton color="contrast" aria-label="Menu" style={{marginLeft: -12,marginRight: 20,}} onClick={()=>{console.log('123123')}}>
            <GitHubIcon />
          </IconButton>
          </a>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            Weather Demo
        </Typography>

        </Toolbar>
      </AppBar>

    )
  }

  renderLocationSelecter() {
    var { locations, currLocation, handleLocationChange } = this.props;
    return (
      <Card>
        <div style={{ padding: 15 }}>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Location</FormLabel>
            <RadioGroup row
              onChange={handleLocationChange}
              aria-label="anchorOriginHorizontal"
              name="anchorOriginHorizontal"
              value={`${currLocation.woeid}`}>
              {
                locations.map((location, index) => {
                  return (
                    <FormControlLabel
                      value={`${location.woeid}`}
                      control={<Radio />}
                      label={location.name}
                      key={`${location}_${index}`} />
                  )
                })
              }
            </RadioGroup>
          </FormControl>
        </div>
      </Card>
    )
  }


  renderWeather(weather) {
    var imageCol = 4;
    return (
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs={imageCol}>
            <img src={weather.image} style={{ width: '100%' }} />
          </Col>
          <Col xs={12} md={1}>
          </Col>
          <Col xs={imageCol}>
            <div>
              {weather.date}
            </div>
            <div>
              {weather.displayTemp}
            </div>
            <div>
              {weather.text}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  renderWeatherContentList() {
    var { currWeather, forecast } = this.props;

    return (
      <div>
        <Card>
          <div style={{ padding: 15 }}>
            <Typography type="headline">Today Weather</Typography>
            {this.renderWeather(currWeather)}
          </div>
        </Card>
        {
          forecast.map((fore, index) => {
            return (
              <ExpansionPanel key={`${fore.date}_${index}`}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography >{fore.date}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.renderWeather(fore)}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }

  render() {
    console.log('weatherview', this.props);
    return [
      <div>
        {this.renderActionBar()}
      </div>,
      <Container>
        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          <Col>
            {this.renderLocationSelecter()}
          </Col>
        </Row>

        <Row className="align-items-center justify-content-center">
          <Col>
            {
              this.props.currWeather == null ?
                <center style={{ marginTop: 15 }}><CircularProgress /></center> :
                this.renderWeatherContentList()
            }
          </Col>
        </Row>
      </Container>

    ]
  }
}

export default WeatherView;
