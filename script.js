const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function updateValues(){

    const amounts = transactions.map(
        item => item.amount
    );

    const total = amounts.reduce(
        (acc,item) => acc + item,
        0
    );

    const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc,item)=> acc + item,0);

    const expenseTotal = amounts
    .filter(item => item < 0)
    .reduce((acc,item)=> acc + item,0);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeTotal}`;
    expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

function addTransactionDOM(transaction){

    const li = document.createElement('li');

    li.innerHTML = `
        ${transaction.text}
        <span>₹${transaction.amount}</span>
    `;

    list.appendChild(li);
}

function addTransaction(e){

    e.preventDefault();

    const transaction = {
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    text.value = '';
    amount.value = '';
}

form.addEventListener(
    'submit',
    addTransaction
);
