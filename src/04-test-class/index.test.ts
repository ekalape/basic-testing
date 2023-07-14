// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  let newBankAcc: BankAccount;

  beforeEach(() => {
    newBankAcc = getBankAccount(1000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(newBankAcc).toBeInstanceOf(BankAccount);
    expect(newBankAcc.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => newBankAcc.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw InsufficientFundsError error when transferring more than balance', () => {
    const otherBankAcc = getBankAccount(0);
    expect(() => newBankAcc.transfer(2000, otherBankAcc)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    expect(() => newBankAcc.transfer(500, newBankAcc)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depMoney = jest.spyOn(newBankAcc, 'deposit');
    newBankAcc.deposit(1000);
    expect(depMoney).toBeCalledTimes(1);
    expect(newBankAcc.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const witMoney = jest.spyOn(newBankAcc, 'withdraw');
    newBankAcc.withdraw(500);
    expect(witMoney).toBeCalledTimes(1);
    expect(newBankAcc.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const otherBankAcc = getBankAccount(0);
    const transMoney = jest.spyOn(newBankAcc, 'transfer');
    newBankAcc.transfer(500, otherBankAcc);
    expect(transMoney).toBeCalledTimes(1);
    expect(newBankAcc.getBalance()).toBe(500);
    expect(otherBankAcc.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const otherBankAcc = getBankAccount(0);
    jest.spyOn(otherBankAcc, 'fetchBalance').mockResolvedValue(200);
    const balance = await otherBankAcc.fetchBalance();
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const otherBankAcc = getBankAccount(0);
    jest
      .spyOn(otherBankAcc, 'fetchBalance')
      .mockReturnValue(new Promise((res) => res(200)));
    await otherBankAcc.synchronizeBalance();
    expect(otherBankAcc.getBalance()).toEqual(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const otherBankAcc = getBankAccount(0);
    jest
      .spyOn(otherBankAcc, 'fetchBalance')
      .mockReturnValue(new Promise((res) => res(null)));
    expect(async () => await otherBankAcc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
