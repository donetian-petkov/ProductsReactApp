# Products React App 

This is my custom Products React App, which is able to C,R,U,D product items. You may create products, edit them and delete them. 

# How to start the App

You may use npm. First you must run the npm install -i for the dependencies to be installed and then you may start the production via the npm start command. 

# What did I use to make the App 

Mostly React with plenty of CSS and the only external React library I used was react-hot-toast (https://github.com/timolins/react-hot-toast) for the Notifications

# How the App works 

## Components - in the components folder

### The CreateForm 

The create form collects name, price and currency from the form and sends a POST request to my database through custom API - https://parseapi.back4app.com/classes/Product with the submitted name, price and currency in a JSON object. 

The form checks two things - if you have filled all of the input fields and if the product you are trying to create does not exist in the database already. The last check is done through the products state (an array with the products as objects inside) stored in the context of the app. 

Finally, when the form is submitted we execute the listProductsHandler function passed through the context, which updates the products state by making a GET request to the API. 

### The ListProducts 

The List Products displays the current state of the products and enables the visitor to edit the products or delete them. For this the List uses two states - the products mentioned above and the currentId which stores the id of the row where the Update has been clicked last. 

With the currentId and the products the List creates each row, which has id that equals the product's objectId on it. The cells of each row are created through a separate CreateCell component via props - we pass to the component the currentId, the name, price and currency from the products, the class of the rows and a default value (for the name cell we pass the name of the product on the row and etc). 

#### CreateCell 

The CreateCell component creates an input field used for the cell with the passed props. The specific thing here is whether or not the currentId matches the product's objectId. If it does not the input field is disabled (readonly) and its text color is gray. If it does you may write in the input field and the text color is black. 

### UpdateButton  

The UpdateButton component is responsible for creating the Update button and for the actions when the Edit button is clicked (through event handler). It uses the products state and the currentId from the context. 

When the button is clicked we create a newId variable, which stores the id of the row and we check if the newId matches the currentId: 

1) If it does this means that we have presed the Update on the specific row twice and we want to update the product in the row. The app sends a PUT request through the above API to my database for the product that matches the id of the row with the new information. 

Finally, we call an editHandler function which updates the products state by first removing the old product from the products array and then inserting the new/edited product at the index of the old product.

Here we make two checks - if any of the input fields are empty and if there is a product with the same name we want to set for the row. 

2) If it does not - we update the currentId with the id of the row. In this way when the Update button is pressed again on the same row the 1) will be executed, but if it is pressed on the another row an update request will not be sent and instead the currentId will be updated. 

### DeleteButton 

Much simpler situation - the component creates the Delete button and when the button is clicked we take the id of the row on which the button was clicked and we delete the row. To do so we first send a DELETE request to the API and then we update the products state by filtering the products array. 

### Footer 

Basic footer, nothing special - it leads to the website online, to this GitHub page and to two other websites I have created

## Additional functions 

### Fetch services - placed in the services folder

Additional functions which handle the fetch requests for the various components 

### Permissions - placed in the public folder 

It is a JSON array which contains permissions. By removing permissions from the array we set if the CreateForm, ListProducts, UpdateButton and the DeleteButton will be shown to the visitor. In each component there is useEffect, which checks the state of the permissions and based on the check it sets boolean variables which  during the render tell if the component will be shown or not.

## App.js 

In the app the components are set and there are two additional functionalities - the listProductsHandler function, which is executed once, when the App is rendered, and a switch which sets the App margin bottom so that removing products on the page won't affect the design of the page. 


# FAQ: 

Q: Why am I using custom handler functions and the products state when I have the listProductsHandler? 

A: The listProductsHandler will generate new fetch requests through the API, while using the state and custom function will minimise the requests to the most essential ones, which improves the performance on the site. 
