const screen = document.querySelector('.resultScreen');
const btns = document.querySelectorAll('.button');
const backspace = document.querySelector('.backspace');

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayOnScreen(btn.value);
    });
});

backspace.addEventListener('click', () => {
    displayOnScreen(-1);
});

function displayOnScreen(exp) {
    if (exp == 'C') {
        screen.value = "";
        document.querySelector('.mid-ans').innerHTML = "";
    } else if (exp == '=') {
        document.querySelector('.mid-ans').innerHTML = "";
        screen.value = evaluateExpression(screen.value);
    } else if (exp == -1) {
        screen.value = screen.value.slice(0, -1);
    } else if (exp == '(') {
        if (screen.value.length == 0) {
            screen.value += exp;
        } else if (!isNaN(parseFloat(screen.value[screen.value.length - 1])) || screen.value[screen.value.length - 1] == ')') {
            screen.value += '*' + exp;
        } else {
            screen.value += exp;
        }
    } else if ((screen.value == "" || screen.value == '(') && (exp == ')' || exp == '/' || exp == '*')) {
        alert('Invalid format!');
    } else if ((screen.value[screen.value.length - 1] == '+' || screen.value[screen.value.length - 1] == '-' || screen.value[screen.value.length - 1] == '*' || screen.value[screen.value.length - 1] == '/') && (exp == '+' || exp == '-' || exp == '*' || exp == '/')) {
        screen.value = screen.value.slice(0, -1);
        screen.value += exp;
    } else {
        if (!isNaN(parseFloat(exp)) && screen.value[screen.value.length - 1] == ')') {
            screen.value += '*' + exp;
        } else {
            screen.value += exp;
        }
    }

    document.querySelector('.mid-ans').innerHTML = eval(screen.value) || "";
    screen.scrollLeft = screen.scrollWidth;
}

function evaluateExpression(expression) {
    let arr = convertIntoArray(expression);
    return calculate(arr);
}

function convertIntoArray(expression) {
    let arr = [];
    let i = 0;

    while (i < expression.length) {
        if (expression[i] == '(' || expression[i] == ')' ||
            expression[i] == '+' || expression[i] == '-' ||
            expression[i] == '*' || expression[i] == '/') {
            arr.push(expression[i]);
            i++;
        } else {
            let temp = "";

            while (i < expression.length && expression[i] != '(' && expression[i] != ')' &&
                expression[i] != '+' && expression[i] != '-' &&
                expression[i] != '*' && expression[i] != '/') {
                temp += expression[i];
                i++;
            }
            arr.push(parseFloat(temp));
        }
    }
    return arr;
}

function calculate(expression) {
    // let operators = ['*', '/', '+', '-'];

    // // Helper function to perform basic arithmetic operations
    // function applyOperation(a, b, operator) {
    //     switch (operator) {
    //         case '*': return a * b;
    //         case '/': return a / b; // Handle division by zero outside of this function
    //         case '+': return a + b;
    //         case '-': return a - b;
    //         default: return null; // Invalid operator
    //     }
    // }

    while (expression.includes('(') && expression.includes(')')) {
        let openIndex = expression.lastIndexOf('(');
        let closeIndex = expression.indexOf(')', openIndex);
        let subExpression = expression.slice(openIndex + 1, closeIndex);
        let result = evaluate(subExpression);
        expression.splice(openIndex, closeIndex - openIndex + 1, result);
    }

    
    let result = evaluate(expression);
    return result;
}

function evaluate(expression) {

    
    function applyOperation(a, b, operator) {
        switch (operator) {
            case '*': return a * b;
            case '/': return a / b; 
            case '+': return a + b;
            case '-': return a - b;
            default: return null; 
        }
    }

    
    for (let op of ['/', '*']) {
        while (expression.includes(op)) {
            let opIndex = expression.indexOf(op);
            let leftOperand = expression[opIndex - 1];
            let rightOperand = expression[opIndex + 1];
            let result = applyOperation(leftOperand, rightOperand, op);
            expression.splice(opIndex - 1, 3, result);
        }
    }

    for (let op of ['+', '-']) {
        while (expression.includes(op)) {
            let opIndex = expression.indexOf(op);
            let leftOperand = expression[opIndex - 1];
            let rightOperand = expression[opIndex + 1];
            let result = applyOperation(leftOperand, rightOperand, op);
            expression.splice(opIndex - 1, 3, result);
        }
    }

    
    return expression[0];
}
