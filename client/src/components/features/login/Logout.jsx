import React, { useEffect } from "react";
import { LoginSlice, logout } from "./LoginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/');
    }, [dispatch, navigate]);

    return null;
};

export default Logout;