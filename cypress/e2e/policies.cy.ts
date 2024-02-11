describe('Policies page', () => {
    const id = '1YK15JGO';


    beforeEach(() => {
        cy.visit(`/policies/${id}`)
    })
    
    it('Should have the correct policies information', () => {
        const policies = {
            "noShowPolicies":[
                {
                    id:"LYJJN1Y5",
                    name:"No-show",
                    description:"In case of a no-show, 100% of your stay will be charged.",
                    amount:100,
                    chargeType:"percentage"
                }
            ],
            "cancellationPolicies":[
                {
                  id:"NGOPXP8D",
                  name:"Flexible",
                  description:"Free cancellation until 36 hours before arrival.",
                  amount:100,
                  chargeType:"percentage",
                  reference:"prior-to-arrival",
                  days:1,
                  hours:14
                }
            ]
        }

        cy.contains('Policies').should('exist');
        cy.contains('No Show Policies').should('exist');
        cy.contains('Cancellation Policies').should('exist');

        //Check for no show policies
        policies.noShowPolicies.map((policy) => {
            cy.get('.policies').contains('.policy', policy.name).should('exist');
            cy.get('.policies').contains('.policy', policy.description).should('exist');
            cy.get('.policies').contains('.policy', `£${policy.amount}`).should('exist');
        })

        //Check for cancellation policies
        cy.contains('Cancellation Policies').should('exist');
        policies.cancellationPolicies.map((policy) => {
            cy.get('.policies').contains('.policy', policy.name).should('exist');
            cy.get('.policies').contains('.policy', policy.description).should('exist');
            cy.get('.policies').contains('.policy', `£${policy.amount}`).should('exist');
        })

    })

    it('Should edit the policy and save the changes', () => {
        cy.get(`[data-test="edit-button"]`).click();
        const newName = 'negotiable'

        cy.get('.edit-policy').first().find('input[type="text"]').should('have.value', 'No-show');
        //Changing the policy name and saving it
        cy.get('.edit-policy').first().find('input[type="text"]').clear().type(newName);
        cy.get(`[data-test="save-button"]`).click();
        cy.get('.policies').contains('.policy', newName).should('exist');
        
    })

    it('Should not change the policy if the editing is cancelled', () => {
        cy.get(`[data-test="edit-button"]`).click();
        const newName = 'Changed title';
        cy.get('.edit-policy').first().find('input[type="text"]').should('have.value', 'No-show');
        cy.get('.edit-policy').first().find('input[type="text"]').clear().type(newName);
        cy.get(`[data-test="cancel-button"]`).click();
        cy.get('.policies').contains('.policy', newName).should('not.exist');
    })
})