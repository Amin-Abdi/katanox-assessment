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
        const policiesByProperty = {};
        data.data.forEach(propertyData => {
          // Extract property ID and policies
          const { property, policies } = propertyData;
          // Store policies by property ID
          policiesByProperty[property.id] = policies;
        });
        return policiesByProperty})
      .catch((error) => []
    )
}

export const updatePolicies = async (updatedPolicies) => {
  
  const newData = JSON.parse(JSON.stringify(data.data));
  const propertyIndex = newData.findIndex((property) => property.property.id === updatedPolicies.propertyId);

  if (propertyIndex !== -1) {
    //Update the policies
    newData[propertyIndex].policies.noShowPolicies = updatedPolicies.noShowPolicies;
    newData[propertyIndex].policies.cancellationPolicies = updatedPolicies.cancellationPolicies;
  }

  data.data = newData;

  return updatedPolicies;
};

