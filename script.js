const buttonArray = document.querySelectorAll('.button');
const display = document.querySelector('.resultScreen')

let screenValue = '';

function infixToPostfix() {
    let stack = [];
    let output = [];

    let precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    let i = 0;
    while (i < screenValue.length) {
        let char = screenValue[i];

        // Handle numbers (including decimals)
        if ((char >= '0' && char <= '9') || char === '.') {
            let numStr = '';
            while ((char >= '0' && char <= '9') || char === '.') {
                numStr += char;
                i++;
                if (i < screenValue.length) {
                    char = screenValue[i];
                } else {
                    break;
                }
            }
            output.push(numStr);
            continue; // Skip the increment of i to avoid skipping the next character
        }

        // Handle opening parenthesis
        if (char === '(') {
            stack.push(char);
        }
        // Handle closing parenthesis
        else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Remove the '(' from the stack
        }
        // Handle operators
        else if (precedence[char]) {
            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[char]) {
                output.push(stack.pop());
            }
            stack.push(char);
        }

        i++;
    }

    // Pop all the remaining operators in the stack
    while (stack.length) {
        output.push(stack.pop());
    }

    return output.join(' ');
}

function calcResult(postfixExpression) {
    let stack = [];
    let tokens = postfixExpression.split(' ');

    tokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    });

    return stack.pop();
}

function calculate() {

    return (calcResult(infixToPostfix()));

}

buttonArray.forEach((button) => {
    button.addEventListener('click', () => {
        buttonValue = button.getAttribute('value');

        if (buttonValue == 'C') {
            screenValue = '';
            display.value = screenValue;
        }
        else if (screenValue == '' && buttonValue == '.') {
            screenValue += '0.';
            display.value = screenValue;
            display.scrollLeft = display.scrollWidth;
        }
        else if (buttonValue == '=') {
            let ans;
            try {
                ans = calculate();
                screenValue = ans.toString();
                display.value = screenValue;
                display.scrollLeft = display.scrollWidth;
            }
            catch (e) {
                screenValue = 'Error';
                display.value = screenValue;
                display.scrollLeft = display.scrollWidth;
            }
        }
        else if ((buttonValue == '*' || buttonValue == '/' || buttonValue == '+') && (screenValue == '-' || screenValue == '')) {
        console.log('Invalid Format');
    }
    else {
        screenValue += buttonValue;
        display.value = screenValue;
        display.scrollLeft = display.scrollWidth;
    }

    console.log(buttonValue);
});
});