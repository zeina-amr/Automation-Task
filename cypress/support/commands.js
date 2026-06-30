//===================================================================================================================
//Custom Command #1: Add Product to Cart

import SearchProduct from "../e2e/pages/SearchProduct"

//===================================================================================================================
Cypress.Commands.add('addProductToCart', (productName, quantity) => {
      if (productName === 'Cucumber') {
         cy.pause()
         }
         
     for( let i = 1; i < quantity; i++) {
      cy.log(i, quantity)
          cy.contains('.product-name', productName)
            .parents('.product')
            .find('.increment')
            .click()
} 


    cy.contains('.product-name', productName)
      .parents('.product')
      .find('.product-action')
      .click()
})


//======================================================================================================================
//Custom Command #2: Validate all the products in the cart
//=======================================================================================================================
Cypress.Commands.add('validateProductInCart', (productName) => {
       cy.contains('.product-name', productName)
})


//==========================================================================================================================
//Custom Command #3: Validate the product's quantity in the cart
//===========================================================================================================================
Cypress.Commands.add('validateProductQuantity', (productName, quantity) => {
      const expectedQuantity = 
         quantity === 1
            ? '1 No.'
            : `${quantity} Nos.`
       
       cy.contains('.product-name', productName)
         .parents('.cart-item')
         .find('.product-total')
         .should('contain', expectedQuantity)

})


//==========================================================================================================================
//Custom Command #4: Calculate the expected total price inside the test & Compare it with the total displayed on the website
//===========================================================================================================================
Cypress.Commands.add('validateCheckoutProduct', (productName, quantity) =>{
  cy.contains('.product-name', productName)
    .parents('tr')
    .find('.amount')
    .eq(0)
    .invoke('text')
    .then((priceText) =>{
      const price = Number(priceText)
      const expectedTotal = price * quantity

      cy.contains('.product-name', productName)
        .parents('tr')
        .find('.amount')
        .eq(1)
        .invoke('text')
        .then((displayedTotalText) =>{
          const displayedTotal = Number(displayedTotalText)
          expect(expectedTotal).to.equal(displayedTotal)
        })

    })
  })


//=============================================================================================================================
//Custom Command #5: Validate the total price of the cart
//=============================================================================================================================
Cypress.Commands.add('validateCartTotal', ()=>{

  let calculatedTotal = 0

  cy.get('tbody tr').each(($row) =>{

    cy.wrap($row)
      .find('.amount')
      .eq(1)
      .invoke('text')
      .then((productTotalText) =>{
         
              const productTotal = Number(productTotalText)
              calculatedTotal += productTotal
      })

  })

  .then(() =>{
    cy.get('.totAmt')
      .invoke('text')
      .then((displayedTotalText) =>{
        const displayedTotal = Number(displayedTotalText)
        expect(calculatedTotal).to.equal(displayedTotal)
      })
  })

})


//=============================================================================================================================
//Custom Command #6: Apply Promo Code
//=============================================================================================================================

Cypress.Commands.add('applyPromoCode', (promoCode) =>{
  cy.get('.promoCode')
    .type(promoCode)
  
  cy.get('.promoBtn').click()

})


//=============================================================================================================================
//Custom Command #6: Validate Discounted Amount is less than Original Amount
//=============================================================================================================================

Cypress.Commands.add('validateDiscountedAmount', ()=> {
  cy.get('.totAmt')
    .invoke('text')
    .then((totalAmountText) =>{
      const totalAmount = Number(totalAmountText)

      cy.get('.discountAmt')
        .invoke('text')
        .then((discountedAmountText) =>{
          const discountedAmount = Number(discountedAmountText)

          expect(discountedAmount).to.be.lessThan(totalAmount)
        })
    })

})


//=============================================================================================================================
//Custom Command #7: Select Country
//=============================================================================================================================

Cypress.Commands.add('selectCountry', (countryName) =>{
  cy.get('select')
    .select(countryName)
})