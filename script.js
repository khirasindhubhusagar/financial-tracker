const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const savings = document.getElementById('savings');

const list = document.getElementById('list');

const form = document.getElementById('transaction-form');

const text = document.getElementById('text');

const amount = document.getElementById('amount');

/* LOAD SAVED TRANSACTIONS */

let transactions = JSON.parse(
localStorage.getItem('transactions')
) || [];

/* SAVE LOCAL STORAGE */

function saveLocalStorage(){

    localStorage.setItem(
        'transactions',
        JSON.stringify(transactions)
    );

}

/* UPDATE DASHBOARD */

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

    const savingsTotal = total;

    balance.innerText =
    `₹${total}`;

    income.innerText =
    `₹${incomeTotal}`;

    expense.innerText =
    `₹${Math.abs(expenseTotal)}`;

    savings.innerText =
    `₹${savingsTotal}`;

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

/* SHOW TRANSACTION */

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

/* ADD TRANSACTION */

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

/* SIDEBAR */

function showDashboard(){

    window.scrollTo({

        top:0,

        behavior:'smooth'

    });

}

function scrollToTransactions(){

    document.querySelector(
        '.transaction-box'
    ).scrollIntoView({

        behavior:'smooth'

    });

}

function showAnalytics(){

    const totalTransactions =
    transactions.length;

    const totalIncome =
    transactions
    .filter(t => t.amount > 0)
    .reduce((acc,t)=>acc+t.amount,0);

    const totalExpense =
    transactions
    .filter(t => t.amount < 0)
    .reduce((acc,t)=>acc+t.amount,0);

    alert(

`📊 FinancePro Analytics

Transactions: ${totalTransactions}

Income: ₹${totalIncome}

Expense: ₹${Math.abs(totalExpense)}

Savings: ₹${totalIncome - Math.abs(totalExpense)}

More advanced analytics coming soon 🚀`

    );

}

function showBudget(){

    alert(
`💰 Budget Planner

Budget feature coming soon 🚀`
    );

}

/* LOGOUT */

function logout(){

    alert(
        'Logged Out Successfully'
    );

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
