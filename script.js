const dsp = document.getElementById("display");
const sym = document.getElementById("symbol");

let num1, num2, answer = 0;
let temp;

window.addEventListener("click", (event) => {
	let btn = event.target;					// Button that is pressed (that triggered the event)
	let n = event.target.innerHTML;			// Content of the button that was pressed

	if (n == "C") 
	{   //Reload the page (clearing all saved variables' values)
		location.reload();
		return;
	}

	if (n.length > 1) 
	{	//FILTERS ANY OTHER ELEMENT PRESSED
		//IF THEY AREN'T THE BUTTONS WHICH HAVE 1 CHARACTER LENGTH IN ITS INNER HTML
		n = "";
	}
	else if (parseFloat(n) >= 0 || n == ".") 
	{	//IN CASE A NUMBER BUTTON OR DECIMAL BUTTON IS PRESSED


		//MISTAKE XA !!!!!!!!!!!!
		if(dsp.innerHTML != "" && sym.innerHTML == "=")  // if = (equals to) is pressed when display is not already empty... 
		{
			dsp.innerHTML = "";					 		 // ...then display is cleared
			num1 = null;								 // number1 variable is nullified
			operator = null;							 // operator varible is nullified
		}		

		// if(temp){
		// 	temp.style.backgroundColor = "orange";
		// 	temp.style.color = "white";
		// }

		//then number() function is called by passing the n as parameter
		number(n);
	} 
	else {			// WHEN ANY SYMBOL IS PRESSED...
		
		// if(n != "="){
		// 	temp ??= btn;
		// 	if(temp != btn){
		// 		temp.style.backgroundColor = "orange";
		// 		temp.style.color = "white";
		// 		temp = btn;
		// 	}
		// 	temp.style.backgroundColor = "white";
		// 	temp.style.color = "black";
		// }

		//... calculate() function is called by passing n(the symbol) as parameters
		calculate(n);
	}
});

function number(n) {
	if (n != ".") 
	{	// all numbers (not the decimal point)...
		n = parseInt(n);	// ...are converted from string to integer
	}

	if (num1 == answer) 
	{
		dsp.innerHTML = "";
		answer = null;
	}

	if(n == "." && dsp.innerHTML.indexOf(".") != -1)
	{	// if decimal is pressed and the display does have the decimal already...
		return;			//... function returns without going below than this
	}

	dsp.innerHTML += n;		// adds the number to the previously displayed numbers
}

function calculate(n) {

	if (sym.innerHTML == "=") 	// in case equals to was the previously clicked symbol...
	{
		if (n == "=") {
			return;				// ... and if equals to is pressed this time again, function does not go below
		}

		// if (parseInt(n) >= 0) {
		// 	number(n);
		// 	return;
		// } 
//Kina rakheko birsyo

		else {					//... and any other symbol is pressed this time..
			sym.innerHTML = n;		//.. symbol is saved as currently saved symbol
			operator = n;			//.. operator is the current pressed symbol
			check(n);				// calls check() function with the symbol as parameter
			return;
		}
	}

	// only operator value doesn't change if equals to wasn't pressed before this
	sym.innerHTML = n;			
	check(n);		
}

function check(n)
{
	if (!num1) 
	{		// if number1 variable is empty
		num1 = parseFloat(dsp.innerHTML);		// currently displayed number is saved as number1,
		operator = n;							// operator is the currently pressed symbol, passed as parameter,
		dsp.innerHTML = "";						// and display is cleared
	} 
	else if (!num2) 
	{		// if number1 had value and number2 is empty
		num2 = parseFloat(dsp.innerHTML);			// currently displayed number is saved as number2
		answer = operate(operator);					// answer is the value returned by operate() function 
		dsp.innerHTML = answer;						// answer is displayed
		num1 = parseFloat(dsp.innerHTML);			// number1 is updated, and kept the answer that is displayed
		num2 = null;								// number2 is nullified
		if(sym.innerHTML=="=") operator = null;		// if prev pressed symbol was equals to, operator is nullified
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
		case "/":
			return num1 / num2;

		// in default case, the same number displayed is returned
		default:
			return dsp.innerHTML;
	}
}
