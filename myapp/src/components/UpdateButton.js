import {useContext, useEffect, useState} from "react";
import fetchPermissions from "../services/fetchPermissions";
import {ProductContext} from "../App";
import toast from "react-hot-toast";
import fetchEditProduct from "../services/fetchEditProduct";
import React from 'react';


export default function UpdateButton() {

    const [canUpdate, setCanUpdate] = useState(true);
    const value = useContext(ProductContext);
    const [products , setProducts] = value["value1"];
    const [currentId , setCurrentId] = value["value3"];

    useEffect(() => {
        fetchPermissions()
            .then(result => {
                setCanUpdate(result.some(x => x === "UPDATE"));
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

    function editHandler(id, name, price, currency) {

        const index = products.findIndex(x => x.objectId === id);
        const startProducts = products.slice(0,index);
        const endProducts = products.slice(index+1);
        const editedProduct = products.find(x => x.objectId === id);

        editedProduct.name = name;
        editedProduct.price = price;
        editedProduct.currency = currency;

        const newProducts = [...startProducts, editedProduct, ...endProducts];

        setProducts(newProducts);

    }

    function editProduct(e) {

        const row = e.currentTarget.parentElement.parentElement;
        const newId = row.getAttribute('id');

        if (newId === currentId) {

            const name = row.children[0].children[0].value;
            const price = Number(row.children[1].children[0].value);
            const currency = row.children[2].children[0].value;

            if(products.some(x => x.name === name) && products.find(x => x.name === name).objectId !== currentId) {
                error(`A product with ${name} already exists`);
                return;
            }

            if (name && price && currency) {

                fetchEditProduct(currentId, name, price, currency)
                    .then(res => res.text())
                    .then(() => {
                        success(`Successfully Updated Product: ${name}`);
                        editHandler(currentId, name, price, currency);
                    })
                    .catch(() => {
                        error("Could not access API");
                    })
            } else {
                error("Please do not leave any empty fields");
            }

        } else {
            setCurrentId(row.getAttribute("id"));
        }
    }

    return (
        canUpdate ?
        <button name="editButton" id="editButton" onClick={editProduct}> Update </button>
            : null
    )
}