import React from 'react'

const BackendErrorMessage = ({backendError}) =>{
    const errorMessages = Object.keys(backendError).map(value => {
        const message = backendError[value].join(' ')
        return `${value} ${message}`
    })
    return (<ul className="text-danger">
        {errorMessages.map(msg=>{
           return <li key={msg}>{msg}</li>
        })}
    </ul>)
}


export default BackendErrorMessage
