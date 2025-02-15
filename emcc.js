//function to validate inputs by user and calculate the answer and store in local storage
function validateAndCalculate(event) {

    //prevent auto refresh of page when clicking calculate button
    event.preventDefault();

        //initialize variable using get element function and value
        const meternumValue = document.getElementById("meternum").value;
        const previousreadValue = parseFloat(document.getElementById("prevreadinput").value);
        const currentreadValue = parseFloat(document.getElementById("currentreadinput").value);
        const costvalue = parseFloat(document.getElementById("costinput").value);

        //initialize field variables
        let meternumField =  document.getElementById("meternum");
        let previousreadField =  document.getElementById("prevreadinput");
        let currentreadField =  document.getElementById("currentreadinput");
        let costField =  document.getElementById("costinput");

        //reset border styles
        meternumField.style.border = "";
        previousreadField.style.border = "";
        currentreadField.style.border = "";
        costField.style.border = "";

        //pattern of the meter number
        const meternumPattern = /^[A-Za-z]{4}[0-9]{4}$/;

        //validate meter number input, if meter number is not the same as the pattern and length is greater than 8 alert an error
        if (!meternumPattern.test(meternumValue)) {
            alert("Please follow the pattern 4 Letters and 4 Numbers (eg. abcd1234).");
            meternumField.style.border = "2px solid red";
            return;
        }
        if (meternumValue.length > 8) {
            alert("Please input 8 characters only.");
            meternumField.style.border = "2px solid red";
            return;
        }
        if (meternumValue == "") {
            alert("Please input a value before submitting.");
            meternumField.style.border = "2px solid red";
            return;
        }

        //validate previous read input
        if (previousreadValue == "" || isNaN(previousreadValue)) {
            alert("Please input a valid numerical value for the previous reading before submitting.");
            previousreadField.style.border = "2px solid red";
            return;
        }
        if (previousreadValue <= 0) {
            alert("Previous reading value should not be less than or equal to 0");
            previousreadField.style.border = "2px solid red";
            return;
        }
        if (previousreadValue > currentreadValue) {
            alert("Previous reading should not be greater than the current reading.");
            previousreadField.style.border = "2px solid red";
            currentreadField.style.border = "2px solid red";
            return;
        }
        if (previousreadField.value.replace(/\./g, "").length > 5) { //excludes the period for length accuracy when input is a decimal
            alert("Value should only have 5 digits");
            previousreadField.style.border = "2px solid red";
            return;
        }

        //validate current read input
        if (currentreadValue == "" || isNaN(currentreadValue)) {
            alert("Please input a valid numerical value for the current reading before submitting.");
            currentreadField.style.border = "2px solid red";
            return;
        }
        if (currentreadValue <= 0) {
            alert("Current reading value should not be less than or equal to 0");
            currentreadField.style.border = "2px solid red";
            return;
        }
        if (currentreadField.value.replace(/\./g, "").length > 5) {
            alert("Value should only have 5 digits");
            currentreadField.style.border = "2px solid red";
            return;
        }

        //validate cost input
        if (costvalue == "" || isNaN(costvalue)) {
            alert("Please input a valid numerical value for the cost before submitting.");
            costField.style.border = "2px solid red";
            return;
        }
        if (costvalue <= 0) {
            alert("Cost value should not be less than or equal to 0");
            costField.style.border = "2px solid red";
            return;
        }

        //hide contents
        document.getElementById("content").style.display = "none";
        document.getElementById("secondhalf").style.display = "none";

        document.getElementById("loadingscreen").style.display = "block";

        
       
        //make sure local storage is cleared calculating again
        localStorage.clear();

        //computations
        var monthcAns = (currentreadValue - previousreadValue).toFixed(2) + " / kWh";
        var totalcostAns = (costvalue * parseFloat(monthcAns)).toFixed(2) + " PHP";

        //store in local storage
        localStorage.setItem("monthlyConsumption", monthcAns);
        localStorage.setItem("totalCost", totalcostAns);
    
        // Redirect to computed.html
        setTimeout(function () {
            window.location.href = "computed.html";
        }, 5000);
}

//function to display the answers once the third page is loaded
window.onload = function () {
    let monthlyconsumpField = document.getElementById("monthlyconsump");
    let totalcostField = document.getElementById("totalcost");

    //get the values or the answers from the local storage
    const monthcAns = localStorage.getItem("monthlyConsumption");
    const totalcostAns = localStorage.getItem("totalCost");

    //update fields if values
    if (monthcAns !== null) {
        monthlyconsumpField.value = monthcAns;
    }
    if (totalcostAns !== null) {
        totalcostField.value = totalcostAns;
    }
};
