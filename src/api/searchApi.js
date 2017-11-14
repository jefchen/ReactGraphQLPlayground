import async from 'async'
import {searchTestsByTestKey, searchExperimentsByTestId, isFullyRamped} from './api'

export async function fetchTestWithExperimentsByTestKey(testKey) {
  // fetch data and update UI
  let tests = await searchTestsByTestKey(testKey)
  tests = await fetchExperiments(tests)
  tests = await fetchFullyRamped(tests)
  return tests
}

function fetchExperiments(tests) {
  return new Promise((resolve, reject) => {
    console.log('fetching experiments')
    const fetchExperiments = _.map(tests, (test) => {
      return (callback) => {
        searchExperimentsByTestId(test.id)
          .then(results => {
            console.log('fetch experiments success')
            test.experiments = results;
            callback(null, results)
          }).catch(err => {
            console.log('fetch experiments failed')
            console.log(err)
            callback(null, [])
          })
      }
    })
    async.parallel(fetchExperiments, (err, results) => {
      if (err) {
        console.log('error in one of fetch experiments request')
        console.log(err)
      }
      resolve(tests)
    })
  })
}

function fetchFullyRamped(tests) {
  return new Promise((resolve, reject) => {
    console.log('fetching fetchFullyRamped')
    const fetchfullyRamped = _.map(tests, (test) => {
      return (callback) => {
        isFullyRamped(test.testKey)
          .then(results => {
            console.log('fetch experiments success')
            test.fullyRamped = results;
            callback(null, results)
          }).catch(err => {
            if (err) {
              console.log('fetch experiments failed')
              console.log(err)
            }
            callback(null, false)
          })
      }
    })
    async.parallel(fetchfullyRamped, (err, results) => {
      console.log('error in one of fullyRamped request')
      console.log(err)
      resolve(tests)
    })
  })
}
