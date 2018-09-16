import React, {Component} from 'react';
import _ from 'lodash';
import SnapshotsTable from '../SnapshotsTable/';
import Footer from '../Footer/';
import './Home.scss';


class Home extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="home">
        <SnapshotsTable/>
        <Footer/>
      </div>
    )
  }
}

export default Home;
