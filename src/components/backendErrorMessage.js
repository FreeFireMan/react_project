
import React from 'react'

const BackendErrorMessage = ({backendError}) =>{
    console.log("backendError");
    console.log(backendError);
    // if(Array.isArray(backendError))
    // {
        const errorMessages = Object.keys(backendError).map(value => {
            const message = backendError[value].join(' ')
            return `${value} ${message}`
        })
        return (<ul className="text-danger">
            {errorMessages.map(msg=>{
                return <li key={msg}>{msg}</li>
            })}
        </ul>)
    // }else{
    //     return <h2>{backendError}</h2>
    // }



}
export default BackendErrorMessage
