const BASE_URL_V2 = 'https://lix.corp.linkedin.com/api/v2';
const BASE_URL_V2_PROD = 'https://lix.corp.linkedin.com/api/v2/prod';
const BASE_URL_V1_PROD = 'https://lix.corp.linkedin.com/api/v1/prod';

/**
  Search lix by testKey
**/
export const searchTestsByTestKey = (testKey) => {
  if (!testKey) {
    return new Promise((resolve, reject) => {
      reject(`cannot search lix with empty testKey`)
    })
  }

  let url = `${BASE_URL_V2_PROD}/tests?testKey=${testKey}`
  return fetch(url)
    .then(response => {
      return response.json();
    })
}

/**
  Search lix by owners
**/
export const searchTestsByOwners = (owners) => {
  if (!owners || owners.length <= 0) {
    return new Promise((resolve, reject) => {
      reject(`Cannot search lix with empty owners`)
    })
  }

  let url = `${BASE_URL_V2_PROD}/tests?`
  owners.forEach((owner, i) => {
    url += 'owners=' + user
    if (i < users.length - 1) {
      url += '&'
    }
  })

  return fetch(url)
    .then(response => {
      return response.json();
    })
};

/**
  Search experiments by testKey
**/
export const searchExperimentsByTestKey = (testKey) => {
  if (!testKey) {
    return new Promise((resolve, reject) => {
      reject(`cannot search experiments with empty testKey`)
    })
  }

  let url = `${BASE_URL_V2_PROD}/tests/key/${testKey}/experiments`
  return fetch(url)
    .then(response => {
      return response.json();
    })
}

/**
  Search experiments by testKey
**/
export const searchExperimentsByTestId = (testId) => {
  if (!testId) {
    return new Promise((resolve, reject) => {
      reject(`cannot search experiments with empty testId`)
    })
  }

  let url = `${BASE_URL_V2_PROD}/tests/id/${testId}/experiments`
  return fetch(url)
    .then(response => {
      return response.json();
    })
}

/**
  Check experiment if fully ramped
**/
export const isFullyRamped = (testKey) => {
  if (!testKey) {
    return new Promise((resolve, reject) => {
      reject(`cannot check if fully ramped with empty testKey`)
    })
  }

  let url = `${BASE_URL_V2}/ramps/fullyRamped/prod/${testKey}`
  return fetch(url)
    .then(response => {
      return response.json();
    })
}
