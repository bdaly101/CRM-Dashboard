const testArr = [
  "john",
  "hose",
  "Emily"
]


const regEx = /^[a-zA-Z-]+$/

testArr.forEach((name) => console.log(`${name}: ${regEx.test(name)}`))

process.exit(0);