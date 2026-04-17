function parseFen(fenStr) {
    let pieces = {
        r: {pieceColour: "black", pieceType: "rook"}, R: {pieceColour: "white", pieceType: "rook"},
        n: {pieceColour: "black", pieceType: "knight"}, N: {pieceColour: "white", pieceType: "knight"},
        b: {pieceColour: "black", pieceType: "bishop"}, B: {pieceColour: "white", pieceType: "bishop"},
        p: {pieceColour: "black", pieceType: "pawn"}, P: {pieceColour: "white", pieceType: "pawn"},
        q: {pieceColour: "black", pieceType: "queen"}, Q: {pieceColour: "white", pieceType: "queen"},
        k: {pieceColour: "black", pieceType: "king"}, K: {pieceColour: "white", pieceType: "king"},
    };

    let board = [];

    for (let symbol of fenStr) {
        if (pieces[symbol]) {
            board.push(pieces[symbol]);
        }
        else if (symbol === '/')
        {
            continue;
        }
        else {
            for (let i = 0; i < parseInt(symbol); ++i)
            {
                board.push({pieceColour: "none", pieceType: "none"});
            }
        }
    }

    return board;
}

export default parseFen;