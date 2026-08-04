'use strict';

// DATA //
const acc1 = {

    user: 'Anthony Jones',
    movements: [200, 300, 1200, 1250, -30, -640, -11, 10, -370, 25],
    interestRate: 1.4,
    pin: 111

}

const acc2 = {

    user: 'Christine Smith',
    movements: [1240, 1000, -230, -120, -10, -2, 50, 620, -75, 10],
    interestRate: 1.2,
    pin: 222

}

const acc3 = {

    user: 'Jonathan Shelley',
    movements: [2000, 100, 240, -670, -800, 60, 40, -10, -5, -17],
    interestRate: 2.0,
    pin: 333

}

const acc4 = {

    user: 'Sarah Parker',
    movements: [600, 510, -330, -30, -35, -42, 100, 120, -90, -100],
    interestRate: 0.9,
    pin: 444

}

const accounts = [acc1, acc2, acc3, acc4];

// ELEMENTS //
// Containers
const appContainer = document.querySelector('main');
const loginContainer = document.querySelector('.login');
const headerContainer = document.querySelector('header');
const movementsContainer = document.querySelector('.movements');

// Buttons
const btnLogin = document.querySelector('.btn--login');
const btnTransfer = document.querySelector('.btn--transfer');
const btnLoan = document.querySelector('.btn--loan');
const btnClose = document.querySelector('.btn--close');
const goBack = document.querySelector('.back');
const logout = document.getElementById('logout');
const openHeader = document.querySelector('.icon');

// Inputs
const inputUserLogin = document.getElementById('user');
const inputPinLogin = document.getElementById('pin');
const inputReceiver = document.getElementById('receiver');
const inputAmount = document.getElementById('amount');
const inputLoanAmount = document.getElementById('loan--amount');
const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');

// Labels
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance');
const labelIncomes = document.querySelector('.incomes');
const labelOutcomes = document.querySelector('.outcomes');
const labelInterest = document.querySelector('.interest');
const labelTimer = document.querySelector('.timer');

// FUNCTIONS //
const createUsernames = function (accs) {

    accs.forEach(acc => {
        acc.username = acc.user.toLowerCase().split(' ').map(user => user[0]).join('');
    });

};
createUsernames(accounts);

const displayMovements = function (movements) {

    movementsContainer.innerHTML = '';

    movements.forEach(mov => {

        const type = mov > 0 ? 'deposit' : 'withdraw';

        const html = `<div class="movement">
                        <div class="type type--${type}">${type}</div>
                        <div class="amount">${mov}</div>
                    </div>`;

        movementsContainer.insertAdjacentHTML('afterbegin', html);

    });

};

const displayBalance = function (acc) {

    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `EUR ${acc.balance}`;

}

const displaySummary = function (acc) {

    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelIncomes.textContent = `${incomes}`;

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelOutcomes.textContent = `${Math.abs(outcomes)}`;

    const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter((int, i , arr) => {return int >= 1}).reduce((acc, int) => acc + int, 0);
    labelInterest.textContent = `${interest}`;

};

const updateDisplay = function (acc) {

    displayMovements(acc.movements);
    displayBalance(acc);
    displaySummary(acc);

}

const startLogoutTimer = function () {

    const tick = function () {

        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        labelTimer.textContent = `${min}:${sec}`;

        if (time === 0) {

            clearInterval(timer);
            headerContainer.classList.add('hidden');
            appContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');

        }

        time--;

    };

    let time = 120;

    tick();
    const timer = setInterval(tick, 1000);

    return timer;

};

// EVENTS //
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {

    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputUserLogin.value);

    if (currentAccount.pin === Number(inputPinLogin.value)) {

        loginContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');

        labelWelcome.textContent = `Welcome back, ${currentAccount.user.split(' ')[0]}`;

        if (timer) clearInterval(timer);
        timer = startLogoutTimer();

        updateDisplay(currentAccount);

    }

    inputUserLogin.value = inputPinLogin.value = '';
    
});

openHeader.addEventListener('click', function (e) {

    e.preventDefault;

    headerContainer.classList.remove('hidden');
    appContainer.style.opacity = 0.25;

});

goBack.addEventListener('click', function (e) {

    e.preventDefault();

    headerContainer.classList.add('hidden');
    appContainer.style.opacity = 1;

});

logout.addEventListener('click', function (e) {

    e.preventDefault();

    loginContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
    appContainer.style.opacity = 1;
    headerContainer.classList.add('hidden');

});

btnTransfer.addEventListener('click', function (e) {

    e.preventDefault();

    const amount = Number(inputAmount.value);
    const receiver = accounts.find(acc => acc.username === inputReceiver.value);

    inputReceiver.value = inputAmount.value = '';

    if (amount > 0 && receiver && currentAccount.balance > amount && receiver?.username != currentAccount.username) {

        receiver.movements.push(amount);
        currentAccount.movements.push(-amount);

        headerContainer.classList.add('hidden');
        appContainer.style.opacity = 1;
        
        updateDisplay(currentAccount);

    }

});

btnLoan.addEventListener('click', function (e) {

    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

        currentAccount.movements.push(amount);

        headerContainer.classList.add('hidden');
        appContainer.style.opacity = 1;

        updateDisplay(currentAccount);

    }

});

btnClose.addEventListener('click', function (e) {

    e.preventDefault();

    if (currentAccount.username === inputUsername.value && currentAccount.pin === Number(inputPassword.value)) {

        const index = accounts.find(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);

        appContainer.classList.add('hidden');
        headerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');

    }

    inputUsername.value = inputPassword.value = '';

});