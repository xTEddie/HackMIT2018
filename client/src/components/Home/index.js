import React, {Component} from 'react';
import axios from 'axios';
import Footer from '../Footer/';
import settings from '../../config/settings';
import './Home.scss';


class Home extends Component {

  componentDidMount() {
    axios({
      method: 'GET',
      url: `${settings.API_ROOT}/videoframes`,
    })
    .then((response) => {
      console.log(response);
    })
  }

  render() {
    return (
      <div>
        <h1> ShotSpot </h1>
      </div>
    )
  }
}

export default Home;
