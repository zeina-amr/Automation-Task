import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import SearchProduct from '../../e2e/pages/SearchProduct';

let testData
before( () => {
    cy.fixture('greenKartProducts').then((data) =>{
        testData = data
    })
})

const searchProduct = new SearchProduct()



Given('user is on products page', ()=> {

    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

})


When('user searches for Brocolli', ()=> {

    searchProduct.EnterProduct('Brocolli');

})


Then('only Broccoli should be displayed', ()=> {
    searchProduct.productName().should('contain', 'Brocolli')

})


When('user clears search field', ()=> {
    searchProduct.SearchBox().clear()

})


Then('product should be displayed', ()=> {
    searchProduct.products().should('have.length.greaterThan', 1)

})


When('user adds Brocolli to the cart', ()=>{
    searchProduct.addProduct('Brocolli')
})


When('user opens the cart', ()=> {
    searchProduct.openCart()

})


Then('Brocolli should be displayed in the cart', ()=> {
    searchProduct.cartProductName().should('contain', 'Brocolli - 1 Kg')

})


When('products quantity should be 1', ()=> {
    searchProduct.cartProductQuantity().should('contain', '1 No.')

})

When('user adds multiple products in the cart', ()=> {
    searchProduct.addProduct('Brocolli')
    searchProduct.addProduct('Cauliflower')
    searchProduct.addProduct('Cucumber')
})

Then('all products should be displayed in the cart', ()=> {
    searchProduct.cartProductName().should('contain.text','Brocolli')
    searchProduct.cartProductName().should('contain.text','Cauliflower')
    searchProduct.cartProductName().should('contain.text','Cucumber')
})


Then('user increases the quantity to 3', ()=> {
    searchProduct.increaseQuantity('Brocolli', 3)

})


Then('user clicks ADD TO CART', ()=> {
    searchProduct.addProduct('Brocolli')
}) 


Then('products quantity should be 3', ()=> {
    searchProduct.cartProductQuantity().should('contain', '3')
})


Then('user proceeds to checkout', ()=> {
    searchProduct.proceedToCheckout().click()
})


Then('checkout page should be displayed', ()=> {
    searchProduct.checkoutTable().should('be.visible')
})

Then('selected products should be displayed in checkout table', ()=> {
    searchProduct.checkoutTable().should('contain', 'Brocolli')
    searchProduct.checkoutTable().should('contain', 'Cauliflower')
    searchProduct.checkoutTable().should('contain', 'Cucumber')
})


Then('user places the order', ()=> {
    searchProduct.placeOrder().click()
})


Then('user selects country Egypt', ()=>{
    searchProduct.countryDropdown().select('Egypt')
})


Then('user accepts terms & conditions',()=>{
    searchProduct.agreeCheckbox().check()
})


Then('user proceeds with the order', ()=> {
    searchProduct.proceedButton().click()
})


Then('success message should be displayed', ()=> {
    cy.contains('Thank you, your order has been placed successfully').should('be.visible')
})
