function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let indexColors = [];
let randColors = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
shuffle(randColors);
let q=0;
for (let i = 0; i < 4; i++){
    let tempColors = [];
    for (let j = 0; j < 4; j++){
        tempColors.push(randColors[q]);
        q+=1;
    }
    indexColors.push(tempColors);
}

console.log(indexColors);
console.log(indexColors[0][0]);
let btn = document.querySelector('#btn');
btn.addEventListener("click", function(){

});

let arrayTd = document.querySelectorAll('td');

for (let i = 0; i < arrayTd.length; i++) {
    arrayTd[i].addEventListener('click', clickHandler);
}

function clickHandler(event) {
    event.preventDefault();
    if (this.classList.contains('stable')||(this.classList.contains('open'))){
        return;
    }
    else{
        let cellIndex = this.cellIndex;
        let rowIndex = this.parentNode.rowIndex;
        if (document.querySelectorAll(".open").length>0){
            let openCell = document.querySelector(".open");
            let openCellIndex = openCell.cellIndex;
            let openRowIndex = openCell.parentNode.rowIndex;
            if (indexColors[rowIndex][cellIndex] == indexColors[openRowIndex][openCellIndex]){
                this.classList.add("stable");
                this.classList.add("color"+indexColors[rowIndex][cellIndex]);
                openCell.classList.add("stable");
                openCell.classList.remove("open");
            }
            else{
                console.log("color not ok");
                this.classList.add("color"+indexColors[rowIndex][cellIndex]);
                let currentCell = this;
                setTimeout(function(){
                    currentCell.classList.remove("color"+indexColors[rowIndex][cellIndex]);
                    openCell.classList.remove("open");
                    openCell.classList.remove("color"+indexColors[openRowIndex][openCellIndex]);
                },400);
            }
        }
        else{
            this.classList.add("open");
            const str="color"+indexColors[rowIndex][cellIndex];
            this.classList.add("color"+indexColors[rowIndex][cellIndex]);
        }
    }


}

