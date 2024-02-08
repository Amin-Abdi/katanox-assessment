import React from "react";
import { Policy, PolicyForm } from "../../Pages/property.types";

type Props = {
    policy: Policy;
    policyName: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, type: keyof PolicyForm, policyId: string) => void; 
}

export const EditPolicyForm: React.FC<Props> = ({policy, policyName, handleChange}) => {
    return (
        <div style={{marginBottom: "1rem"}}>
            <div className="edit-policy">
                 <label htmlFor={`${policyName}_name_${policy.id}`}>Name:</label>
                 <input
                    type="text"
                    id={`noshow_name_${policy.id}`}
                    value={policy.name}
                    onChange={(event) => handleChange(event, 'name', policy.id)}
                    />
            </div>
            <div className="edit-policy">
                <label htmlFor={`${policyName}_description_${policy.id}`}>Description:</label>
                <input
                    type="text"
                    id={`${policyName}_description_${policy.id}`}
                    value={policy.description}
                    onChange={(event) => handleChange(event, 'description', policy.id)}
                />
            </div>
            <div className="edit-policy">
                <label htmlFor={`${policyName}_amount_${policy.id}`}>Amount:</label>
                 <input
                    type="number"
                    id={`${policyName}_amount_${policy.id}`}
                    value={policy.amount}
                    onChange={(event) => handleChange(event, 'amount', policy.id)}
                />
            </div>
        </div>
    )
}