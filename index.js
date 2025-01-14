let balance = 500.00;

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;

  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);


  }
};



class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }


}

class Deposit extends Transaction {


  get value() {
    return this.amount
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    this.transactions.forEach(element => {
      sum += element.value;
    })
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log("Starting Balance $", myAccount.balance);

const t1 = new Deposit(100, myAccount);
t1.commit();


const t2 = new Withdrawal(120, myAccount);
t2.commit();


console.log('Ending Balance:', myAccount.balance);

