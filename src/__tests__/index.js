const yate = require('../index.js')

describe('yate.expect', () => {
  test('toBe: should match strictly equal values', () => {
    expect(() => yate.expect(42).toBe(42)).not.toThrow()
    expect(() => yate.expect("string").toBe("string")).not.toThrow()
    expect(() => yate.expect(true).toBe(true)).not.toThrow()
  });
  
  test('toEqual: should match objects and arrays', () => {
    expect(() => yate.expect({a: 1}).toEqual({a: 1})).not.toThrow()
    expect(() => yate.expect([4, 2]).toEqual([4, 2])).not.toThrow()
  });

  test('should throw when doesn\'t match', () => {
    expect(() => yate.expect(42).toBe(43)).toThrow()
    expect(() => yate.expect("string").toBe("STRING")).toThrow()
    expect(() => yate.expect(true).toBe(false)).toThrow()

    expect(() => yate.expect({a: 1}).toEqual({a: 2})).toThrow()
    expect(() => yate.expect([2, 4]).toEqual([4, 2])).toThrow()
  });
})

describe('yate.test', () => {
  let actualConsoleLog = console.log
  let actualConsoleError = console.error
  
  beforeAll(() => {
    console.log = jest.fn()
    console.error = jest.fn()
  })

  afterAll(() => {
    console.log = actualConsoleLog
    console.error = actualConsoleError
  })

  test('should run the test function', () => {
    const title = 'test title'
    const testFn = jest.fn()

    yate.test(title, testFn)

    expect(testFn).toHaveBeenCalledTimes(1)
    expect(testFn).toHaveBeenCalledWith()
  });

  test('should catch exceptions thrown by the test function', () => {
    const title = 'test title'
    const testFn = jest.fn(() => { throw new Error('should\'t fire') })

    expect(() => yate.test(title, testFn)).not.toThrow()
  });
});

describe('yate.spy', () => {
  test('should track calls and arguments', () => {
    const fn = yate.spy()

    fn('will be lost')
    fn(42)

    expect(fn).toHaveProperty('__mock')
    expect(fn.__mock).toHaveProperty('calls')
    expect(fn.__mock.calls).toBe(2)
    expect(fn.__mock.args).toBe(42)
  });
});