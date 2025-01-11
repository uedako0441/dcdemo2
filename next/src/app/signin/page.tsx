"use client";

import SignIn from "../components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    // サインイン済みの場合、自動でチャットページへリダイレクト
    useEffect(() => {
        if (user) {
            router.push("/chat");
        }
    }, [user, router]);

    return (
        <main>
            <h1>サインインが必要です</h1>
            <SignIn />
        </main>
    );
}