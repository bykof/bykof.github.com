# Shopping Exercise

Online Shopping has a really heavy impact on all industries around the world.

Therefore we try it ourselves and implement a small Node.JS shop, but in offline mode.

Let's start!

## Add customer

Add a customer and ask for firstname, lastname, street, city, phone, email and then print out an incrementing customer number.

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
> 1
Firstname: Michael
Lastname: Tester
Street: Shoppingstreet 12
Postal Code: 123456
City: Shop
Phone: 0174 123 123
Email: tester@test.com
Customer #1 was added!
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
>
```

## Add Product

Add a product with a product number, name, and a product price in cent amount.
If you use a product number, which was already used, just overwrite it.

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
> 2
Number: s1
Name: Nintendo Switch
Price (in cents): 19999
Product #s1 was added!
```

### Errors

If the Price in cents is not an **integer**, let the customer enter an integer until it's correct:

```
Number: 1
Name: Switch
Price (in cents): asdf
Please reenter a correct price as cents.
Price (in cents):
```

## Add New Order

Create a new order and store the draft order in the current application until the user is able to save it with menu item `8`.

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
> 3
Please enter the customer number: 1
1
Order #1 was created
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
7: Add OrderItem
8: Save order
x: Exit
```

### Errors

If the customer could not be found, let the user reenter the customer number until the correct customer number is entered:

```
Please enter the customer number: f
Customer could not be found.
Please enter the customer number:
```

## Add OrderItem

Add an product with a specific amount to the current draft order.

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
7: Add OrderItem
8: Save order
x: Exit
> 7
Please enter the product number: 1
Please enter the amount: 3
```

### Errors

If the product number does not exist, let the user reenter until the product can be found:

```
Please enter the product number: 3
Product could not be found.
Please enter the product number:
```

If the amount is not an integer, let the user reenter until it's an integer:

```
Please enter the amount: asd
Please enter a number as amount.
Please enter the amount:
```

## Save order

Saving the order just removes the possibility to add OrderItems to the current draft order.

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
7: Add OrderItem
8: Save order
x: Exit
> 8
Order was saved!
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
```

## Print Customers

Just print out all customers.

Hint:

> Use `console.table`

### Example

```
*** Menu ***
1: Add Customer
2: Add Product
3: New Order
4: Print Customers
5: Print Products
6: Print Orders
x: Exit
> 4
┌─────────┬────────┬───────────┬──────────┬─────────────────┬──────────┬────────────┬─────────────────┬──────────────┐
│ (index) │ number │ firstName │ lastName │     street      │   city   │ postalCode │      email      │    phone     │
├─────────┼────────┼───────────┼──────────┼─────────────────┼──────────┼────────────┼─────────────────┼──────────────┤
│    0    │  '1'   │  'Test'   │ 'Tester' │ 'Teststreet 12' │ '123456' │ 'Testcity' │ 'test@test.com' │ '0123456789' │
└─────────┴────────┴───────────┴──────────┴─────────────────┴──────────┴────────────┴─────────────────┴──────────────┘
```

## Print products

Print all products.

### Example

```
> 5
┌─────────┬────────┬─────────────────┬─────────────────────────┐
│ (index) │ number │      name       │          price          │
├─────────┼────────┼─────────────────┼─────────────────────────┤
│    0    │  's1'  │    'Switch'     │ Price { amount: 19999 } │
│    1    │  'p1'  │ 'Playstation 4' │ Price { amount: 39999 } │
└─────────┴────────┴─────────────────┴─────────────────────────┘
```

## Print orders

Print all orders

Hint:

> Don't use `console.table` here!

### Example

```
> 6
> 6
--------------------------------------------------
Order #1 for 1 - Test Tester
-------------------------
1x #s1 Switch - 199.99
-------------------------
3x #p1 Playstation 4 - 399.99
Sum: 1399.96
--------------------------------------------------
--------------------------------------------------
Order #2 for 2 - Another Testy
-------------------------
2x #s1 Switch - 199.99
-------------------------
1x #p1 Playstation 4 - 399.99
Sum: 799.97
--------------------------------------------------

```
