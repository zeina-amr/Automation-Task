class SearchProduct {

    SearchBox(){
        return cy.get('.search-keyword')
    }


    EnterProduct(Product){
        this.SearchBox().type(Product)
    }


    productName(){
        return cy.get('.product-name')
    }


    products(){
        return cy.get('.product')
    }

    addProduct(productName){
        cy.contains('.product-name', productName)
        .parents('.product')
        .find('.product-action button')
        .click()
    }


    cartIcon(){
        return cy.get('.cart-icon')
    }

    openCart(){
        this.cartIcon().click()
    }

    proceedToCheckout(){
        return cy.contains('button', 'PROCEED TO CHECKOUT')
    }

    cartProductName(){
        return cy.get('.cart-preview .product-name')
    }

    cartProductQuantity(){
        return cy.get('.cart-preview .quantity')
    }


    increaseQuantity(productName, quantity){
        for(let  i = 1; i < quantity; i ++ ){
            cy.contains('.product-name',productName)
              .parents('.product')
              .find('.increment')
              .click()
        }
    }


    productQuantity(productName){
        return cy.contains('.product-name', productName)
                 .parents('.products')
                 .find('.quantity')
    }

    checkoutTable(){
        return cy.get('#productCartTables')
    }


    placeOrder(){
        return cy.contains('button', 'Place Order')
    }

    countryDropdown(){
        return cy.get('Select')
    }

    agreeCheckbox(){
        return cy.get('.chkAgree')
    }

    proceedButton(){
        return cy.contains('button', 'Proceed')
    }

}

export default SearchProduct