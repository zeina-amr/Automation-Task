Feature: Search Product

Scenario: Search for a product
         
         Given user is on products page
         When  user searches for Brocolli
         Then  only Broccoli should be displayed
         When  user clears search field
         Then  product should be displayed


Scenario: Add one product to the cart

        Given user is on products page
        When  user adds Brocolli to the cart
        And   user opens the cart
        Then  Brocolli should be displayed in the cart
        And   products quantity should be 1  


Scenario: Add multiple products in the cart

         Given user is on products page
         When  user adds multiple products in the cart
         Then  user opens the cart
         And   all products should be displayed in the cart


Scenario: Increase product quantity before adding to the cart
        
         Given user is on products page
         When  user searches for Brocolli
         And   user increases the quantity to 3 
         Then  user clicks ADD TO CART 
         And   products quantity should be 3