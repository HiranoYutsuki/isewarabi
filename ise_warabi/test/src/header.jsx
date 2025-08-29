// Header.jsx 側
function Header({ onShowHome, onShowQRScan, onShowStampPage }) {
    return (
        <header>
            <h1>
                <a href="#" onClick={(e) => { e.preventDefault(); onShowHome(); }} style={{ color: "#bfa76f", textDecoration: "none" }}>
                    isewarabi
                </a>
            </h1>
            <nav className="header-nav">
                <ul>
                    <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); onShowQRScan(); }}>
                            QR読み取り
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); onShowStampPage(); }}>
                            スコア/スタンプ一覧
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
