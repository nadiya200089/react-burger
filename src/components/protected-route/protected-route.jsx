import React from "react"
import { Navigate, useLocation } from "react-router-dom"

export const ProtectedRoute = ({ onlyUnAuth, user, children }) => {
    const location = useLocation();

    
    if (onlyUnAuth && user) {
         const { from } = location.state || { form: {pathname: '/'}}
        return (
        <Navigate to={{ pathname: from }} />
        )
    }

    if (!onlyUnAuth && !user) {
        return (
            <Navigate to={{ pathname: "/enter" }} state={{from: location}} />
        )
    }

    // const { from } = location.state || { form: {pathname: '/'}}
    // return (
    //    <Navigate to={{ pathname: from }} />
    // )


    return children;
}