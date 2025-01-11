"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";

interface Message {
    id: string;
    text: string;
    photoURL: string;
    uid: string;
}

export default function Line() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const unsubscribe = db.collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
            });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div key={id} className={`msg ${uid === auth.currentUser?.uid ? "sent" : "received"}`}>
                        <img src={photoURL} alt="user avatar" />
                        <p>{text}</p>
                    </div>
                ))}
            </div>
            <SendMessage />
        </div>
    );
}