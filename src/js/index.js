let mapWidth = 2000;
let mapHeight = 2000;

let map = [mapWidth];

let positionX = mapWidth/2;
let positionY = mapHeight/2;

let destinationX;
let destinationY;

let moveTimer;

let cellSize = 33;

let timeStep = 100;

let grid;

let possibleGreen = 'ABC';
let possibleTrees = 'XYZ';

export function generateMap() {

    for (let i = 0; i < mapWidth; i++) {

        map[i] = [mapHeight];
        for (let j = 0; j < mapHeight; j++) {

            let random = Math.random() * 1000;
            map[i][j] = '';

            if (random >= 995)
                map[i][j] = possibleTrees.charAt(Math.floor(Math.random() * possibleTrees.length));
            else if (random > 950)
                map[i][j] = possibleGreen.charAt(Math.floor(Math.random() * possibleGreen.length));
        }
    }
}

generateMap();

let time = new Date().getMilliseconds();

let startRender = function (direction) {

    console.log('startRender');

    time = new Date().getMilliseconds();

    // document.getElementById('grid').classList.add(direction);

    renderGrid()
}

// let forest = document.getElementById('forest')
let forest = document.body

function renderGrid() {

    console.log('renderGrid');

    console.log(new Date().getMilliseconds() - time);

    let size = cellSize;

    forest.innerHTML = '';

    let ratioW = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / size),
        ratioH = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / size);

    // console.log(ratioW % 2 === 0);

    if (ratioW % 2 === 0) {
        ratioW = ratioW - 1;
    }

    if (ratioH % 2 === 0) {
        ratioH = ratioH - 1;
    }

    let centerX = parseInt(ratioW/2);
    let centerY = parseInt(ratioH/2);

    // console.log('ratioW: ' + ratioW)
    // console.log('ratioW: ' + ratioH)

    grid = document.createElement('div');
    grid.id = 'grid';

    grid.addEventListener("animationend", function() {renderGrid()});

    grid.style.width = (ratioW * size) + 'px';
    grid.style.height = (ratioH * size) + 'px';

    let center;

    for (let j = 0; j < ratioH; j++) {

        for (let i = 0; i < ratioW; i++) {

            let cell = document.createElement('div');
            // cell.style.height = (size) + 'px';
            // cell.style.width = (size) + 'px';
            // cell.style['line-height'] = (size) + 'px';
            cell.classList.add('cell');
            cell.id = i + 'x' + j;
            cell.onclick = function() { move(i + positionX - centerX, j + positionY - centerY); };

            let letter = '';
            if (typeof map[i + positionX - centerX] !== 'undefined' && typeof map[i + positionX - centerX][j + positionY - centerY] !== 'undefined')
                letter = map[i + positionX - centerX][j + positionY - centerY];

            cell.innerHTML = letter;

            if (letter === 'X') {
                cell.innerHTML = '<img style="width: 150px;" src="./images/forest/100.png">';
                // cell.style = 'background: red'
            }

            if (letter === 'Y') {
                cell.innerHTML = '<img style="width: 120px" src="./images/forest/100f.png">';
            }

            if (letter === 'Z') {
                cell.innerHTML = '<img style="width: 120px" src="./images/forest/100r.png">';
            }

            if (letter === 'A') {
                cell.innerHTML = '<img style="width: 40px" src="./images/forest/10.png">';
            }

            if (letter === 'B') {
                cell.innerHTML = '<img style="width: 50px" src="./images/forest/30.png">';
            }

            if (letter === 'C') {
                cell.innerHTML = '<img style="width: 70px" src="./images/forest/50.png">';
            }

            if (letter.length > 1)
                cell.classList.add('item');

            //center
            if (i === centerX && j === centerY) {
                // console.log(i + ' ' + j)
                center = cell;
                // center.innerHTML = '';
                center.setAttribute("contenteditable", "true");
                center.classList.add('center');
                cell.innerHTML += '<img style="width: 33px" src="./images/forest/raccoon.png">';
            }

            // //tail
            // for (let t = 0; t < positionTailX.length; t++) {
            //
            //     if (i + positionX - centerX === positionTailX[t] && j + positionY - centerY === positionTailY[t]) {
            //         // console.log(i + ' ' + j)
            //         // center = cell;
            //         // center.setAttribute("contenteditable", "true");
            //         cell.innerHTML = positionTailZ[t];
            //         cell.classList.add('tail');
            //     }
            // }


            if (i + positionX - centerX === destinationX && j + positionY - centerY === destinationY) {
                // console.log(i + ' ' + j)
                cell.classList.add('destination');
            }

            grid.appendChild(cell);
        }
    }



    forest.appendChild(grid);
    // document.body.appendChild(renderInfo());

    // grid.classList.add('render');
}

function smooth(direction) {

    return;
    // grid.style['padding-right'] = '33px';
    grid.classList.add(direction);
}

renderGrid();

function move(i, j) {

    destinationX = i;
    destinationY = j;

    moveScreen();
}

function moveScreen() {

    console.log(positionX + 'x' + positionY);
    console.log(destinationX + 'x' + destinationY);

    if (positionX < destinationX && map[positionX + 1][positionY] === '' || (positionX + 1 === destinationX && positionY === destinationY)) {
        // moveTail();
        positionX = positionX + 1;
        moveTimer = setTimeout(moveScreen, timeStep);
        renderGrid();
        // startRender('right');
        return;
    }

    if (positionY < destinationY && map[positionX][positionY + 1] === '' || (positionX === destinationX && positionY + 1 === destinationY)) {
        // moveTail();
        positionY = positionY + 1;
        moveTimer = setTimeout(moveScreen, timeStep);
        renderGrid();
        // startRender('top');
        return;
    }

    if (positionX > destinationX && map[positionX - 1][positionY] === '' || (positionX - 1 === destinationX && positionY === destinationY)) {
        // moveTail();
        positionX = positionX - 1;
        moveTimer = setTimeout(moveScreen, timeStep);
        renderGrid();
        // startRender('left');
        return;
    }

    if (positionY > destinationY && map[positionX][positionY - 1] === '' || (positionX === destinationX && positionY - 1 === destinationY)) {
        // moveTail();
        positionY = positionY - 1;
        moveTimer = setTimeout(moveScreen, timeStep);
        renderGrid();
        // startRender('bottom');
        return;
    }

    destinationX = null;
    destinationY = null;
}

document.addEventListener("keydown", function(event) {

    // console.log(event.which);

    if (event.which === 39) {
        // moveTail();
        positionX = positionX + 1;
        startRender('right');
    }

    if (event.which === 37) {
        // moveTail();
        positionX = positionX - 1;
        startRender('left');
    }

    if (event.which === 40) {
        // moveTail();
        positionY = positionY + 1;
        startRender('top');
    }

    if (event.which === 38) {
        // moveTail();
        positionY = positionY - 1;
        startRender('bottom');
    }
});

