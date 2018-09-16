import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Button, Popup, Table, Pagination, Icon} from 'semantic-ui-react';
import Moment from 'react-moment';
import settings from '../../config/settings';


class SnapshotsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allTableData: [],
      tableData: [],
      selectedColumn: null,
      sortOrder: null,
      perPage: 10,
      activatePage: 1
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
      let allTableData = data.map((snapshot) => {
        let row = {};
        row['camera_name'] = snapshot['camera']['name']
        // row['longitude'] = snapshot['camera']['longitude']
        // row['latitude'] = snapshot['camera']['latitude']
        row['geolocation'] = `${snapshot['camera']['longitude']},${snapshot['camera']['latitude']}`
        row['image'] = snapshot['image']
        row['uploaded_at'] = snapshot['uploaded_at']
        row['safety_status'] = snapshot['safety_status']
        return row
      })
      this.setState({
        data,
        allTableData,
      })
      this.updatePagination(0, this.state.perPage);
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

  updatePagination(start, end) {
    let { allTableData } = this.state;
    let tableData = allTableData.slice(start, end);
    this.setState({tableData: tableData});
  }

  handlePaginationChange(e, {activePage}) {
    let { perPage } = this.state;
    let start = (activePage  - 1) * perPage; // Include
    let end = start + perPage; // Exclude
    this.setState({activePage})
    this.updatePagination(start, end);
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
      // 'Longitude': 'longitude',
      // 'Latitude': 'latitude',
      'Geolocation': 'geolocation',
      'Image': 'image',
      'Uploaded at': 'uploaded_at',
      'Safety': 'safety_status'
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
            console.log(snapshot['safety_status'] === true)
            return (
              <Table.Row key={index_snapshot}>
                <Table.Cell>
                    {snapshot['camera_name']}
                </Table.Cell>
                {/* <Table.Cell>
                  {snapshot['longitude']}
                </Table.Cell>
                <Table.Cell>
                  {snapshot['latitude']}
                </Table.Cell> */}
                <Table.Cell>
                  <i className="map marker alternate icon blue"/>
                  <a href={`https://www.google.com/maps/search/42.358389,-71.096712/${snapshot['geolocation']}`} target='_blank'>{snapshot['geolocation']}</a>
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
                <Table.Cell>
                  <i className={snapshot['safety_status'] === true? "check circle green big icon": "exclamation triangle red big icon"}/>
                </Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    )
  }

  render() {
    const {activePage} = this.state;
    return (
      <div>
        <h1>
          <i className="exclamation circle icon red"/>
          Shot Spot
        </h1>
        {this.renderTable()}
        <Pagination
          activePage={activePage}
          onPageChange={(e, page) => this.handlePaginationChange(e, page)}
          totalPages={Math.ceil(this.state.allTableData.length / this.state.perPage)}
        />
      </div>
    )
  }
}

export default SnapshotsTable;

