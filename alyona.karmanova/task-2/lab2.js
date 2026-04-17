function isBalanced(str) {
    let arr = [];
    let flag = true;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === '{' || str[i] === '[') {
            arr.push(str[i]);
        } else {
            if (arr.length === 0) {
                flag = false;
                break;
            }
            let popedElem = arr.pop();
            if (popedElem === '(' && str[i] !== ')'
                || popedElem === '{' && str[i] !== '}'
                || popedElem === '[' && str[i] !== ']'
            ) {
                flag = false;
                break;
            }
        }
    }

    if (flag && arr.length === 0) {
        console.log(str + " correct");
    } else {
        console.log(str + " incorrect");
    }
}

function lab2() {
    isBalanced("{[()]}")
    isBalanced("{{(})}")
    isBalanced("(({})")
}