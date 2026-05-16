const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/* LOAD SAVED DATA */

let transactions =
JSON.parse(
localStorage.getItem('transactions')
) || [];

/* SAVE TO LOCAL STORAGE */

function saveLocalStorage(){

    localStorage.setItem(
        'transactions',
        JSON.stringify(transactions)
    );

}

/* UPDATE BALANCE */

function updateValues(){

    const amounts =
    transactions.map(
        item => item.amount
    );

    const total =
    amounts.reduce(
        (acc,item)=> acc + item,
        0
    );

    const incomeTotal =
    amounts
    .filter(item => item > 0)
    .reduce((acc,item)=> acc + item,0);

    const expenseTotal =
    amounts
    .filter(item => item < 0)
    .reduce((acc,item)=> acc + item,0);

    balance.innerText = `₹${total}`;

    income.innerText = `₹${incomeTotal}`;

    expense.innerText =
    `₹${Math.abs(expenseTotal)}`;

}

/* DELETE TRANSACTION */

function removeTransaction(id){

    transactions =
    transactions.filter(
        transaction =>
        transaction.id !== id
    );

    init();

}

/* ADD TRANSACTION TO SCREEN */

function addTransactionDOM(transaction){

    const li =
    document.createElement('li');

    li.innerHTML = `

        <span>
            ${transaction.text}
        </span>

        <span>

            ₹${transaction.amount}

            <button
            class="delete-btn"
            onclick="removeTransaction(${transaction.id})">

            X

            </button>

        </span>

    `;

    list.appendChild(li);

}

/* ADD NEW TRANSACTION */

function addTransaction(e){

    e.preventDefault();

    const transaction = {

        id: Date.now(),

        text: text.value,

        amount: +amount.value

    };

    transactions.push(transaction);

    init();

    text.value = '';

    amount.value = '';

}

/* INITIALIZE APP */

function init(){

    list.innerHTML = '';

    transactions.forEach(
        addTransactionDOM
    );

    updateValues();

    saveLocalStorage();

}

/* LOGOUT */

function logout(){

    window.location.href =
    'login.html';

}

/* FORM SUBMIT */

form.addEventListener(
    'submit',
    addTransaction
);

/* START APP */

init();
