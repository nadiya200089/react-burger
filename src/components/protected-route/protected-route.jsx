import React from "react"
import { Navigate, useLocation } from "react-router-dom"

export const ProtectedRoute = ({onlyUnAuth, user, children }) => {
const location = useLocation();


return children;
}