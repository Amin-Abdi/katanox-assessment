import { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPolicies, updatePolicies } from "../Store/property/actions";
import { getPoliciesSelector } from "../Store/property/selectors";
import { useNavigate, useParams } from 'react-router-dom'
import { PropertyPolicy, PolicyForm } from "./property.types";
import { PolicyDisplay } from "../Components/Policies/PolicyDisplay";
import { EditPolicyForm } from "../Components/Policies/EditPolicyForm";
import '../styles/Policies.css';

export const PoliciesPage = () => {
    const dispatch = useDispatch();
    const policies = useSelector(getPoliciesSelector);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { propertyId } = useParams();
    const propertyPolicies = propertyId ? policies?.[propertyId] : null;  
    const [editedPolicies, setEditedPolicies] = useState<PropertyPolicy | null>(null);
    
    useEffect(() => {
        dispatch(getPolicies());
    }, [dispatch]);

    useEffect(() => {
        if (propertyPolicies) {
            setEditedPolicies(propertyPolicies);
        }
    }, [propertyPolicies]);

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
                updatedPolicies.cancellationPolicies = updatedPolicies.cancellationPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, name: event.target.value } : policy
                );
            } else if (type === 'description') {
                updatedPolicies.noShowPolicies = updatedPolicies.noShowPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, description: event.target.value } : policy
                );
                updatedPolicies.cancellationPolicies = updatedPolicies.cancellationPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, description: event.target.value } : policy
                );
            } else if (type === 'amount') {
                updatedPolicies.noShowPolicies = updatedPolicies.noShowPolicies.map(policy =>
                    policy.id === policyId ? { ...policy, amount: Number(event.target.value) } : policy
                );
                updatedPolicies.cancellationPolicies = updatedPolicies.cancellationPolicies.map(policy =>
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
        dispatch(updatePolicies({...editedPolicies, propertyId: propertyId}));
        setIsEditing(false);
    };


    return (
    <div style={{ width: "80%", margin: "auto" }}>
        <div className="policy-page">
            <div className="navigation" style={{marginTop: "2rem"}}>
                <h1 style={{marginTop: '1rem', fontSize: "28px"}}>Policies</h1>
                <Button onClick={()=>{navigate(`/property/${propertyId}`)}}>Back to property</Button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <div className="policies">
                    <h2>No Show Policies</h2>
                    {editedPolicies?.noShowPolicies.map((policy) => (
                        <div key={policy.id}>
                            {isEditing ? (
                                    <EditPolicyForm policy={policy} policyName='no_show' handleChange={handleChange}/>
                                ) : (
                                    <PolicyDisplay policy={policy}/>
                                )}    
                        </div>
                    ))}
                </div>
                <div className="policies">
                    <h2>Cancellation Policies</h2>
                    {editedPolicies?.cancellationPolicies.map((policy) => (
                        <div key={policy.id}>   
                            {isEditing ? (
                                <EditPolicyForm policy={policy} policyName="cancellation" handleChange={handleChange}/>
                            ) : (
                                <PolicyDisplay policy={policy}/>
                            )}
                        </div>
                    ))}
                </div>
                {isEditing && <Button type="primary" htmlType="submit">Save</Button>}
            </form>
            <Button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit Policies'}</Button>
        </div>
    </div>
)
};