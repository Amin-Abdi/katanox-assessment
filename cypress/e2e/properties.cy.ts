describe('Properties Page', () => {
    it('should visit', () => {
        const propertyId = '1YK15JGO';
        cy.visit('/');
        cy.contains(/Properties/i).should('be.visible');
        cy.get('th').eq(0).should('contain.text', 'Id');
        cy.get('th').eq(1).should('contain.text', 'Name');
        cy.get('th').eq(2).should('contain.text', 'Actions');

        //Check appropriate values for properties table.
        cy.get('.ant-table-tbody').find('tr').eq(0).within(() => {
            cy.get('td').eq(0).should('contain.text', '1YK15JGO');
            cy.get('td').eq(1).should('contain.text', 'Hotel Amsterdam');
          });

        //Check proper navigation is done.
        cy.get(`[data-test="navigate-button-${propertyId}"]`).click();
        cy.url().should('include', `/property/${propertyId}`)

    })
})