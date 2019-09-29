document.addEventListener("DOMContentLoaded", function(){
  const digits = document.querySelectorAll(".digit"),
        simpleOperators = document.querySelectorAll(".sign"),
        difficultOperators = document.querySelectorAll(".difficult"),
        equally = document.querySelector(".equally"),
        actions = document.querySelectorAll(".act"),
        memoryBtn = document.querySelectorAll(".memory-item"),
        display = document.querySelector(".display"),
        displayOperand = document.querySelector(".display-operand"),
        btnDisplay = document.querySelector(".btn"),
        mainBlock = document.querySelector(".main-block"),
        header = document.querySelector(".header"),
        calculator = document.querySelector(".calculator");
  let result = 0,
      memoryResult,
      sign;
  display.value = "";
  displayOperand.value = "";
  // hide and show Calculator
  btnDisplay.addEventListener("click", () => mainBlock.classList.toggle("hide"));
  header.addEventListener("mousedown", event => {
    header.ondragstart = function() {
      return false;
    };
    function moveTo(x, y){
      calculator.style.left = x - event.layerX +"px";
      calculator.style.top = y - event.layerY  +"px";
      console.log(event, x);
    }
    function mouseMove(event){
      moveTo(event.pageX, event.pageY);
    }
    document.addEventListener("mousemove", mouseMove);
    header.onmouseup = function(){
      document.removeEventListener("mousemove", mouseMove);
      header.onmouseup = null;
    };
  });

  // digit handler
  digits.forEach(e => e.addEventListener("click", event => {
    checkInput(display.value) < 10 && !(display.value == "0" && event.target.textContent == "0") ? display.value += event.target.textContent : false;
  } ));

  // simple operators handler
  simpleOperators.forEach(e => e.addEventListener("click", event => {
    if(checkInput(display.value) && displayOperand.value.length < 1 ){
      result = parseFloat(display.value);
      sign = event.target.textContent;
      displayOperand.value = result + sign;
      display.value = "";
    } else if(checkInput(displayOperand.value)){
        result = getResult(sign, result, parseFloat(display.value));
        sign = event.target.textContent;
        displayOperand.value = result + sign;
        display.value = "";
    }
  }));

  // difficult operators handler
  const operatorHandler = {
    "√" : function(){
      if(checkInput(display.value)){
      display.value = Math.sqrt(parseFloat(display.value));
      }
    },
    "%" : function(){
      if(checkInput(displayOperand.value)&& checkInput(display.value) && display.value != "0"){
        let per = result / 100 * display.value;
        display.value = per;
      }
    },
    "x²" : function(){
      if(checkInput(display.value)){
        display.value = parseFloat(display.value)*parseFloat(display.value);
      }
    }
  };
  difficultOperators.forEach(e => e.addEventListener("click", event => {
    const operator = event.target.textContent;
          operatorHandler[operator]();
  }));

  // equally handler
  equally.addEventListener("click", event => {
    if(checkInput(displayOperand.value)){
      result = getResult(sign, result, parseFloat(display.value));
      displayOperand.value = "";
      display.value = result;
    }
  });
  // actions handler
  const actionsHandler = {
    "±": function(){
      display.value = -display.value;
    },
    ".": function(){
      if(checkInput(display.value) && display.value.indexOf(".") == -1){
         display.value += ".";
      }
    },
    "⇐" : function(){
      display.value = display.value.slice(0, display.value.length-1);
    },
    "CE" : function(){
      display.value = "";
    },
    "C" : function(){
      display.value = "";
      displayOperand.value = "";
      sign = "";
      result = 0;
    }
  };
  actions.forEach(e => e.addEventListener("click", event => {
    const act = event.target.textContent;
    actionsHandler[act]();
  }));
  // memory handler
  const memoryHandler = {
    "MC": function(){
      memoryResult = undefined;
    },
    "MR" : function(){
      if(memoryResult !== undefined){
        display.value = memoryResult;
      }
    },
      "M+": function(){
        if(memoryResult && checkInput(display.value)){
          memoryResult += parseFloat(display.value);
        }
      },
      "M-" : function(){
        if(memoryResult && checkInput(display.value)){
          memoryResult -= parseFloat(display.value);
        }
      },
      "MS" : function(){
        if(checkInput(display.value)){
          memoryResult = parseFloat(display.value);
        }
      }
    };
  memoryBtn.forEach(e => e.addEventListener("click", event => {
    const mBtn = event.target.textContent;
    memoryHandler[mBtn]();
  }));

  // some function
  function checkInput(inp){
    return inp.length > 0;
  }
  function getResult(sign, res, num){
    if((res == 0 && sign == "÷") || (num == 0 && sign == "÷")){
       alert("Нельзя делить на ноль или делить ноль");
       return 0;
    }
    const actWithSigns = {
      "+" : res + num,
      "-" : res - num,
      "÷" : res / num,
      "x" : res * num
    };
    return actWithSigns[sign];
  }
});
