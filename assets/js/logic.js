const _complexityBtns = document.querySelectorAll(".complexity-button");
const _complexityBtn1 = document.getElementById("complexity-1");
const _complexityBtn2 = document.getElementById("complexity-2");
const _complexityBtn3 = document.getElementById("complexity-3");
const _complexityBtn4 = document.getElementById("complexity-4");
const _complexityBtn5 = document.getElementById("complexity-5");
const _interfaceBtns = document.querySelectorAll(".interface-button");
const _interfaceBtn0 = document.getElementById("interface-0");
const _interfaceBtn1 = document.getElementById("interface-1");
const _interfaceBtn2 = document.getElementById("interface-2");
const _interfaceBtn3 = document.getElementById("interface-3");
const _interfaceBtn4 = document.getElementById("interface-4");
const _interfaceBtn5 = document.getElementById("interface-5");
const _interfaceBtn6 = document.getElementById("interface-6");
const _interfaceBtn7 = document.getElementById("interface-7");
const _interfaceBtn8 = document.getElementById("interface-8");
const _interfaceBtn9 = document.getElementById("interface-9");
const _interfaceBtnC = document.getElementById("interface-C");
const _interfaceBtnE = document.getElementById("interface-E");
const _resultBanner = document.getElementById("result-banner");
const _resultTag = document.getElementById("result-tag");
const _timerTag = document.getElementById("timer-counter");

const _STATUS_SUCCESS = 1;
const _STATUS_INPROGRESS = 0;
const _STATUS_FAILURE = -1;
const _TIMER_INTERVAL = 1000;
const _TIMER_LENGTHS = [10, 30, 60, 90, 150];

var _complexityLevel = 1;
var _topNumber = 0;
var _bottomNumber = 0;
var _resultTotal = 0;
var _operation = "";
var _inputs = [];
var _timer = null;
var _timerCounter = 0;
var _timerLength = 0;
var _status = _STATUS_INPROGRESS;                       

setupComplexity();

_complexityBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        handleComplexityButton(event);
    });    
});
_interfaceBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        handleInterfaceButton(event);
    });
});
document.addEventListener("keyup", event => {
    handleInterfaceKeypress(event);
});

function handleComplexityButton(event) {
    let tagValue = event.target.dataset.number;

    _complexityBtns.forEach(tag => {
        tag.className = "complexity-button";
    });
    event.target.className = "complexity-button active";
    _complexityLevel = parseInt(tagValue);

    createProblem(_complexityLevel);
}

function handleInterfaceButton(event) {
    let tagValue = event.target.dataset.number;

    if ((_status != _STATUS_INPROGRESS) || !tagValue) {
        return;
    }

    routeInterfaceCall(tagValue);
}

function handleInterfaceKeypress(event) {
    let keyValue = event.key;
    console.log(keyValue);

    if ((_status != _STATUS_INPROGRESS) || !keyValue) {
        return;
    }

    routeInterfaceCall(keyValue);
}

function routeInterfaceCall(inputValue) {
    if (inputValue.toUpperCase() == "C") {
        clearInput(_inputs);

    } else if ((inputValue.toUpperCase() == "E") || (inputValue == "Enter")) {
        enterInput(_inputs, _resultTotal);

    } else if ((inputValue == "Backspace")) {
        deleteInput(_inputs);

    } else if (!isNaN(inputValue)) {
        addInput(_inputs, inputValue, _complexityLevel + 1);
    }
}

function setupComplexity() {
    _complexityBtns.forEach(tag => {
        tag.className = "complexity-button";
    });
    _complexityBtn1.className = "complexity-button active";
    _complexityLevel = 1;

    createProblem(_complexityLevel);
}

function setupCounter(timeoutValue) {
    _timer = window.setInterval(handleInterval, _TIMER_INTERVAL);
    _timerLength = timeoutValue + 1;
}

function clearCounter() {
    window.clearInterval(_timer);
    _timerCounter = 0;
    _timerTag.textContent = "";
    _timerTag.className = "";
}

function handleInterval() {
    _timerCounter++;

    if (_timerCounter > _timerLength) {
        clearCounter();
        handleTimerOut();
    } else {
        if (_timerCounter == Math.floor(_timerLength * 0.5)) {
            _timerTag.className = "warning";
        } else if (_timerCounter == Math.floor(_timerLength * 0.75)) {
            _timerTag.className = "danger";
        }

        displayCounter();
    }
}

function displayCounter() {
    let counterValue = _timerLength - _timerCounter;

    _timerTag.textContent = counterValue;
}

function handleTimerOut() {
    _timerTag.textContent = "";
    _resultTag.textContent = "TIME OUT!";
    _resultBanner.className = "failure";
    _resultBanner.style.display = "flex";
}

function createProblem(complexityLevel) {
    clearCounter();
    clearInput();
    _status = _STATUS_INPROGRESS;

    let topNo = Math.floor(Math.random() * 8) + 2;         // Because we want the top number to be larger than the bottom
    let bottomNo = Math.floor(Math.random() * topNo);
    let operRand = Math.random();
    let operandList = ["+", "-"];
    let totalOperandi = operandList.length;
    let operandIndex = Math.floor(operRand * totalOperandi);
    let solution = 0;
    let actualOperand = operandList[operandIndex];
    let timerLength = _TIMER_LENGTHS[complexityLevel - 1];

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

    // console.log(_topNumber.toString() + " " + _operation + " " + _bottomNumber.toString() + " == " + _resultTotal.toString());
    displayProblem(_topNumber, _bottomNumber, _operation);

    setupCounter(timerLength);
}

function displayProblem(x, y, operand) {
    _resultBanner.style.display = "none";
    _resultBanner.className = "";
    _resultTag.textContent = "";

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

    opTag.textContent = operand;
}

function addInput(inputArray, newInput, maxDigits) {
    if (inputArray.length < maxDigits) {
        inputArray.push(newInput);
        displayInput(inputArray);
    }
}

function clearInput() {
    _inputs = [];
    displayInput(_inputs);
}

function deleteInput(inputArray) {
    inputArray.pop();
    displayInput(inputArray);
}

function displayInput(inputArray) {
    let solTag = [
        document.getElementById("sol0"),
        document.getElementById("sol1"),
        document.getElementById("sol2"),
        document.getElementById("sol3"),
        document.getElementById("sol4"),
        document.getElementById("sol5")
    ]
    let arrayLength = inputArray.length;
    let tagArrayLength = solTag.length;

    solTag.forEach(tag => {
        tag.textContent = "";
    });

    for (let i = 1; i <= arrayLength; i++) {
        solTag[tagArrayLength - i].textContent = inputArray[arrayLength - i];
    }
}

function enterInput(inputArray, solution) {
    clearCounter();

    let inputValue = getInput(inputArray);

    if (inputValue == solution) {
        _status = _STATUS_SUCCESS;
        _resultTag.textContent = "SUCCESS!";
        _resultBanner.className = "success";
        _resultBanner.style.display = "flex";

    } else {
        _status = _STATUS_FAILURE;
        _resultTag.textContent = "FAILURE!";
        _resultBanner.className = "failure";
        _resultBanner.style.display = "flex";
    }
}

function getInput(inputArray) {
    let returnInteger = -1;
    let compileString = "";

    for (let i = 0; i < inputArray.length; i++) {
        compileString += inputArray[i].toString();
    }
    if (compileString !== "") {
        returnInteger = parseInt(compileString);
    }

    return returnInteger;
}