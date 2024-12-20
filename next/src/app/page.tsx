import Link from "next/link";
import "./bubble.css"; // CSSファイル

export default function HomePage() {
  return (
    <main className="main">
      
      <h1 className="center-text">乗車支援アプリ「駅楽」何かお困りごとはございますか？</h1>

      <div className="button-container">
        <Link href="/chat" className="bubble">チャット</Link>
        <Link href="/map" className="bubble">駅構内地図</Link>
        <Link href="/input" className="bubble">トイレの場所</Link>
        <Link href="/slope" className="bubble">スロープ</Link>
        <Link href="/minitokyo" className="bubble">MiniTokyo3D</Link>
        <Link href="/input" className="bubble">予約</Link>
        <Link href="/navi" className="bubble">乗換案内</Link>
      </div>
    </main>
  );
}