import styles from './ListProducts.module.css'
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import {useState, useEffect, useContext} from "react";
import fetchPermissions from "../services/fetchPermissions";
import CreateCell from "./CreateCell";
import {ProductContext} from "../App";
import React from 'react';

export default function ListProducts() {

    const value = useContext(ProductContext);
    const [products] = value["value1"];
    const [currentId] = value["value3"];
    const [canRead, setCanRead] = useState(true);

    useEffect(() => {
        fetchPermissions()
            .then(result => {
                setCanRead(result.some(x => x === "READ"));
            })
    }, []);

    return (
        canRead ?
        <table className={styles.listProducts}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Currency</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {products.map((val) => {
                return (
                    <tr key={val.objectId} id={val.objectId}>

                        <CreateCell type="text" name="name" id={currentId} product={val} className={styles.inputFields} defaultValue={val.name}/>

                        <CreateCell type="number" name="price" id={currentId} product={val} className={styles.inputFields} defaultValue={val.price}/>

                        <CreateCell type="text" name="currency" id={currentId} product={val} className={styles.inputFields} defaultValue={val.currency}/>

                        <td className={styles.buttons}>
                            <UpdateButton/>
                            <DeleteButton/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
            : null
    )

}