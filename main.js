function handleTestIsDigit(symbol) {
    let reg = new RegExp('^[0-9]$');
    
    if (reg.test(symbol)) {
        return true;
    } else return false;
}

function formattedPhone(phone) {
    let result = '';
    
    if (phone.length === 12) {
        for (let i = 0; i < phone.length; i++) {
            if ( i > 0 ? handleTestIsDigit(phone[i]) : true) {
                if (phone.charAt(0) === '+') {
                    if (i === 1) {
                            result += phone[i] + ' (';
                            continue;
                    }
                    if (i === 4) {
                            result += phone[i] + ') ';
                            continue;
                    }
                    if (i === 7 || i === 9) {
                            result += phone[i] + '-';
                            continue;
                    }
                    result += phone[i];
                }
                else {
                    return 'Please enter phone number in format: +71234567890. You missed "+" sign';
                }
            } else {
                return `You entered "${phone[i]}" symbol at ${i+1} position of ${phone}. \nIt should be a number`;
            }
        }
    } else {
        return 'Please enter phone number in format: +71234567890';
    }
    return result;
}

console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90