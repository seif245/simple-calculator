// class calculator
class Calculator {

    constructor(curElm,preElm){
        this.preElm = preElm;
        this.curElm = curElm;
        this.clear();
    }

    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined ;
    }



    apendNum(number){
        if(number === "." && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString() 
    }

    choseOpr(operation){
        if (this.current === '') return
        if (this.previous !== '') {
        this.calc()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    calc(){
        let comput
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
        case '+':
            comput = prev + curr
            break
        case '-':
            comput = prev - curr
            break
        case '*':
            comput = prev * curr
            break
        case '÷':
            comput = prev / curr
            break
        case '%':
            comput = prev % curr
            break
        default:
            return
        }
        this.current = comput
        this.operation = undefined
        this.previous = ''
    }

    disNum(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
  }
    

    update(){
            this.curElm.innerText = this.disNum(this.current)
        if (this.operation != null) {
        this.preElm.innerText = `${this.disNum(this.previous)} ${this.operation}`
        } else {
        this.preElm.innerText = ''
        }
         
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
      }


}




const numBtns = document.querySelectorAll('[data-num]');
const oprBtns = document.querySelectorAll('[data-operation]');
//single button
const equalBtn = document.querySelector("[data-equal]");
const delBtn = document.querySelector("[data-del]");
const preElm = document.querySelector("[data-previous]");
const curElm = document.querySelector("[data-current]");
const clrBtn = document.querySelector("[data-clear]");


const calculator = new Calculator(curElm,preElm);

numBtns.forEach(element => {
    element.addEventListener('click',() => {
        calculator.apendNum(element.innerText);
        calculator.update();
    })
    
});


oprBtns.forEach(element => {
    element.addEventListener('click',() => {
        calculator.choseOpr(element.innerText);
        calculator.update();
    })
    
});

equalBtn.addEventListener('click', button => {
    calculator.calc()
    calculator.update()
  })
  
  clrBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
  })
  
  delBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.update()
  })
