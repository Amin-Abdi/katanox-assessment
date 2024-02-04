import data from './../../data.json'

export const getProperties = async () => {
    return fetch('./data.json')
      .then(() => {
        const properties = data.data.map((property) => property.property)
        return properties})
      .catch((error) => []
      )
  };

