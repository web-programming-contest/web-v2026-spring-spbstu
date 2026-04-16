function Piece({colour, piece, cover}) {
    const PIECES = {
        white: { king: "/pieces/wk.png", queen: "/pieces/wq.png", pawn: "/pieces/wp.png", rook: "/pieces/wr.png", knight: "/pieces/wn.png", bishop: "/pieces/wb.png", },
        black: { king: "/pieces/bk.png", queen: "/pieces/bq.png", pawn: "/pieces/bp.png", rook: "/pieces/br.png", knight: "/pieces/bn.png", bishop: "/pieces/bb.png", },
        dot: {dot: "/pieces/dot.png"},
    };

    const COVERS = {
        atacked: "/covers/atacked.png", selected: "/covers/selected_1.png"
    }

    const hasCover = cover !== "none";

    return (
        <div>
            <img src= {`${PIECES[colour][piece]}`} alt = {`${colour}-${piece}`} ></img>
            {hasCover && <img src= {`${COVERS[cover]}`} className = "cover" alt = {`$cover`} ></img>}
        </div>
    );
}

export default Piece;