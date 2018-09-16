import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Footer from '../Footer/';
import {Button, Popup, Table} from 'semantic-ui-react';
import Moment from 'react-moment';
import settings from '../../config/settings';
import './Home.scss';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableData: [],
      selectedColumn: null,
      sortOrder: null
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: `${settings.API_ROOT}/videoframes`,
    })
    .then((response) => {
      return response.data
    })
    .then((data) => {
      console.log(data)
      // Flatten array
      let tableData = data.map((snapshot) => {
        let row = {};
        row['camera_name'] = snapshot['camera']['name']
        row['longitude'] = snapshot['camera']['longitude']
        row['latitude'] = snapshot['camera']['latitude']
        row['image'] = snapshot['image']
        row['uploaded_at'] = snapshot['uploaded_at']
        return row
      })
      this.setState({
        data,
        tableData
      })
    })
  }

  handleSort(clickedColumn) {
    const {tableData, selectedColumn, sortOrder} = this.state
    if (selectedColumn !== clickedColumn) {
      this.setState({
        selectedColumn: clickedColumn,
        tableData: _.sortBy(tableData, [clickedColumn]),
        sortOrder: 'ascending',
      })
      return;
    }

    this.setState({
      tableData: tableData.reverse(),
      sortOrder: sortOrder === 'ascending'? 'descending': 'ascending'
    })
  }

  renderTable() {
    const {tableData} = this.state;
    let table = '';

    if (tableData.length === 0) {
      return table;
    }

    table = (
      <Table celled selectable sortable>
        {this.renderHeaders()}
        {this.renderRows()}
      </Table>
    )

    return table;
  }

  renderHeaders() {
    const {selectedColumn, sortOrder} = this.state;
    let headers = {
      'Camera Name': 'camera_name',
      'Longitude': 'longitude',
      'Latitude': 'latitude',
      'Image': 'image',
      'Uploaded at': 'uploaded_at'
    }

    return (
      <Table.Header>
        <Table.Row>
          {
            Object.keys(headers).map((header, index) =>
              <Table.HeaderCell
                key={index}
                sorted={selectedColumn === headers[header]? sortOrder: null}
                onClick={() => this.handleSort(headers[header])}
              >
                {header}
              </Table.HeaderCell>
            )
          }
        </Table.Row>
      </Table.Header>
    )
  }

  renderRows() {
    const {tableData} = this.state;
    return (
      <Table.Body>
        {
          tableData.map((snapshot, index_snapshot) => {
            return (
              <Table.Row key={index_snapshot}>
                <Table.Cell>
                    {snapshot['camera_name']}
                </Table.Cell>
                <Table.Cell>
                  {snapshot['longitude']}
                </Table.Cell>
                <Table.Cell>
                  {snapshot['latitude']}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={<Button icon='linkify' content='Show' />}
                    content={<a href={snapshot['image']} target='_blank'>{snapshot['image']}</a>}
                    on='click'
                  />
                </Table.Cell>
                <Table.Cell>
                  <p>
                    <Moment
                      format="dddd, MMMM Do YYYY h:mm:ss a"
                      date={snapshot['uploaded_at']}
                    />
                  </p>
                </Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    )
  }

  render() {
    return (
      <div id="home">
        <h1> ShotSpot </h1>
        {this.renderTable()}
        <Footer/>
      </div>
    )
  }
}

export default Home;
