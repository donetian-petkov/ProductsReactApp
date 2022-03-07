import './App.css';
import CreateForm from "./components/CreateForm.js";
import ListProducts from "./components/ListProducts";
import React, {useEffect , useState} from "react";
import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";
import fetchListProducts from "./services/fetchListProducts";

export const ProductContext = React.createContext();


function App() {

    const [products, setProducts] = useState([]);
    const [currentId, setCurrentId] = useState('');

    function listProductsHandler() {
        fetchListProducts()
            .then(response => response.json())
            .then(result => {
                setProducts(Object.values(result)[0]);
            });
    }

    useEffect(() => {
        listProductsHandler()
    },[]);

    let marginValue = '';

    switch(products.length){
        case 0:
            marginValue = "20%";
            break;
        case 1:
            marginValue = "16%";
            break;
        case 2:
            marginValue = "16%"
            break;
        case 3:
            marginValue = "16%";
            break;
        case 4:
            marginValue = "9.5%";
            break;
        default:
            marginValue = "4%";
    }


    return (
        <div className="App">
            <Toaster/>
            <h1>Products App</h1>
            <div className="components" style={{marginBottom: marginValue}}>
            <ProductContext.Provider value={{value1:[products , setProducts],value2:listProductsHandler, value3:[currentId, setCurrentId]}}>
            <CreateForm className="createForm" listProductsHandler={listProductsHandler}/>
            <ListProducts className="listProducts"/>
            </ProductContext.Provider>
            </div>
            <Footer />
        </div>
    );
}

export default App;
