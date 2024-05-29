import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const Private = ({ isSignedIn, children }) => {
    if (isSignedIn)
        return children;
    else
        return <Navigate to="/login" />;

};

export default Private;