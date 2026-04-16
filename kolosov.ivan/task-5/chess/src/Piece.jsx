function Piece({colour, piece, cover}) {
    const PIECES = {
        white: { king: "/pieces/wk.png", queen: "/pieces/wq.png", pawn: "/pieces/wp.png", rook: "/pieces/wr.png", knight: "/pieces/wn.png", bishop: "/pieces/wb.png", },
        black: { king: "/pieces/bk.png", queen: "/pieces/bq.png", pawn: "/pieces/bp.png", rook: "/pieces/br.png", knight: "/pieces/bn.png", bishop: "/pieces/bb.png", },
        dot: {dot: "/pieces/dot.png"},
    };

    const COVERS = {
        atacked: "/covers/atacked.png", selected: "/covers/selected.png"
    }

    const hasCover = cover !== "none";
    const isDot = piece === "dot"

    return (
        <div>
            {!isDot && <img src= {`${PIECES[colour][piece]}`} alt = {`${colour}-${piece}`} ></img>}
            {isDot && <img src= {`${PIECES[colour][piece]}`} className="dot" alt = {`${colour}-${piece}`} ></img>}
            {hasCover && <img src= {`${COVERS[cover]}`} className = "cover" alt = {`$cover`} ></img>}
        </div>
    );
}

export default Piece;