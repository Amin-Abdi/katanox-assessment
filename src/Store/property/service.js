import data from './../../data.json'

export const getProperties = async () => {
    return fetch('./data.json')
      .then(() => {
        const properties = data.data.map((property) => property.property)
        return properties})
      .catch((error) => []
      )
  };

export const getPolicies = async () => {
  return fetch('./data.json')
      .then(() => {
        const policies = data.data.map((policy) => policy.policies);
        return policies})
      .catch((error) => []
    )
}

