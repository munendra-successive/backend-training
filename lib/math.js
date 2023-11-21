import lodash from 'lodash'
const add = (num1, num2) => lodash.add(num1,num2)
const sub = (num1, num2) => lodash.subtract(num1,num2)
const mul = (num1, num2) => lodash.multiply(num1,num2)
const div = (num1, num2) => lodash.divide(num1,num2)

export { add, sub, mul, div };
