const dsp = document.getElementById("display");
const sym = document.getElementById("symbol");

let num1, num2, answer = 0;
let temp, btn, operator;
let numORsym;

document.addEventListener("click", (event) => {
	btn = event.target;					// Button that is pressed (that triggered the event)
	let n = event.target.innerHTML;			// Content of the button that was pressed

	if (n == "C") 
	{   //Reload the page (clearing all saved variables' values)
		resetCalculator();
	}

	if (n.length > 1) 
	{	//FILTERS ANY OTHER ELEMENT PRESSED
		//IF THEY AREN'T THE BUTTONS WHICH HAVE 1 CHARACTER LENGTH IN ITS INNER HTML
		n = "";
		return;
	}

	else if (parseFloat(n) >= 0 || n == ".") 
	{	//IN CASE A NUMBER BUTTON OR DECIMAL BUTTON IS PRESSED

		if(!numORsym){
			dsp.innerHTML = "";
			operator = sym.innerHTML;
		}

		if(temp){
			temp.classList.remove("symbolActive");
		}

		//then number() function is called by passing the n as parameter
		number(n);
		
		numORsym = true;
	} 
	else {			// WHEN ANY SYMBOL IS PRESSED...

		if(n != "="){
			temp ??= btn;
			if(temp != btn){
				temp.classList.remove("symbolActive");
				temp = btn;
			}
			temp.classList.add("symbolActive");
		}else if(n ==  "=" && !numORsym && temp){
			temp.classList.remove("symbolActive");
		}

		//... calculate() function is called by passing n(the symbol) as parameters

		calculate(n);
		
		numORsym = false;
	}
});

function number(n) {
	if (n != ".") 
	{	// all numbers (not the decimal point)...
		n = parseInt(n);	// ...are converted from string to integer
	}

	if(n == "." && dsp.innerHTML.indexOf(".") != -1)
	{	// if decimal is pressed and the display does have the decimal already...
		return;			//... function returns without going below than this
	}

	dsp.innerHTML += n;		// adds the number to the previously displayed numbers
}

function calculate(n) {

	if (sym.innerHTML == "=" || sym.innerHTML == "" ) 	// in case equals to was the previously clicked symbol...
	{
		if(n != "=")
		{					//... and any other symbol is pressed this time..
			sym.innerHTML = n;		//.. symbol is saved as currently saved symbol
			operator = n;			//.. operator is the current pressed symbol
			num1 = getNumber();
		}
		return;
	}

	// only operator value doesn't change if equals to wasn't pressed before this
	sym.innerHTML = n;	

	if(numORsym){
		check(n);	
		numORsym = false;
		return;
	}
}

function check(n)
{
	if (!num1) 
	{		// if number1 variable is empty
		num1 = getNumber();		// currently displayed number is saved as number1,	
		operator = n;	
	} 
	else if (!num2) 
	{		// if number1 had value and number2 is empty
		num2 = getNumber();			// currently displayed number is saved as number2
		
		answer = operate(operator);					// answer is the value returned by operate() function 
		dsp.innerHTML = answer;						// answer is displayed

		num1 = getNumber();			// number1 is updated, and kept the answer that is displayed
		num2 = null;								// number2 is nullified
		
		if(sym.innerHTML=="=") operator = null;		// if prev pressed symbol was equals to, operator is nullified
	}

	if(n!="="){
		operator = n;
	}
}

function operate(symbol) 
{
	switch (symbol) {
		// calculation takes place with the symbols respectively
		case "*":
			return num1 * num2;
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "÷":
			return num1 / num2;
		case "%":
			return (num1/100)*num2;

		// in default case, the same number displayed is returned
		default:
			return answer;
	}
}

function resetCalculator(){
	dsp.innerHTML = "0";
	sym.innerHTML = "";
	num1 = "";
	num2 = "";
	answer = "";
}

function getNumber() {
	return (parseFloat(dsp.innerHTML) || 0);
}