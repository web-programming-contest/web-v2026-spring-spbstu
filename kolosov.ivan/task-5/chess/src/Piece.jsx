function Piece({colour, piece }) {
    const PIECES = {
        white: { king: "/pieces/wk.png", queen: "/pieces/wq.png", pawn: "/pieces/wp.png", rook: "/pieces/wr.png", knight: "/pieces/wn.png", bishop: "/pieces/wb.png", },
        black: { king: "/pieces/bk.png", queen: "/pieces/bq.png", pawn: "/pieces/bp.png", rook: "/pieces/br.png", knight: "/pieces/bn.png", bishop: "/pieces/bb.png", },
    }

    return (
        <div>
            <img src= {`${PIECES[colour][piece]}`} alt = {`${colour}-${piece}`} ></img>
        </div>
    );
}

export default Piece;