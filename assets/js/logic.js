var _complexityBtns = document.querySelectorAll(".complexity-button");
var _complexityBtn1 = document.getElementById("complexity-1");
var _complexityBtn2 = document.getElementById("complexity-2");
var _complexityBtn3 = document.getElementById("complexity-3");
var _complexityBtn4 = document.getElementById("complexity-4");
var _complexityBtn5 = document.getElementById("complexity-5");
var _interfaceBtns = document.querySelectorAll(".interface-button");
var _interfaceBtn0 = document.getElementById("interface-0");
var _interfaceBtn1 = document.getElementById("interface-1");
var _interfaceBtn2 = document.getElementById("interface-2");
var _interfaceBtn3 = document.getElementById("interface-3");
var _interfaceBtn4 = document.getElementById("interface-4");
var _interfaceBtn5 = document.getElementById("interface-5");
var _interfaceBtn6 = document.getElementById("interface-6");
var _interfaceBtn7 = document.getElementById("interface-7");
var _interfaceBtn8 = document.getElementById("interface-8");
var _interfaceBtn9 = document.getElementById("interface-9");
var _interfaceBtnC = document.getElementById("interface-C");
var _interfaceBtnE = document.getElementById("interface-E");

var _complexityLevel = 1;
var _topNumber = 0;
var _bottomNumber = 0;
var _resultTotal = 0;
var _operation = "";
var _inputs = [-1, -1, -1, -1, -1];
var _inputDigit = 0;


document.addEventListener("click", event => {
    let tagValue = event.target.dataset.number;
    let tagId = event.target.id;
    let tagType = tagId.substring(0, tagId.indexOf("-"));

    switch (tagType) {
        case "complexity":
            event.preventDefault();
            handleComplexityButton(event.target, tagValue);
            break;
        case "interface":
            event.preventDefault();
            handleInterfaceButton(event.target, tagValue);
            break;
        default:
    }
});

function handleComplexityButton(button, value) {
    _complexityBtns.forEach(tag => {
        tag.className = "complexity-button";
    });
    button.className = "complexity-button active";
    _complexityLevel = parseInt(value);

    createProblem(_complexityLevel);
}

function handleInterfaceButton(button, value) {
    console.log(button, value);
}

function createProblem(complexityLevel) {
    let topNo = Math.floor(Math.random() * 8) + 2;         // Because we want the top number to be larger than the bottom
    let bottomNo = Math.floor(Math.random() * topNo);
    let operRand = Math.random();
    let operandList = ["+", "-"];
    let totalOperandi = operandList.length;
    let operandIndex = Math.floor(operRand * totalOperandi);
    let solution = 0;
    let actualOperand = operandList[operandIndex];

    for (let i = 1; i < _complexityLevel; i++) {
        //  We start with the first digit filled, so i == 1

        topNo = topNo.toString() + Math.floor(Math.random() * 10);
        bottomNo = bottomNo.toString() + Math.floor(Math.random() * 10);
    }
        
    topNo = parseInt(topNo);
    bottomNo = parseInt(bottomNo);

    switch (actualOperand) {
        case "+":
            solution = topNo + bottomNo;
            break;
        case "-":
            solution = topNo - bottomNo;
            break;
        case "*":
            solution = topNo * bottomNo;
            break;
        case "/":
            solution = topNo / bottomNo;
            break;
        case "**":
            solution = topNo ** bottomNo;
            break;
        default:
    }
    
    _topNumber = topNo;
    _bottomNumber = bottomNo;
    _resultTotal = solution;
    _operation = actualOperand;

    console.log(_topNumber.toString() + " " + _operation + " " + _bottomNumber.toString() + " == " + _resultTotal.toString());
    displayProblem(_topNumber, _bottomNumber, _operation, _resultTotal);
}

function displayProblem(x, y, operand, solution) {
    let xTag = [
        document.getElementById("top0"),
        document.getElementById("top1"),
        document.getElementById("top2"),
        document.getElementById("top3"),
        document.getElementById("top4")
    ]
    let yTag = [
        document.getElementById("btm0"),
        document.getElementById("btm1"),
        document.getElementById("btm2"),
        document.getElementById("btm3"),
        document.getElementById("btm4")
    ]
    let solTag = [
        document.getElementById("sol0"),
        document.getElementById("sol1"),
        document.getElementById("sol2"),
        document.getElementById("sol3"),
        document.getElementById("sol4"),
        document.getElementById("sol5")
    ]
    let opTag = document.getElementById("op");

    //          Clear Tags
    xTag.forEach(tag => tag.textContent = "");
    yTag.forEach(tag => tag.textContent = "");
    solTag.forEach(tag => tag.textContent = "");
    opTag.textContent = "";

    //          Set Tags
    let xString = x.toString();
    let xTagIdx = xTag.length - 1;
    if (xString.length > xTag.length) {
        xString = xString.substr(xString.length - xTag.length);
        x = parseInt(xString);
    }
    for (let xIdx = xString.length - 1; xIdx > -1; xIdx--) {
        xTag[xTagIdx].textContent = xString[xIdx];
        xTagIdx--;
    }

    let yString = y.toString();
    let yTagIdx = yTag.length - 1;
    if (yString.length > yTag.length) {
        yString = yString.substr(yString.length - yTag.length);
        y = parseInt(yString);
    }
    for (let yIdx = yString.length - 1; yIdx > -1; yIdx--) {
        yTag[yTagIdx].textContent = yString[yIdx];
        yTagIdx--;
    }

/*     
    let solString = solution.toString();
    let solTagIdx = solTag.length - 1;
    if (solString.length > solTag.length) {
        solString = solString.substr(solString.length - solTag.length);
        solution = parseInt(solString);
    }
    for (let solIdx = solString.length - 1; solIdx > -1; solIdx--) {
        solTag[solTagIdx].textContent = solString[solIdx];
        solTagIdx--;
    }
 */

    opTag.textContent = operand;
}

function addInput(newInput) {

}

function clearInput() {
    _inputs = [-1, -1, -1, -1, -1];
}

function displayInput(inputs) {

}

function getInput() {
    let returnInteger = -1;
    let compileString = "";
    for (let i = 0; i <= _maxDigit; i++) {
        if (_inputs[i] > -1) {
            compileString += _inputs[i].toString();
        }
    }
    if (compileString !== "") {
        returnInteger = parseInt(compileString);
    }
    return returnInteger;
}