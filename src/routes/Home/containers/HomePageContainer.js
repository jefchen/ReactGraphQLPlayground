import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import LixCell from '../components/LixCell/LixCell'
import async from 'async'
import _ from 'lodash'
import moment from 'moment'
import { actions } from '../../../modules/search'

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      filterRamp: {
        fullyRampedOnly: false,
        rampingOnly: true,
        all: false
      },
      filterDateRange: {
        oneDay: false,
        oneWeek: false,
        all: true
      }
    }
  }

  // Dispatches *searchMediaAction*  immediately after initial rendering
  componentDidMount() {
    this.props.dispatch(actions.performSearch('voyager.mynetwork.android'))
  }

  onChangeRampFilter(filterType) {
    let newFilter = {
      fullyRampedOnly: false,
      rampingOnly: false,
      all: false,
    }
    newFilter[filterType] = true
    this.setState({filterRamp: newFilter})
  }

  onChangeDateRangeFilter(filterType) {
    let newFilter = {
      oneDay: false,
      oneWeek: false,
      all: false,
    }
    newFilter[filterType] = true
    this.setState({filterDateRange: newFilter})
  }

  render() {
    console.log('rendering')
    return (
      <div>
        {/* Filters */}
        <div className="row">
          {/* Filters by ramp status */}
          <div className="col-md-12">
              <div className="btn-group">
              <button type="button" className={`btn btn-secondary ${this.state.filterRamp.fullyRampedOnly?'active':''}`} onClick={this.onChangeRampFilter.bind(this, 'fullyRampedOnly')}>Fully ramped</button>
              <button type="button" className={`btn btn-secondary ${this.state.filterRamp.rampingOnly?'active':''}`} onClick={this.onChangeRampFilter.bind(this, 'rampingOnly')}>Ramping</button>
              <button type="button" className={`btn btn-secondary ${this.state.filterRamp.all?'active':''}`} onClick={this.onChangeRampFilter.bind(this, 'all')}>All</button>
              </div>

              &nbsp;&nbsp;

              {/* Filters by date range */}
              <div className="btn-group">
                <button type="button" className={`btn btn-secondary ${this.state.filterDateRange.oneDay?'active':''}`} onClick={this.onChangeDateRangeFilter.bind(this, 'oneDay')}>Within today</button>
                <button type="button" className={`btn btn-secondary ${this.state.filterDateRange.oneWeek?'active':''}`} onClick={this.onChangeDateRangeFilter.bind(this, 'oneWeek')}>Within week</button>
                <button type="button" className={`btn btn-secondary ${this.state.filterDateRange.all?'active':''}`} onClick={this.onChangeDateRangeFilter.bind(this, 'all')}>All</button>
              </div>
          </div>
        </div>

        {/* The individual lix cells */}
        {this.props.tests.map((test, i) => {
          // filter ramp status
          if (this.state.filterRamp.fullyRampedOnly && !test.fullyRamped) {
            return '';
          }
          if (this.state.filterRamp.rampingOnly && test.fullyRamped) {
            return '';
          }

          // filter last modification date
          let dateRange = Number.MAX_SAFE_INTEGER
          if (this.state.filterDateRange.oneDay) {
            dateRange = 1
          } else if (this.state.filterDateRange.oneWeek) {
            dateRange = 7
          }
          const dateRangeDiff = moment().diff(moment(test.modificationDate), 'days')
          if (dateRangeDiff > dateRange) {
            return
          }

          return <LixCell test={test} key={i} />
        })}
      </div>
    )
  }
}

// Define PropTypes
HomePage.propTypes = {
  tests: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({search}) => ({
  tests: search.tests
})

export default connect(mapStateToProps)(HomePage)
