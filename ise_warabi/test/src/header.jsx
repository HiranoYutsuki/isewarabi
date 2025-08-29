// Header.jsx 側
function Header({ onShowQRScan }) {
    return (
        <header>
        <h1>isewarabi</h1>
        <nav className="header-nav">
            <ul>
            <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onShowQRScan(); }}>
                QR読み取り
                </a>
            </li>
            <li><a href="#score-list">スコア/スタンプ一覧</a></li>
            </ul>
        </nav>
        </header>
    )
}

export default Header;
