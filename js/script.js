const blance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(e) {
    e.preventDefault();

    if(text.value === '' || amount.value === ''){
        alert('Please enter text and amount.');
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateVlaues();
        updatTransactions();

        text.value = '';
        amount.value = '';
    }
}

function generateId() {
    return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}<span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);

}

function updateVlaues() {
   const amounts = transactions.map(transaction => transaction.amount);
   const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
    const income = amounts
    .filter(item => item > 0 )
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const expense = (amounts
    .filter(item => item < 0 )
    .reduce((acc, item) => (acc += item), 0)* -1)
    .toFixed(2);

    blance.textContent = `$${total}`;
    money_plus.textContent = `$${income}`;
    money_minus.textContent = `$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updatTransactions();
    init();
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM)
    updateVlaues();
}

function updatTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction)

init();