// Mathematical core functionality, to be utilised in operate Function
const add = function(a,b) {
	return +a + +b;
};

const subtract = function(a,b) {
	return a - b;
};

const sum = function(arr) {

	return arr.reduce((accumulator,current_value) =>  accumulator + current_value,0);
};

const multiply = function(array) {
  
    return array.reduce((accumulator,current_value) => accumulator*current_value,1)
};

const divide = function(array) {
    if(array[1] == 0)
        return `You caaaaan't divide by that baii`
    first_value = array.shift();
    return array.reduce((accumulator,current_value) => accumulator/current_value,first_value)
  };

// Operate function, takes in variables and operators and returns result
function operate(var1, operator, var2){
    if(operator == '+')
        return add(var1,var2)
    else if(operator == '-')
        return subtract(var1,var2)
    else if(operator == '*')
        return multiply([var1,var2])
    else if(operator == '/')
        return divide([var1,var2])
};

// Selectors for adding listeners on screen
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('button.operator-button');
const equalButton = document.getElementById('equal-button');
const acButton = document.getElementById('ac-button');
const delButton = document.getElementById('del-button');


// Array to contain values to be operated on
let operationArray = [];

// Bool set to true if last input is an operator, used to clear screen when new number inputted
let lastInputOperator = false;

// Bool to signify whether an operator exists in the operationArray, true means there is no operator
let initialOperator = true;

// Logic to run when a number button is called
// Checks if last input was a number or operator, to clear screen if neccessary
// Pushes input value to console output
numberButtons.forEach((button)  => {
        
    button.addEventListener('click', () => {
        lastInputCheck();    
        const inputValue = button.getAttribute('data-value');
        document.getElementById('calculator-output').innerHTML += inputValue;
    })
});
// Logic to run when an operator function is called
operatorButtons.forEach((button)  => {
        
    button.addEventListener('click', () => {
        const inputValue = button.getAttribute('data-value');
        operatorInput(inputValue);            
    })
});

function operatorInput(value){
    // Check if last input is a number, if so, add output to array
    if(lastInputOperator == false)
        operationArray.push(document.getElementById('calculator-output').innerHTML);
    // If last input was an operator, remove it from operation array
    else
        operationArray.shift();

    if(initialOperator == true){ 
        operationArray.push(value);
        initialOperator = false;
    } else{
        const res = getOperationResult();
        operationArray = [res];
        operationArray.push(value);
    };
    lastInputOperator = true;
};

// Get result of operations on array
// Output result to screen
// Replace array with just result value, similar to inputting a number

function getOperationResult(){
    let res = operate(...operationArray);
    document.getElementById('calculator-output').innerHTML = res;
    return res;
};

// Add event listeners to equal, clear and delete
equalButton.addEventListener('click', equalInput);

// Runs when equal called, publishes result
function equalInput(){
    operationArray.push(document.getElementById('calculator-output').innerHTML);
    getOperationResult();
    operationArray = [];
    initialOperator = true;
    lastInputOperator = false;
};

acButton.addEventListener('click', reset)

delButton.addEventListener('click', () => clearScreen())

function printOutput(input){
    document.getElementById("calculator-output").innerHTML = input;
};

function clearScreen(){
    document.getElementById('calculator-output').innerHTML = '';
};

function reset(){
    document.getElementById('calculator-output').innerHTML = '';
    operationArray = [];
    initialOperator = true;
};

function keyOutput(e){
    // Check if a relevant key has been entered
    const numberKey = !!document.querySelector(`.number-button[data-value="${e.key}"]`);
    const operatorKey = !!document.querySelector(`.operator-button[data-value="${e.key}"]`);
    const equalKey = !!document.querySelector(`#equal-button[data-value="${e.key}"]`);
    const delKey = !!document.querySelector(`#del-button[data-value="${e.key}"]`);
    const acKey = !!document.querySelector(`#ac-button[data-value="${e.key}"]`);

    // Logic check to perform input operation
    if(numberKey){
        lastInputCheck();
        document.getElementById('calculator-output').innerHTML += e.key;} 
    else if(operatorKey) 
        operatorInput(e.key); 
    else if(equalKey) 
        equalInput();
    else if(delKey)
        clearScreen();
    else if(acKey)
        reset();
    
}
window.addEventListener('keydown',keyOutput)

function lastInputCheck(){
    if(lastInputOperator == true){
        document.getElementById('calculator-output').innerHTML = '';
        lastInputOperator = false;
    };
};


