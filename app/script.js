'use strict';

// DATA //
const acc1 = {

    name: 'Alex Jones',
    movements: [2400, -750, -30, -2, 190, 20, -5, 120, 500, -10],
    interestRate: 2.2,
    pin: 1111

};

const acc2 = {

    name: 'Jonathan Parker',
    movements: [1200, 200, -30, -40, -800, 600, -12, -10, -5, 5],
    interestRate: 1.7,
    pin: 2222

};

const acc3 = {

    name: 'Sarah Jade',
    movements: [900, -30, -100, 450, -100, -10, -3, 200, 6, 10],
    interestRate: 0.9,
    pin: 3333

};

const acc4 = {

    name: 'Christine Smith',
    movements: [1000, 2000, -300, -210, -90, -75, 100, 80, -240, -10],
    interestRate: 2.0,
    pin: 4444

};

const accounts = [acc1, acc2, acc3, acc4];


// ELEMENTS //
// Containers
const appContainer = document.querySelector('.app');
const loginContainer = document.querySelector('.main');
const headerContainer = document.querySelector('.header--tag');
const containerMovements = document.querySelector('.movements');

// Inputs
const inputUsername = document.querySelector('.input--username');
const inputAmount = document.querySelector('.input--amount');
const inputLoan = document.querySelector('.input--loan');
const inputClose = document.querySelector('.input--close');
const inputPassword = document.querySelector('.input--password');
const inputLoginUser = document.querySelector('.input--user');
const inputLoginPin = document.querySelector('.input--pin');

// Buttons
const btnTransfer = document.querySelector('.btn--transfer');
const btnLoan = document.querySelector('.btn--loan');
const btnClose = document.querySelector('.btn--close');
const btnLogin = document.querySelector('.login--btn');

// Labels
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance');
const labelIncomes = document.querySelector('.incomes');
const labelOutcomes = document.querySelector('.outcomes');
const labelInterest = document.querySelector('.interest');
const labelTimer = document.querySelector('.timer');

// General
const goBackIcon = document.querySelector('.icon');
const logoutLink = document.getElementById('logout');
const openHeader = document.querySelector('.open--icon');


// FUNCTIONS & EVENETS //
let currentAccount;

const createUsernames = function (accs) {

    accs.forEach(acc => {
        
        acc.username = acc.name.toLowerCase().split(' ').map(name => name[0]).join('');

    })

};
createUsernames(accounts);

const displayMovements = function (movements) {

    containerMovements.innerHTML = '';

    movements.forEach(function (mov, sort = false) {

        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `<div class="move">

                        <div class="move--el">
                            <div class="move--type type--${type}">${type}</div>
                        </div>

                        <div class="move--value">${mov}</div>

                    </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);

    });

};

const calcBalance = function (acc) {

    acc.balance = acc.movements.reduce((acc, mov) => acc += mov);
    labelBalance.textContent = `EUR ${acc.balance}`;

};

const calcSummary = function (acc) {

    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelIncomes.textContent = `${incomes}`;

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelOutcomes.textContent = `${Math.abs(outcomes)}`;

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100).filter((int, i, arr) => {return int >= 1}).reduce((acc, mov) => acc + mov, 0);
    labelInterest.textContent = `${interest}`;

}

const updateDetails = function (acc) {

    calcBalance(acc);
    calcSummary(acc);
    displayMovements(acc.movements);

};

btnLogin.addEventListener('click', function (e) {

    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUser.value);

    if (currentAccount.pin === Number(inputLoginPin.value)) {

        labelWelcome.textContent = `Welcome back, ${currentAccount.name.split(' ')[0]}`;
        loginContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');

        updateDetails(currentAccount);

    }

});

openHeader.addEventListener('click', function () {

    headerContainer.classList.remove('hidden');

});

goBackIcon.addEventListener('click', function () {

    headerContainer.classList.add('hidden');

});

logoutLink.addEventListener('click', function () {

    headerContainer.classList.add('hidden');
    appContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');

});

btnTransfer.addEventListener('click', function (e) {

    e.preventDefault();

    const amount = Number(inputAmount.value);
    const receiver = accounts.find(acc => acc.username === inputUsername.value);

    if (amount > 0 && receiver && currentAccount.balance > amount && receiver?.username !== currentAccount.username) {

        currentAccount.movements.push(-amount);
        receiver.movements.push(amount);

        updateDetails(currentAccount);

    }

    inputUsername.value = inputAmount.value = '';

});

btnLoan.addEventListener('click', function (e) {

    e.preventDefault();

    const amount = Number(inputLoan.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

        currentAccount.movements.push(amount);

        updateDetails(currentAccount);

        inputLoan.value = '';

    }

});

btnClose.addEventListener('click', function (e) {

    e.preventDefault();

    if (inputClose.value === currentAccount.username && Number(inputPassword.value) === currentAccount.pin) {

        const index = accounts.find(acc => acc.username === currentAccount.username);
        accounts.splice(index, 1);

        appContainer.classList.add('hidden');
        headerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');

        inputLoginUser.value = inputLoginPin.value = '';
        inputClose.value = inputPassword.value = '';

    }

});