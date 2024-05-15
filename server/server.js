const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [{
  num1: 2,
  operator: "+",
  num2: 4,
  result: 6
},
{
  num1: 6,
  operator: "*",
  num2: 6,
  result: 36
},
{
num1: 4,
operator: "-",
num2: 1,
result: 3
}
];


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.send(calculations)
})


// POST /calculations
app.post('/calculations', (req, res) => {
  // Extract data from request body and convert to numbers
  let newHistory = {
    num1: Number(req.body.num1),
    num2: Number(req.body.num2),
    operator: req.body.operator
  };

  // Calculate result
  let result = calcResult(newHistory);
  console.log("Result is... ", result);

  // Add result to history
  newHistory.result = result;

  // Add new history to calculations array
  calculations.push(newHistory);
  console.log("New history:", newHistory);

  // Send response
  console.log("POST /calculations working:", newHistory);
  res.sendStatus(200);
});





let calcResult = (toCalculate) => {
  console.log("calcResult() called from /postHistory");
  
  let num1 = toCalculate.num1;
  let num2 = toCalculate.num2;

  // Perform the calculation based on the operator
  if (toCalculate.operator === "+") {
    return num1 + num2;
  } else if (toCalculate.operator === "-") {
    return num1 - num2;
  } else if (toCalculate.operator === "*") {
    return num1 * num2;
  } else if (toCalculate.operator === "/") {
    return num1 / num2;
  } else {
    return NaN; // Return NaN for unsupported operators
  }
};

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
