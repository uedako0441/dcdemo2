"use client";  // これを必ず追加

import Link from "next/link";
import "./bubble.css";
import "./index.css";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function HomePage() {
    const [user] = useAuthState(auth);  // ここはクライアントコンポーネントで動作

    return (
        <main className="main">
            {/* メニューバー */}
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link href="/" className="navbar-link">ホーム</Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/about" className="navbar-link">アプリについて</Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/contact" className="navbar-link">お問い合わせ</Link>
                    </li>
                    <li className="navbar-item">
                        {user ? <SignOut user={user} /> : <SignIn />}
                    </li>
                </ul>
            </nav>

            {/* メインコンテンツ */}
            <div className="content">
                <h1 className="center-text">乗車支援アプリ「駅楽」</h1>
                <div className="button-container">
                    <p className="position">
                        <Link href="/map" className="soap">駅構内地図</Link>
                    </p>
                    <Link href="/navi" className="soap">乗換案内</Link>
                    <Link href="/signin" className="soap">チャット（仮）</Link>
                </div>
            </div>
        </main>
    );
}