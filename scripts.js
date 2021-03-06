const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

//fetch random user and add money
async function getRandomUser(){
    const res = await fetch( "https://randomuser.me/api");
    const data = await res.json();

    console.log(data);
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}
// adds new object to the data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//doubles everyones money

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money *2}
    });
    updateDOM();
}
// sorts people by richest
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

// only show those who are millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calculateWealth() {
    
    let totalWealth = document.getElementById("wealthEl");
    const wealth = data.reduce((acc, user) => ( acc += user.money), 0);
    let newCalcMoney = formatMoney(wealth);
    // above, we calculate the wealth, but if it already exists, exit out of the function. if it does not exist, it continues down the function and it appends the wealthEl to the DOM.
    if(totalWealth !== null && totalWealth.innerHTML === `<h3>Total Wealth: <strong>${newCalcMoney}</strong></h3>`){
        return;
    }
    // const wealth = data.reduce((acc, user) => ( acc += user.money), 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    wealthEl.setAttribute("id","wealthEl");
    main.appendChild(wealthEl);

// calculateWealthBtn.addEventListener("click", function(){
//     let totalWealth = document.getElementById("wealthEl");
//     console.log(totalWealth);
//     if(totalWealth === null){
//         calculateWealthBtn.addEventListener("click",calculateWealth);
//     }else{
//         totalWealth.parentNode.removeChild(totalWealth);
//         calculateWealthBtn.addEventListener("click",calculateWealth);
//     }
    
        



//         // if(document.body.contains(totalWealth)){
//         //     totalWealth.parentNode.removeChild(totalWealth);
//         //     calculateWealthBtn.addEventListener("click",calculateWealth)
//         // }else{
//         //     calculateWealthBtn.addEventListener("click",calculateWealth)
//         // }
    
    
// });


}



//Update DOM, if nothing is passed in, you can use the data array

function updateDOM(providedData = data){
    //clear the main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    //for each method to loop through
    providedData.forEach( item => {

        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);

    });
}

//Format number as money
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
//function was taken from answer on stack overflow. 
function formatMoney(number) {
    return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}







//Event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);