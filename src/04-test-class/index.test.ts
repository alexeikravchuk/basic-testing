import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initBalance = 100;
  const bankAccaunt = getBankAccount(initBalance);
  const secondAccount = getBankAccount(0);

  test('should create account with initial balance', () => {
    expect(bankAccaunt.getBalance()).toBe(initBalance);
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
    const spy = jest.spyOn(lodash, 'random');

    spy.mockReturnValue(initBalance).mockReturnValueOnce(1);

    const mockedType = typeof initBalance;

    const balance = await bankAccaunt.fetchBalance();
    expect(typeof balance).toBe(mockedType);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest.spyOn(bankAccaunt, 'fetchBalance');
    spy.mockResolvedValueOnce(initBalance);

    await bankAccaunt.synchronizeBalance();

    expect(bankAccaunt.getBalance()).toBe(initBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest.spyOn(bankAccaunt, 'fetchBalance');
    spy.mockResolvedValueOnce(null);

    await expect(() => bankAccaunt.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
