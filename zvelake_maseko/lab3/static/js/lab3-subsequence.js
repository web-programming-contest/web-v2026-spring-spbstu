function findLongestIncreasingSubsequence(arr) {
    if (!arr || arr.length === 0) return [0, []];
    
    const n = arr.length;
    const dp = new Array(n).fill(1);
    const sequences = arr.map((el, idx) => [el]);
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    // Создаем новую последовательность: последовательность из j + текущий элемент
                    sequences[i] = [...sequences[j], arr[i]];
                }
            }
        }
    }
    
    const maxLength = Math.max(...dp);
    const maxIndex = dp.indexOf(maxLength);
    const longestSeq = sequences[maxIndex];
    
    return [maxLength, sequences, longestSeq];
}


const testSequences = [
    [10, 9, 2, 5, 3, 7, 101, 18],
    [0, 1, 0, 3, 2, 3],
    [7, 7, 7, 7],
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [],
    [3],
    [3, 1, 2, 4, 1, 5]
];

function initializeExamples(){
    testSequences.forEach(seq => {
        const [length, allSeq, bestSeq] = findLongestIncreasingSubsequence(seq);
        const card = document.createElement('div');
        card.className = 'card box';
        card.innerHTML = `<div class="card-header">
                            <h5 class="sequence">[${seq.join(', ')}]</h5>
                        </div>
                        <div class="card-body">
                            Все подпоследовательности:
                            <ul class="subsequence-list">
                                ${allSeq.map(s => `<li>[${s.join(',')}]</li>`)}
                            </ul>
                        </div>
                        <div class="card-footer">
                            <div class="best-subsequence">
                                Одна из LIS: [${bestSeq && bestSeq.join(', ')}]
                                Длина LIS: ${length}
                            </div>
                        </div>`;
        document.querySelector('.examples-list').appendChild(card);
    });
}
function loadResult(seq, allSeq, bestSeq){
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<p>последовательность: [${seq}]<br/>
    Все возрастающие подпоследовательности: ${allSeq.map(s => `[${s.join(',')}]`).join(',')}<br/>
    наибольше возрастающая: [${bestSeq.join(',')}] - длина ${bestSeq.length}</p>`;
    document.querySelector('.result').appendChild(card);
}

function clearResults(){
    document.querySelectorAll('.result .card').forEach(c => c.remove());
}

document.addEventListener('DOMContentLoaded', ()=>{
    initializeExamples();
    let submitBtn = document.querySelector('#submitButton');
    let form = document.querySelector('form');
    let helper = document.querySelector('.msg-helper');
    
    form.addEventListener('submit', function(e){
        e.preventDefault();
        clearResults();
        
        let formData = new FormData(form);
        let seq = formData.get('sequence').split(',').map(n => n.trim());

        let ok = true;
        seq.forEach(s => {
            ok &= /\d+/.test(s);
        });
        
        if(!ok){
            helper.textContent = 'разрешены только цифры';
            helper.style.setProperty('display', 'inline');
            return;
        }

        seq = seq.map(s => Number(s));
        helper.style.removeProperty('display');
        
        submitBtn.disabled = true;
        document.querySelector('.loader').style.setProperty('display', 'block');
        const [size, allSeq, bestSeq] = findLongestIncreasingSubsequence(seq);
        setTimeout(() => {
            loadResult(seq, allSeq, bestSeq);
            document.querySelector('.loader').style.removeProperty('display');
            submitBtn.disabled = false;
        }, 3000);
    });
});