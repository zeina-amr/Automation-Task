import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import SearchProduct from '../../e2e/pages/SearchProduct';

let testData
before( () => {
    cy.fixture('greenKartProducts').then((data) =>{
        testData = data
    })
})

const searchProduct = new SearchProduct()


// ==========================================================================
//                                   CART 
// ==========================================================================

Given('user is on GreenKart products page', ()=> {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
})


When('user adds products to the cart', ()=> {

    testData.products.forEach((product) => {
        cy.addProductToCart(
            product.name,
            product.quantity
        )
    })
})

Then('user open the cart', ()=> {
    searchProduct.openCart()
})

Then('all selected products should be displayed in the cart', ()=> {

    testData.products.forEach((product) => {
        cy.validateProductInCart(
            product.name
        )
    })
})

Then('all selected products should have the correct quantity', ()=> {
    testData.products.forEach((product) =>{
        cy.validateProductQuantity(
            product.name,
            product.quantity
        )
    })
})



// ==========================================================================
//                                 CHECKOUT
// ==========================================================================

Then('user proceeds to checkout page', ()=> {
    searchProduct.proceedToCheckout().click()
})


Then('checkout should be displayed', ()=> {
    searchProduct.checkoutTable().should('be.visible')
})


Then('checkout table should contain the selected products', ()=> {
    testData.products.forEach((product) =>{
        cy.validateCheckoutProduct(
            product.name,
            product.quantity
        )
    })

})


Then('cart total should be calculated correctly', ()=> {
   cy.validateCartTotal()
})


// ==========================================================================
//                                 PROMO CODE 
// ==========================================================================

When('user applies promo code', ()=> {
   cy.applyPromoCode(testData.promoCode)
})


Then('discount should be applied', ()=>{
    cy.get('.promoInfo')
      .should('contain', 'Code applied ..!')
})


Then('discounted amount should be less than the original total', ()=> {
    cy.validateDiscountedAmount()

})


// ==========================================================================
//                                 ORDER
// ==========================================================================

When('user proceeds with placing the order', ()=> {
    searchProduct.placeOrder().click()
})


Then('user selects the country', ()=> {
    cy.selectCountry(testData.country)
})


Then('user agrees to terms & conditions', ()=> {
    searchProduct. agreeCheckbox().check()
})


When('user clicks on proceed button', ()=> {
    searchProduct.proceedButton().click()
})


Then('success message should be displayed for the user', ()=> {
    cy.contains('Thank you, your order has been placed successfully').should('be.visible')
})