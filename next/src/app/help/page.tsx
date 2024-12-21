import Link from "next/link";
import "../bubble.css"; // CSSファイル
import "../index.css";　

export default function HomePage() {
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
        </ul>
      </nav>

      {/* メインコンテンツ */}
      <div className="content">
        <h1 className="center-text">介助を必要とされますか？</h1>

        <div className="button-container">
          <p className="position">
            <Link href="/map" className="soap">必要</Link>
          </p>
          <Link href="/navi" className="soap">不要</Link>
        </div>
      </div>
    </main>
  );
}