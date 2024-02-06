import { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPolicies, updatePolicies } from "../Store/property/actions";
import { getPoliciesSelector } from "../Store/property/selectors";
import { useNavigate, useParams } from 'react-router-dom'
import { PropertyPolicy, PolicyForm } from "./property.types";


const filterPoliciesByPropertyId = (
    data: (PropertyPolicy | undefined)[],  // Allow for undefined properties
    targetPropertyId: string
  ): PropertyPolicy => {
    return data.reduce<PropertyPolicy>((filteredPolicies, property) => {
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
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { propertyId } = useParams();    

    const [editedPolicies, setEditedPolicies] = useState<PropertyPolicy | null>(null);
    
    useEffect(() => {
        dispatch(getPolicies());
    }, [dispatch]);

    useEffect(() => {
        const filteredPolicies = filterPoliciesByPropertyId(policies, propertyId as string);
        // console.log(filteredPolicies)
        setEditedPolicies(filteredPolicies);
    }, [policies, propertyId]); 

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: keyof PolicyForm, policyId: string) => {
        if (editedPolicies) {
            const updatedPolicies = { ...editedPolicies };
            if (type === 'name') {
                updatedPolicies.noShowPolicies = updatedPolicies.noShowPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, name: event.target.value } : policy
                );
            } else if (type === 'description') {
                updatedPolicies.noShowPolicies = updatedPolicies.noShowPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, description: event.target.value } : policy
                );
            } else if (type === 'amount') {
                updatedPolicies.noShowPolicies = updatedPolicies.noShowPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, amount: Number(event.target.value) } : policy
                );
            }
            setEditedPolicies(updatedPolicies);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted values:", editedPolicies);
        // Dispatch action to update policies
        dispatch(updatePolicies(editedPolicies));
        setIsEditing(false);
    };


    return (
        <div style={centerStyle}>
        <div>
            <h1>Policies</h1>
            <Button onClick={()=>{navigate(`/property/${propertyId}`)}}>See property policies</Button>
            <form onSubmit={handleSubmit}>
                <h2>No Show Policies</h2>
                {editedPolicies?.noShowPolicies.map((policy) => (
                    <div key={policy.id}>
                        {isEditing ? (
                                <div style={rowStyle}>
                                    <input
                                        type="text"
                                        value={policy.name}
                                        onChange={(event) => handleChange(event, 'name', policy.id)}
                                    />
                                    <input
                                        type="text"
                                        value={policy.description}
                                        onChange={(event) => handleChange(event, 'description', policy.id)}
                                    />
                                    <input
                                        type="number"
                                        value={policy.amount}
                                        onChange={(event) => handleChange(event, 'amount', policy.id)}
                                    />
                                </div>
                            ) : (
                                <div key={policy.id}>
                                    <p>Name: {policy.name}</p>
                                    <p>Description: {policy.description}</p>
                                    <p>Amount: {policy.amount}</p>
                                </div>
                            )}
                            
                    </div>
                ))}
                <h2>Cancellation Policies</h2>
                {editedPolicies?.cancellationPolicies.map((policy) => (
                    <div key={policy.id}>   
                        {isEditing ? (
                            <div style={rowStyle}>
                                <input
                                    type="text"
                                    value={policy.name}
                                    onChange={(event) => handleChange(event, 'name', policy.id)}
                                />
                                <input
                                    type="text"
                                    value={policy.description}
                                    onChange={(event) => handleChange(event, 'description', policy.id)}
                                />
                                <input
                                    type="number"
                                    value={policy.amount}
                                    onChange={(event) => handleChange(event, 'amount', policy.id)}
                                />   
                            </div>
                        ) : (
                            <div key={policy.id}>
                                <p>Name: {policy.name}</p>
                                <p>Description: {policy.description}</p>
                                <p>Amount: {policy.amount}</p>
                            </div>
                        )}
                    </div>
                ))}
                {isEditing && <button type="submit">Save</button>}
            </form>
        </div>
        <button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
    </div>
)
};


const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-around",
    margin: "13px 3px",
    borderRadius: "9px",
};