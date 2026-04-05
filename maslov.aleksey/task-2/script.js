function generateParenthesis(n) {
    const result = [];
    function buildStrings(currentString, openCount, closeCount) {
        if (currentString.length === n * 2) {
            result.push(currentString);
            return;
        }
        if (openCount < n) {
            buildStrings(currentString + "(", openCount + 1, closeCount);
        }
        if (closeCount < openCount) {
            buildStrings(currentString + ")", openCount, closeCount + 1);
        }
    }
    buildStrings("", 0, 0);
    return result;
}

console.log("n = 2: ", generateParenthesis(2));
console.log("n = 3: ", generateParenthesis(3));
