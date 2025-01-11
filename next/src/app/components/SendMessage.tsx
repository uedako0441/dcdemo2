"use client";
import React, { useState } from "react";
import { db, auth } from "../../../firebase/firebase";
import firebase from "firebase/compat/app";
import { Input, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function SendMessage() {
    const [message, setMessage] = useState("");

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser!;

        if (!message.trim()) return;

        await db.collection("messages").add({
            text: message,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage("");
    };

    return (
        <div className="sendMsg">
            <form onSubmit={sendMessage}>
                <Input
                style={{
                    width: "78%",
                    fontSize: "15px",
                    fontWeight: "550",
                    marginLeft: "5px",
                    marginBottom: "-3px",
                  }}
                    placeholder="メッセージを入力してください"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                />
                <Button type="submit">
                    <SendIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} />
                </Button>
            </form>
        </div>
    );
}