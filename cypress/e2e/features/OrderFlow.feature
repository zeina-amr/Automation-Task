Feature: Order Flow 

Scenario: Flow of a complete order
        
        #Cart
        Given user is on GreenKart products page
        When  user adds products to the cart
        And   user opens the cart
        Then  all selected products should be displayed in the cart
        And   all selected products should have the correct quantity

        #Checkout
        When  user proceeds to checkout page
        Then  checkout should be displayed 
        And   checkout table should contain the selected products
        And   cart total should be calculated correctly

        #Promo Code
        When  user applies promo code 
        Then  discount should be applied
        And   discounted amount should be less than the original total

        #Order
        When  user proceeds with placing the order
        And   user selects the country
        And   user agrees to terms & conditions 
        When   user clicks on proceed button
        Then  success message should be displayed for the user



