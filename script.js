// функция для перемешивания элементов массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// массив для хранения карты цветов клеток
let indexColors = [];

// выводит секунды, минуты и миллисекунды с нужным количеством нулей
function add0 (x, y) {let s = '00' + x; return s.substr (s.length - y)}

// переменные для обслуживания секундомера
let RAF;
let startTime;

// функция, реализующая тик секндомера и изменение отображаемых цифр
function Tick ()
{
    let ms = Date.now() - startTime;
    let S = Math.floor(ms / 1000);
    ms = ms % 1000;
    let M = Math.floor(S / 60);
    S = S % 60;

    // TODO: переделать для соответствия стандарту оформления кода
    document.querySelector("#timer").textContent = [add0(M, 2), add0(S, 2), add0(ms, 3)].join (':');
    RAF = requestAnimationFrame(Tick);
}

//обработчик кнопки старт
let btn = document.querySelector('#btn');
btn.addEventListener("click", function(){
    // TODO: Добавить обнуление таймера и карты клеток при повторном запуске


    startTime = Date.now();
    Tick();
    // пропишем ячейкам таблицы обработчик клика
    let arrayTd = document.querySelectorAll('td');
    for (let i = 0; i < arrayTd.length; i++) {
        arrayTd[i].addEventListener('click', clickHandler);
        arrayTd[i].className="";
    }

    // промежуточный массив для обеспесения случайности пар цветов
    let randColors = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    shuffle(randColors);
    let q = 0;
    for (let i = 0; i < 4; i++){
        let tempColors = [];
        for (let j = 0; j < 4; j++){
            tempColors.push(randColors[q]);
            q+=1;
        }
        indexColors.push(tempColors);
    }
});



function clickHandler(event) {
    event.preventDefault();

    // проверка, не является ли кликнутая клетка уже открытой или из разблокированной пары
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
                if (document.querySelectorAll(".stable").length>=16){
                    cancelAnimationFrame(RAF);
                    window.alert("Вы выиграли!\nЗатраченное время: "+document.querySelector("#timer").textContent);
                }

            }
            else{
                console.log("color not ok");
                this.classList.add("color"+indexColors[rowIndex][cellIndex]);
                let currentCell = this;

                // таймаут для задержки, чтоб пользователь увидел как прорисовывается и пропадает неправильная пара цветов
                setTimeout(function(){
                    currentCell.classList.remove("color"+indexColors[rowIndex][cellIndex]);
                    openCell.classList.remove("open");
                    openCell.classList.remove("color"+indexColors[openRowIndex][openCellIndex]);
                },400);
            }
        }
        else{
            this.classList.add("open");
            const str = "color"+indexColors[rowIndex][cellIndex];
            this.classList.add("color"+indexColors[rowIndex][cellIndex]);
        }
    }


}

