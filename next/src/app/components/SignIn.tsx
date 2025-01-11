"use client";
import React from "react";
import { auth } from "../../../firebase/firebase";
import firebase from "firebase/compat/app";
import { Button } from "@mui/material";

export default function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return (
        <Button variant="contained" onClick={signInWithGoogle}>
            Googleでログインする
        </Button>
    );
}