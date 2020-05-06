let canvas = document.getElementById("canvas"),
c = canvas.getContext("2d");
canvas.addEventListener('click', handleClick);

const numero1 = [
    ['*', '*', '#', '*', '*'],
    ['*', '#', '#', '*', '*'],
    ['*', '*', '#', '*', '*'],
    ['*', '*', '#', '*', '*'],
    ['*', '*', '#', '*', '*'],
    ['*', '*', '#', '*', '*'],
    ['*', '#', '#', '#', '*'],
  ];
 
  const numero2 = [
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '#', '*'],
   ['*', '*', '#', '*', '*'],
   ['*', '#', '*', '*', '*'],
   ['#', '#', '#', '#', '#'],
 ];
 
 const numero3 = [
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '#', '#', '*'],
   ['*', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '*'],
 ];
 
 const numero4 = [
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '#', '#'],
   ['*', '*', '#', '*', '#'],
   ['*', '#', '*', '*', '#'],
   ['#', '#', '#', '#', '#'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '*', '#'],
 ];
 
 const numero5 = [
   ['#', '#', '#', '#', '#'],
   ['#', '*', '*', '*', '*'],
   ['#', '*', '*', '*', '*'],
   ['#', '#', '#', '#', '*'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '*', '#'],
   ['#', '#', '#', '#', '*'],
 ];
 
 const numero6 = [
   ['*', '#', '#', '#', '#'],
   ['#', '*', '*', '*', '*'],
   ['#', '*', '*', '*', '*'],
   ['#', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '*'],
 ];
 
 const numero7 = [
   ['#', '#', '#', '#', '#'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '#', '*'],
   ['*', '*', '*', '#', '*'],
   ['*', '*', '#', '*', '*'],
   ['*', '*', '#', '*', '*'],
   ['*', '#', '*', '*', '*'],
 ];
 
 const numero8 = [
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '*'],
 ];
 
 const numero9 = [
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '#'],
   ['*', '*', '*', '*', '#'],
   ['*', '*', '*', '*', '#'],
   ['#', '#', '#', '#', '*'],
 ];
 
 const numero0 = [
   ['*', '#', '#', '#', '*'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['#', '*', '*', '*', '#'],
   ['*', '#', '#', '#', '*'],
 ];

 let canvasNumber = [
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*']
 ]

function drawBox() {
    c.beginPath();
    c.lineWidth = 3;
    c.strokeStyle = 'black';
    c.fillStyle = "white"
    for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
            let x = column * 50;
            let y = row * 50;
            c.rect(x, y, 50, 50);
            c.fill();
            c.stroke();
        }   
    }
    c.closePath();
}

function handleClick(e) {
    let positionX = Math.floor(e.offsetX/50)
    let positionY = Math.floor(e.offsetY/50)

    canvasNumber[positionY][positionX] = canvasNumber[positionY][positionX] == '*' ? '#' : '*'
    updateCell(positionX, positionY)
}

function updateCell(x, y){    
    c.fillStyle = canvasNumber[y][x] == '*' ? "white" : "black"

    c.lineWidth = 3;
    c.strokeStyle = 'black';

    c.fillRect(x * 50, y * 50, 50, 50);
    c.stroke();
}

document.getElementById('select_number').addEventListener('change', function() {
    switch (this.value){
        case '0':
            canvasNumber = angular.copy(numero0);
            break;
        case '1': 
            canvasNumber = angular.copy(numero1);
            break;
        case '2': 
            canvasNumber = angular.copy(numero2);
            break;
        case '3': 
            canvasNumber = angular.copy(numero3);
            break;
        case '4': 
            canvasNumber = angular.copy(numero4);
            break;
        case '5': 
            canvasNumber = angular.copy(numero5);
            break;
        case '6':
            canvasNumber = angular.copy(numero6);
            break;
        case '7': 
            canvasNumber = angular.copy(numero7);
            break;
        case '8': 
            canvasNumber = angular.copy(numero8);
            break;
        case '9': 
            canvasNumber = angular.copy(numero9);
            break;
    }

    for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
            updateCell(column, row)
        }   
    }
  });

function getCanvasNumber(){
  console.log(canvasNumber)
}
