"use client";
import React from "react";
import { auth } from "../../../firebase/firebase";
import { Button } from "@mui/material";

export default function SignOut() {
    return (
        <div>
            <Button variant="outlined" onClick={() => auth.signOut()}>
                サインアウト
            </Button>
            <p>{auth.currentUser?.displayName}</p>
        </div>
    );
}