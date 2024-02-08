import React, { useState } from "react";
import { Policy, PolicyForm } from "../../Pages/property.types";

type Props = {
    policy: Policy;
    policyName: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, type: keyof PolicyForm, policyId: string) => void; 
}

export const EditPolicyForm: React.FC<Props> = ({policy, policyName, handleChange}) => {
    
    const [uniqueIds] = useState({
        name: `${policyName}_name_${Math.random().toString(36).substring(7)}`,
        description: `${policyName}_description_${Math.random().toString(36).substring(7)}`,
        amount: `${policyName}_amount_${Math.random().toString(36).substring(7)}`
    });
    
    return (
        <div style={{marginBottom: "1rem"}}>
            <div className="edit-policy">
                 <label htmlFor={uniqueIds.name}>Name:</label>
                 <input
                    type="text"
                    id={uniqueIds.name}
                    value={policy.name}
                    onChange={(event) => handleChange(event, 'name', policy.id)}
                    />
            </div>
            <div className="edit-policy">
                <label htmlFor={uniqueIds.description}>Description:</label>
                <input
                    type="text"
                    id={uniqueIds.description}
                    value={policy.description}
                    onChange={(event) => handleChange(event, 'description', policy.id)}
                />
            </div>
            <div className="edit-policy">
                <label htmlFor={uniqueIds.amount}>Amount:</label>
                 <input
                    type="number"
                    id={uniqueIds.amount}
                    value={policy.amount}
                    onChange={(event) => handleChange(event, 'amount', policy.id)}
                />
            </div>
        </div>
    )
};