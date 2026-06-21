import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import SearchProduct from '../../e2e/pages/SearchProduct';

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