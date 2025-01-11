"use client";
import "../chat.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import Line from "../components/Line";
import SignIn from "../components/SignIn";
import Link from "next/link";
import { Button } from "@mui/material";

export default function ChatPage() {
    const [user] = useAuthState(auth);

    return (
        <main>
            <h1>チャットルーム</h1>
            {user ? <Line /> : <SignIn />}
            
            {/* トップページに戻るボタンを追加 */}
            <div style={{ marginTop: "20px" }}>
                <Link href="/" passHref>
                    <Button variant="outlined">トップページに戻る</Button>
                </Link>
            </div>
        </main>
    );
}