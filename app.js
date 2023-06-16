var user = {
    name : "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: ""
};

var error = new Map([
    ["err-msg-name", 0],
    ["err-msg-num", 0],
    ["err-msg-date", 0],
    ["err-msg-cvc", 0]
])

// 1 -> empty 
// 2 -> wrongformat 
// 3 -> length not enough
// 4 -> logic
function validName(name){
    if (name === "") return 1;
    for (let i = 0; i < name.length; ++i) 
        if (name[i] >= '0' && name[i] <= '9') return 2;
    return 0;
}

function validNumber(num){
    if (num === "") return 1;
    for (let i = 0; i < num.length; ++i){
        if (num[i] > '9' || num[i] < '0') return 2;
    }
    if (num.length <  16) return 3;
    return 0;
}

function validDate(month, year){
    if (month === "" || year === "") return 1;
    for (let i = 0; i < month.length; ++i)
        if (month[i] > '9' || month[i] < '0') return 2;
        for (let i = 0; i < year.length; ++i)
        if (year[i] > '9' || year[i] < '0') return 2;
    if (month.length < 2 || year.length < 2) return 3;
    month = parseInt(month);
    year = parseInt(year);
    if (month < 1 || month > 12 || year < 0) return 4;
    return 0;
}

function validCvc(cvc){
    if (cvc === "") return 1;
    for (let i = 0; i < cvc.length; ++i)
        if (cvc[i] > '9' || cvc[i] < '0') return 2;
    if (cvc.length < 3) return 3;
    return 0;
}

function valid(user){
    return [
        ["err-msg-name", validName(user.name)], 
        ["err-msg-num", validNumber(user.cardNumber)], 
        ["err-msg-date", validDate(user.expMonth, user.expYear)], 
        ["err-msg-cvc", validCvc(user.cvc)]
    ];
}

function get(){
    user = {
        name: document.getElementById('cardholder-name-area').value,
        cardNumber: document.getElementById('card-number-area').value,
        expMonth: document.getElementById('exp-month').value,
        expYear: document.getElementById('exp-year').value,
        cvc: document.getElementById('cvc-num').value
    };
}

function displayError(er){
    var validCount = 0;
    for (var [key, value] of er) {
        switch(value){
            case 1:
                document.getElementById(key).style.color = "Red" ;
            break;
            case 2: 
                document.getElementById(key).style.color = "Red";
                document.getElementById(key).innerHTML = "Wrong format";
            break;
            case 3: 
                document.getElementById(key).style.color = "Red";
                document.getElementById(key).innerHTML = "Not enough";
            break;
            case 4:
                document.getElementById(key).style.color = "Red";
                document.getElementById(key).innerHTML = "Wrong date"
            break;
            case 0: 
                document.getElementById(key).style.color = "transparent";
                validCount++;
            break;
        }
    }
    return validCount;
}

function submit(){
    get();
    let error = valid(user);
    var validStatus = displayError(error);
    if (validStatus === 4) window.location.href = 'complete-state-form.html';
}


function displayOnCard(){
    get();
    document.querySelector('.card-number-display').innerHTML = user.cardNumber.slice(0, 4) + " " + user.cardNumber.slice(4, 8) + " " + user.cardNumber.slice(8, 12) + " " + user.cardNumber.slice(12, 16);
    document.querySelector('.owner-name').innerHTML = user.name + " ";
    document.querySelector('.exp-date-display').innerHTML = (user.expMonth + "  ").slice(0, 2) + '/' + (user.expYear + "  ").slice(0, 2);
    document.querySelector('.cvc-number').innerHTML = (user.cvc + "   ").slice(0, 3);
}
document.querySelector('.button').addEventListener('click', submit);
const textList = document.querySelectorAll('textarea');
textList.forEach((elm) => {
    elm.addEventListener('input', displayOnCard);
})
