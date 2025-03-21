describe('Property Page', () => {

    beforeEach(() => {
        cy.visit('/property/1YK15JGO');
    })

    it('should have the correct property information on the page', () => {
        const property = {
            id: '1YK15JGO',
            name: 'Hotel Amsterdam',
            starRating: 5,
            city: 'Amsterdam',
            country: 'Netherlands',
            addressLine1: 'Rokin 92',
        };

        const propertyDetails = [
            { label: 'ID', value: property.id },
            { label: 'Name', value: property.name },
            { label: 'Star Rating', value: property.starRating },
        ];

        const propertyAddress = [
            { label: 'City', value: property.city },
            { label: 'Country', value: property.country },
            { label: 'Street', value: property.addressLine1 },
          ];

        cy.contains('Property').should('be.visible');

        propertyDetails.forEach((detail) => {
            cy.get('.details-container')
              .contains('.property-details', `${detail.label}:`)
              .should('exist')
              .contains('.property-details', detail.value)
              .should('exist');
        });

        //Checking for the hotel address
        cy.get('.bubbleStyle').should('exist');

        propertyAddress.forEach((address) => {
            cy.get(`[data-test="address-${address.label.toLowerCase()}-label"]`).should('contain.text', address.label);
            cy.get(`[data-test="address-${address.label.toLowerCase()}-value"]`).should('contain.text', address.value);
        })

        cy.get('.policies-btn').click();
        cy.url().should('include', `/policies/${property.id}`);

    })

    it('Should have the correct amount of images', () => {
        //Should have 5 images associated with this property
        cy.get('.images-container').should('exist');
        cy.get('.images-container').find('.image-item').should('have.length', 5);

        //Check if modal pops up when image is clicked!
        cy.get('.image-item').first().click();
        cy.get('.ant-modal').should('be.visible');

        cy.get('.ant-modal-close-x').click();
        cy.wait(500);
        cy.get('.ant-modal').should('not.be.visible');
    })
})