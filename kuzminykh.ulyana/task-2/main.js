const map = {
    '01':{signs:['козерог','водолей'], num: 20},
    '02':{signs:['водолей','рыбы'], num: 20},
    '03':{signs:['рыбы','овен'], num: 20},
    '04':{signs:['овен','телец'], num: 20},
    '05':{signs:['телец','близнецы'], num: 20},
    '06':{signs:['близнецы','рак'], num: 21},
    '07':{signs:['рак','лев'], num: 22},
    '08':{signs:['лев','дева'], num: 23},
    '09':{signs:['дева','весы'], num: 23},
    '10':{signs:['весы','скорпион'], num: 23},
    '11':{signs:['скорпион','стрелец'], num: 22},
    '12':{signs:['стрелец','козерог'], num: 21},
};

function zodiacsign(data) {
    let num = data.substr(0,2);
    let mon = data.substr(3,2);
    let number = +num;
    let month = map[mon];
    if (number <= month.num){
        return month.signs[0]
    } else {
        return month.signs[1]
    }
}

console.log(zodiacsign('06.01.2007'));
console.log(zodiacsign('20.02.1997'));
console.log(zodiacsign('03.08.2012'));