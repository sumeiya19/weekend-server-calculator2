let currentOperator;

// Takes an operator directly
let selectOperator = (op) => {
    currentOperator = op;
    console.log("current operator is...", currentOperator);
};

function getCalculations(){
    console.log("getCalculations is working...");
    //Axios
    axios({
        method: "GET",
        url: "/calculations"
    })
    .then((response) => {
        console.log("response.data from /calculations:", response.data);
    })
    .catch((error) => {
        console.error("There was an error on GET /calculations", error)
    })
}

getCalculations()

// POST route

function postCalculations(event){
    event.preventDefault()
    console.log("New postCalculations created...");

    let numOne = document.getElementById("numOne").value
    let numTwo = document.getElementById("numTwo").value

    let newCalculations = {
        num1: numOne,
        num2: numTwo, 
        operator: currentOperator
    }
    console.log("New calculations to send...", newCalculations);

    // Axios POST request
    axios({
        method: "POST",
        url: "/calculations",
        data: newCalculations
    })
    .then((response) => {
        console.log("POST /calculations works!!");

        getCalculations()
    })
    .catch((error) => {
        console.error("There was an error on POST /calculations", error)
            alert("POST /calculations didn't work...")
    })
}

//Render function to display history on the DOM

    function renderHistory(calculations){
        console.log("renderHistory() works", calculations);
    }
    renderHistory()


