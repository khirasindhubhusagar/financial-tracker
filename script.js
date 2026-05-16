import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getAuth,

onAuthStateChanged,

signOut

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

  apiKey: "AIzaSyD3Xsu6X4BwbSliSu75lRlkphtSQUDAalc",

  authDomain:
  "financial-tracker-c03f7.firebaseapp.com",

  projectId:
  "financial-tracker-c03f7",

  storageBucket:
  "financial-tracker-c03f7.firebasestorage.app",

  messagingSenderId:
  "594200662080",

  appId:
  "1:594200662080:web:fc2854c2ad8e3041f64fa5",

  measurementId:
  "G-CTY6LL6T0Q"

};

/* INITIALIZE FIREBASE */

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

/* AUTH PROTECTION */

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href =
        'login.html';

    }

});

/* ELEMENTS */

const balance =
document.getElementById('balance');

const income =
document.getElementById('income');

const expense =
document.getElementById('expense');

const savings =
document.getElementById('savings');

const list =
document.getElementById('list');

const form =
document.getElementById(
'transaction-form'
);

const text =
document.getElementById('text');

const amount =
document.getElementById('amount');

const chartCanvas =
document.getElementById(
'financeChart'
);

let financeChart;

/* LOAD STORAGE */

let transactions = JSON.parse(
localStorage.getItem('transactions')
) || [];

/* SAVE STORAGE */

function saveLocalStorage(){

    localStorage.setItem(
        'transactions',
        JSON.stringify(transactions)
    );

}

/* UPDATE VALUES */

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

/* REMOVE TRANSACTION */

window.removeTransaction =
function(id){

    transactions =
    transactions.filter(
        transaction =>
        transaction.id !== id
    );

    init();

}

/* ADD TRANSACTION TO UI */

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

/* CHART */

function renderChart(){

    const incomeData =
    transactions
    .filter(t => t.amount > 0)
    .reduce((acc,t)=>acc+t.amount,0);

    const expenseData =
    Math.abs(

    transactions
    .filter(t => t.amount < 0)
    .reduce((acc,t)=>acc+t.amount,0)

    );

    if(financeChart){

        financeChart.destroy();

    }

    financeChart =
    new Chart(chartCanvas, {

        type:'doughnut',

        data:{

            labels:[
                'Income',
                'Expense'
            ],

            datasets:[{

                data:[
                    incomeData,
                    expenseData
                ],

                backgroundColor:[

                    '#16a34a',

                    '#dc2626'

                ]

            }]

        }

    });

}

/* INITIALIZE */

function init(){

    list.innerHTML = '';

    transactions.forEach(
        addTransactionDOM
    );

    updateValues();

    saveLocalStorage();

    renderChart();

}

/* SIDEBAR */

window.showDashboard = function(){

    window.scrollTo({

        top:0,

        behavior:'smooth'

    });

}

window.scrollToTransactions =
function(){

    document.querySelector(
        '.transaction-box'
    ).scrollIntoView({

        behavior:'smooth'

    });

}

window.showAnalytics =
function(){

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

Savings:
₹${totalIncome - Math.abs(totalExpense)}

More advanced analytics
coming soon 🚀`

    );

}

window.showBudget =
function(){

    alert(

`💰 Budget Planner

Budget feature coming soon 🚀`

    );

}

/* REAL LOGOUT */

window.logout = function(){

    signOut(auth)

    .then(()=>{

        alert(
        'Logged Out Successfully'
        );

        window.location.href =
        'login.html';

    });

}

/* FORM */

form.addEventListener(
    'submit',
    addTransaction
);

/* START */

init();
