const isDigitsOnly = (str) => {
    for(let i = 0; i < str.length; i++) {
        let result = parseInt(str[i]);
        if(isNaN(result)) { return false; };
    };
    return true;
};

// n = name, p = price, d = description
exports.validateInput = (n, p, d) => {
    if(!n || !p || !d) {
        return "Incomplete Input";
    } else if (!isDigitsOnly(p)) {
        return "Invalid Input. Price must contain digits only";
    } else if(d.length > 300) {
        return "Invalid Input. Description too long";
    };

    return null;
};