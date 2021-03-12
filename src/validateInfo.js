// returns true or false
function validateCreditCardNumber(cardNumber) {
	cardNumber = cardNumber.split(' ').join("");
	if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
		return false;
	}
	var carray = new Array();
	for (var i = 0; i < cardNumber.length; i++) {
		carray[carray.length] = cardNumber.charCodeAt(i) - 48;
	}
	carray.reverse();
	var sum = 0;
	for (var i = 0; i < carray.length; i++) {
		var tmp = carray[i];
		if ((i % 2) != 0) {
			tmp *= 2;
			if (tmp > 9) {
				tmp -= 9;
			}
		}
		sum += tmp;
	}
	return ((sum % 10) == 0);
}
function cardType(cardType) { // returns card type; should not rely on this for checking if a card is valid
  var cards = ["electron", "maestro","dankort", "interpayment","unionpay", "visa","mastercard", "amex","diners", "discover","jcb",];
  var found = cards.includes(cardType);
	return found;

}

function validateExpiry(input) {
  // ensure basic format is correct
  if (input.match(/^(0\d|1[0-2])\/\d{2}$/)) {
    const {0: month, 1: year} = input.split("/");

    // get midnight of first day of the next month
    const expiry = new Date("20"+year, month);
    const current = new Date();
    
    return expiry.getTime() > current.getTime();
    
  } else return false;
}

function validateCVV(cvv) {
  // remove all non digit characters
  var cvv = cvv.replace(/\D/g, '');
  // american express and cvv is 4 digits
  if ((cvv.length>2) && (cvv.length<5)){
    if ((/^\d{4}$/).test(cvv) )  {
      return true;
    } else if ((/^\d{3}$/).test(cvv)){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validateMailCode(mycode) {
  mycode = mycode.replace(/\s+/g, '');
  var letterNumber = /^[0-9a-zA-Z]+$/;
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  var isValidPostal = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
  var isValidCode = /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g;

  if (mycode.match(letterNumber)) {
    if (mycode.match(isValidPostal)) {
      return true;
    }

    if (mycode.match(isValidZip)) {
      return true;
    }

    if (mycode.match(isValidCode)) {
      return true;
    }
  } else {
    return false;
  }
}


export default function validateInfo(values) {
    let errors = {};
  
    if (!/^[A-Za-z]+/.test(values.name.trim())) {
      errors.name = 'No input detected, enter a valid name';
    }
    if (!values.number.trim()) {
        errors.number = 'No input detected, credit card number required';
      }
    if (!validateCreditCardNumber(values.number) ){
      errors.number = 'Please emter a valid credit card number required';
    }
    if (!values.expiry.trim()) {
        errors.expiry = 'No input detected, expiry required';
      }
    if (!validateExpiry(values.expiry)){
      errors.expiry = 'bad expiry, please enter expiry date in the future ';
    }
    if (!values.cvc.trim()) {
        errors.cvc = 'No input detected, cvc required';
      }
    if (!values.mailcode.trim()) {
        errors.mailcode = 'No input detected, mailcode required';
      }
    if (!values.credittype.trim()) {
      errors.credittype = 'No input detected, credit card type required';
    }
  if (!cardType(values.credittype)){
      errors.credittype = 'Please emter a valid credit card type';
    }
  
  if (!validateCVV( values.cvc)){
      errors.cvc = 'Please emter a valid cvv';
    }
    
  if (!validateMailCode( values.mailcode)){
    errors.mailcode = 'Please enter a valid Postal/Zip code.';
  }

    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    
    return errors;
  }