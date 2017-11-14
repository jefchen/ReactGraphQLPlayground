import React from 'react'
import _ from 'lodash'
import './LixCell.scss'
import ExperimentCell from './ExperimentCell'

const LixCell = ({test}) => {
  console.log('rendering LixCell')
  const experimentsForTest = test.experiments
  const haveExperiments = experimentsForTest && experimentsForTest instanceof Array && experimentsForTest.length > 0
  const isFullyRamped = test.fullyRamped

  return (
    <div className="row lix-cell">
      {/* render test description */}
      <div className="col-md-5">
        <p style={{textAlign: 'left'}}>
          <a href={`https://lix.corp.linkedin.com/PROD/tests/${test.id}`}><b>{test.testKey}</b></a>
          <br/>
          {test.description}
          <br/>
          {test.owners}
          <br/>
          <span className="lix-cell_fully-ramped">{isFullyRamped ? 'Fully ramped' : ''}</span>
          </p>
      </div>

      {/* render experiments */}
      <div className="col-md-7">
        <div>
          {
            haveExperiments && (
              _.map(experimentsForTest, (experiment, i) => (
                <div key={i} className="lix-cell_experiment-cell-container">
                  <ExperimentCell experiment={experiment}/>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

LixCell.propTypes = {
  test: React.PropTypes.object.isRequired,
}

export default LixCell
