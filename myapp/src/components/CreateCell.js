import React from 'react';

export default function CreateCell({
                                      type, name, id, product, className, defaultValue
                                  }) {

    return (
        <td style={{background: product.objectId === id ? "rgb(59 110 207)" : "rgb(198 221 244)"}}>
            <input type={type}
                   name={name}
                   className={className}
                   defaultValue={defaultValue}
                   style={{color: product.objectId !== id ? "gray" : "black"}}
                   readOnly={product.objectId !== id}></input>
        </td>
    )
}