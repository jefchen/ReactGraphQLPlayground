import React from 'react'
import moment from 'moment'
import './LixCell.scss'

const ExperimentCell = ({experiment}) => {
  const date = moment(experiment.activationDate).calendar()
  const active = experiment.state === 'ACTIVE'
  const className = `experiment-cell ${active?'active':''}`
  return (
    <div className={className}>
      <div>
          {date}<br/>
          {experiment.description}
      </div>
      <div>
      </div>
    </div>
  )
}

ExperimentCell.propTypes = {
  experiment: React.PropTypes.object.isRequired,
}

export default ExperimentCell
