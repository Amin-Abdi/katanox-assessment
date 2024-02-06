import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPolicies } from "../Store/property/actions";
import { getPoliciesSelector } from "../Store/property/selectors";
import { useParams } from 'react-router-dom'
import { PropertyPolicy } from "./property.types";

interface PolicyForm {
    id: string;
    name: string;
    description: string;
    amount: number;
}

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
    // const [form] = Form.useForm();
    const { propertyId } = useParams();

    const [editedPolicies, setEditedPolicies] = useState<PropertyPolicy | null>(null);
    // const filtered = filterPoliciesByPropertyId(policies, propertyId as string);
    // console.log(filtered);
    
    useEffect(() => {
        dispatch(getPolicies());
    }, [dispatch]);

    useEffect(() => {
        const filteredPolicies = filterPoliciesByPropertyId(policies, propertyId as string);
        console.log(filteredPolicies)
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
        // Logic to save the edited policies
        console.log("Submitted values:", editedPolicies);
        // Dispatch action to update policies
        // dispatch(updatePolicies(editedPolicies));
        // After saving, exit edit mode
        setIsEditing(false);
    };


    return (
        <div style={centerStyle}>
        <div>
            <h1>Policies</h1>
            <form onSubmit={handleSubmit}>
                <h3>No Show Policies</h3>
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
                {/* <h3>Cancellation Policies</h3>
                {editedPolicies?.cancellationPolicies.map((policy) => (
                    <div key={policy.id}>   
                        <div>
                            <input
                                type="text"
                                value={policy.name}
                                onChange={(event) => handleChange(event, 'name', policy.id)}
                            />
                        </div>
                        <div>
                        <input
                            type="text"
                            value={policy.description}
                            onChange={(event) => handleChange(event, 'description', policy.id)}
                        />
                        </div>
                        <div>
                        <input
                            type="number"
                            value={policy.amount}
                            onChange={(event) => handleChange(event, 'amount', policy.id)}
                        />
                        </div>   
                    </div>
                ))} */}
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