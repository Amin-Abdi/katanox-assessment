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
        // console.log('pol', policies);
        return policies})
      .catch((error) => []
    )
}

export const updatePolicies = async (updatedPolicies) => {
  
  const newData = JSON.parse(JSON.stringify(data.data));
  const propertyIndex = newData.findIndex((property) => property.property.id === updatedPolicies.noShowPolicies[0].propertyId);

  if (propertyIndex !== -1) {
    newData[propertyIndex].policies.noShowPolicies = updatedPolicies.noShowPolicies;
    newData[propertyIndex].policies.cancellationPolicies = updatedPolicies.cancellationPolicies;
  }

  data.data = newData;

  return updatedPolicies;
};

