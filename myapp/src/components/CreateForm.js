import styles from './CreateForm.module.css';
import fetchPermissions from '../services/fetchPermissions'
import fetchCreateProduct from "../services/fetchCreateProduct";
import {useState, useEffect, useContext} from "react";
import {ProductContext} from "../App";
import toast from 'react-hot-toast';
import React from 'react';

export default function CreateForm() {

    const [canRead, setCanRead] = useState(true);
    const value = useContext(ProductContext);
    const {value1, value2} = value;
    const [products] = value1;
    const listProductsHandler = value2;

    useEffect(() => {
        fetchPermissions()
            .then(result => {
                setCanRead(result.some(x => x === "CREATE"));
            })
    }, []);

    const success = (message) => toast.success(message, {
        duration: 3000,
        position: 'top-right',
        style: {
            background: "rgb(198 221 244)"
        }
    });

    const error = (message) => toast.error(message, {
        duration: 3000,
        position: 'top-right',
        style: {
            background: "rgb(198 221 244)"
        }
    });

    function createProduct(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let {name, price, currency} = Object.fromEntries(formData);

        if (name && price && currency) {

            if (products.some(x => x.name === name)) {
                error(`Product ${name} already exists`);
                return;
            }

            price = Number(price);

            fetchCreateProduct(name, price, currency)
                .then(res => res.text())
                .then(() => {
                    success(`Successfully created product ${name}`);
                    listProductsHandler();
                })
                .catch(() => {
                    error("Could not connect to API");
                });

        } else {
            error('You must fill all of the input fields');
            return;
        }

        e.currentTarget.reset();

    }

    return (

        canRead ?
            <form id="createForm" onSubmit={createProduct}>

                <div className={styles.createDetails}>

                    <label htmlFor="name" style={{fontWeight: "bold"}}>Name: </label>
                    <input type="text" name="name" id="name" placeholder="The Product's Name"/>

                    <label htmlFor="price" style={{fontWeight: "bold"}}>Price: </label>
                    <input type="number" name="price" id="price" step=".01" placeholder="The Product's Price"/>

                    <label htmlFor="currency" style={{fontWeight: "bold"}}>Currency: </label>
                    <input type="text" name="currency" id="currency" placeholder="The Product's Currency"/>

                    <input className={styles.submitButton} id="submitButton" type="submit" value="Create Product"/>

                </div>
            </form>
            : null
    );

}