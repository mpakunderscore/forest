// function smooth(direction) {
//
//     return;
//     // grid.style['padding-right'] = '33px';
//     // grid.classList.add(direction);
// }
//
// function move(x, y) {
//     setDestinationX(x)
//     setCurrentPositionY(y)
//     moveScreen();
// }
//
// function moveScreen() {
//
//     console.log(currentPositionX + ':' + currentPositionY);
//     console.log(destinationX + ':' + destinationY);
//
//     if (currentPositionX < destinationX && map[currentPositionX + 1][currentPositionY] === '' || (currentPositionX + 1 === destinationX && currentPositionY === destinationY)) {
//         // moveTail();
//         setCurrentPositionX(currentPositionX + 1);
//         moveTimer = setTimeout(moveScreen, timeStep);
//         renderGrid();
//         // startRender('right');
//         return;
//     }
//
//     if (currentPositionY < destinationY && map[currentPositionX][currentPositionY + 1] === '' || (currentPositionX === destinationX && currentPositionY + 1 === destinationY)) {
//         // moveTail();
//         setCurrentPositionY(currentPositionY + 1);
//         moveTimer = setTimeout(moveScreen, timeStep);
//         renderGrid();
//         // startRender('top');
//         return;
//     }
//
//     if (currentPositionX > destinationX && map[currentPositionX - 1][currentPositionY] === '' || (currentPositionX - 1 === destinationX && currentPositionY === destinationY)) {
//         // moveTail();
//         setCurrentPositionX(currentPositionX - 1);
//         moveTimer = setTimeout(moveScreen, timeStep);
//         renderGrid();
//         // startRender('left');
//         return;
//     }
//
//     if (currentPositionY > destinationY && map[currentPositionX][currentPositionY - 1] === '' || (currentPositionX === destinationX && currentPositionY - 1 === destinationY)) {
//         // moveTail();
//         setCurrentPositionY(currentPositionY - 1);
//         moveTimer = setTimeout(moveScreen, timeStep);
//         renderGrid();
//         // startRender('bottom');
//         return;
//     }
//
//     setDestinationX(null)
//     setDestinationY(null)
// }
//
// document.addEventListener("keydown", function(event) {
//
//     // console.log(event.which);
//
//     if (event.which === 39) {
//         // moveTail();
//         setCurrentPositionX(currentPositionX + 1)
//         renderGrid();
//     }
//
//     if (event.which === 37) {
//         // moveTail();
//         setCurrentPositionX(currentPositionX - 1);
//         renderGrid();
//     }
//
//     if (event.which === 40) {
//         // moveTail();
//         setCurrentPositionY(currentPositionY + 1);
//         renderGrid();
//     }
//
//     if (event.which === 38) {
//         // moveTail();
//         setCurrentPositionY(currentPositionY - 1);
//         renderGrid();
//     }
// });
