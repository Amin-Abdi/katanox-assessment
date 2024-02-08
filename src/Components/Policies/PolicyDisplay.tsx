import React from "react";
import { Policy } from "../../Pages/property.types";
import '../../styles/Policies.css'

type Props = {
    policy: Policy
}

export const PolicyDisplay: React.FC<Props> = ({policy}) => {
    return (
        <div key={policy.id} className="policy">
            <p style={{fontWeight: 'bold'}}>Name: {policy.name}</p>
            <p>Description: {policy.description}</p>
            <p>Amount: £{policy.amount}</p>
        </div>
    )
}