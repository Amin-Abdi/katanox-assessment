import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicies } from "../Store/property/actions";
import { getPoliciesSelector } from "../Store/property/selectors";
import { useParams } from 'react-router-dom'

interface Policy {
    id: string;
    vendorPolicyId: string | null;
    name: string;
    description: string;
    propertyId: string;
    amount: number;
    hashedId: string;
    chargeType: string;
    createdAt: string;
    updatedAt: string;
    days?: number;
    hours?: number;
}
  
interface PropertyData {
    noShowPolicies: Policy[];
    cancellationPolicies: Policy[];
}

interface FilteredPolicies {
    noShowPolicies: Policy[];
    cancellationPolicies: Policy[];
  }
  
const filterPoliciesByPropertyId = (
    data: (PropertyData | undefined)[],  // Allow for undefined properties
    targetPropertyId: string
  ): FilteredPolicies => {
    return data.reduce<FilteredPolicies>((filteredPolicies, property) => {
      if (property && property.noShowPolicies && property.cancellationPolicies) {
        const noShowPolicies = property.noShowPolicies.filter(
          (policy) => policy.propertyId === targetPropertyId
        );
        const cancellationPolicies = property.cancellationPolicies.filter(
          (policy) => policy.propertyId === targetPropertyId
        );
  
        return {
          noShowPolicies: [...filteredPolicies.noShowPolicies, ...noShowPolicies],
          cancellationPolicies: [
            ...filteredPolicies.cancellationPolicies,
            ...cancellationPolicies,
          ],
        };
      } else {
        return filteredPolicies;
      }
    }, { noShowPolicies: [], cancellationPolicies: [] });
  };

export const PoliciesPage = () => {
    const dispatch = useDispatch();
    const policies = useSelector(getPoliciesSelector);
    const { propertyId } = useParams();
    // console.log(propertyId);
    console.log(policies);

    const filtered = filterPoliciesByPropertyId(policies, propertyId as string);
    console.log('Filtered');
    console.log(filtered);

    // console.log(propertyId);

    useEffect(() => {
        dispatch(getPolicies());
    }, [dispatch]);

    return (
        <div>this is the policies page</div>
    )
}