import {useContext, useEffect, useState} from "react";
import fetchPermissions from "../services/fetchPermissions";
import {ProductContext} from "../App";
import fetchDeleteProduct from "../services/fetchDeleteProduct";
import toast from "react-hot-toast";
import React  from 'react';

export default function DeleteButton() {

    const [canDelete, setCanDelete] = useState(true);
    const {value1} = useContext(ProductContext);
    const [products , setProducts] = value1;

    useEffect(() => {
        fetchPermissions()
            .then(result => {
                setCanDelete(result.some(x => x === "DELETE"));
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

    function deleteHandler(id){

        const newProducts = products.filter(x => x.objectId !== id)
        setProducts(newProducts);

    }

    function deleteProduct(e) {
        const row = e.currentTarget.parentElement.parentElement;
        const id = row.getAttribute("id");
        const name = row.children[0].children[0].value;

        fetchDeleteProduct(id)
            .then(response => response.json())
            .then(() => {
                deleteHandler(id);
                success(`Successfully deleted ${name}`);
            })
            .catch(() => {
                error("Could not connect to API!");
            })
    }

    return (
        canDelete ?
            <button name="deleteButton" id="deleteButton" onClick={deleteProduct}>Delete </button>
            : null

    )
}