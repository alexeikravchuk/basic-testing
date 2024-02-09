import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const bankAccaunt = getBankAccount(100);
  const secondAccount = getBankAccount(0);

  test('should create account with initial balance', () => {
    expect(bankAccaunt.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmound = bankAccaunt.getBalance() + 1;
    expect(() => bankAccaunt.withdraw(withdrawAmound)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmound = bankAccaunt.getBalance() + 1;
    expect(() => bankAccaunt.transfer(transferAmound, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccaunt.transfer(1, bankAccaunt)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositAmound = 10;
    const newBalance = bankAccaunt.getBalance() + depositAmound;

    bankAccaunt.deposit(depositAmound);

    expect(bankAccaunt.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const balance = bankAccaunt.getBalance();
    const withdrawAmound = (Math.random() * balance) >> 0;
    const newBalance = balance - withdrawAmound;

    bankAccaunt.withdraw(withdrawAmound);

    expect(bankAccaunt.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const balance = bankAccaunt.getBalance();
    const secondAccountBalance = secondAccount.getBalance();
    const transferAmound = (Math.random() * balance) >> 0;
    const newBalance = balance - transferAmound;
    const newSecondAccountBalance = secondAccountBalance + transferAmound;

    bankAccaunt.transfer(transferAmound, secondAccount);

    expect(bankAccaunt.getBalance()).toBe(newBalance);
    expect(secondAccount.getBalance()).toBe(newSecondAccountBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    bankAccaunt.fetchBalance().then((balance) => {
      expect(typeof balance).toBe('number');
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await bankAccaunt.fetchBalance();
    if (balance !== null) {
      bankAccaunt.synchronizeBalance();
      expect(bankAccaunt.getBalance()).toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = await bankAccaunt.fetchBalance();
    if (balance === null) {
      expect(() => bankAccaunt.synchronizeBalance()).toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
