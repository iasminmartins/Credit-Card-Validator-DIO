const readline = require('readline');

// Function to validate card number using Luhn algorithm
function isValidLuhn(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Regular expressions for different card types
const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // 13 to 19 digits
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    elo: /^((4011(78|79))|(4312(74|75))|(4389(35|36))|(4514(16|17))|(4576(31|32))|(5041(75|76))|(5066(99|98))|(5090(41|42))|(6277(80|81))|(6362(97|98))|(6504(85|86|87|88))|(6507(01|02|03|04|05|06|07|08|09))|(6516(52|53|54|55))|(6550(00|01|02|03|04|05|06|07|08|09)))[0-9]{10,12}$/,        // Remaining digits
    hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    enroute: /^(2014|2149)\d{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    voyager: /^8699[0-9]{11}$/,
    aura: /^50[0-9]{14,19}$/
};

// Function to determine the card type based on the number
function getCreditCardFlag(cardNumber) {
    for (const [flag, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            return flag;
        }
    }

    return 'unknown';
}

// Main function to read input and validate card number
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter a credit card number: ', (cardNumber) => {
        cardNumber = cardNumber.replace(/\D/g, ''); // Remove all non-digit characters

        if (isValidLuhn(cardNumber)) {
            const flag = getCreditCardFlag(cardNumber);
            console.log(`The card number is valid and it is a ${flag} card.`);
        } else {
            console.log('The card number is invalid.');
        }

        rl.close();
    });
}

main();