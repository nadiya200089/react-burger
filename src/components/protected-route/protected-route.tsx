import { ReactElement} from "react";
import React from "react";
import { Navigate, useLocation, RouteProps } from "react-router-dom";
import { IUserData } from "../../types";

type TProtectedRoute = {
    onlyUnAuth?: Boolean;
    children: ReactElement;
    user: null | IUserData;
} & RouteProps

export const ProtectedRoute: React.FC<TProtectedRoute> = ({ onlyUnAuth, user, children, ...props }) => {
    const location = useLocation();
    
    if (onlyUnAuth && user) {
         const { from } = location.state || { from: {pathname: '/'}}
        return (
        <Navigate to={{ pathname: from.pathname }} />
        )
    }

    if (!onlyUnAuth && !user) {
        return (
            <Navigate to={{ pathname: "/enter" }} state={{from: location}} />
        )
    }
    
    return children;
}