let line = document.getElementById("line")
let currentPlayer = "X"
let win = '';
const gagner = document.querySelector("#GameOver")
let gagnant = false
let égalité = false
let tableau = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
];


function grille() {
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            let div = document.createElement("div")
            line.appendChild(div)
            div.classList.add('KevinTheGoat')
            div.addEventListener('click', () => play(j)) 
        }
    }
}
grille()


function play(column) {
    if (gagnant) return; 
    

    let row = tableau.length - 1;
    while (row >= 0 && tableau[row][column] !== "") {
        row--;
    }

 
    if (row < 0) return;


    tableau[row][column] = currentPlayer;
    let cell = document.querySelectorAll('.KevinTheGoat')[(row * tableau[0].length) + column];
    cell.textContent = currentPlayer;


    currentPlayer = currentPlayer === "X" ? "O" : "X";


    checkGagner(row, column);
    if (matchNul()) {
        gagner.textContent = "Match Nul";
    }
}


function checkGagner(row, col) {
    const directions = [
        { x: 1, y: 0 },   
        { x: 0, y: 1 },  
        { x: 1, y: 1 },   
        { x: 1, y: -1 }   
    ];

    for (const direction of directions) {
        if (checkDirection(row, col, direction.x, direction.y)) {
            gagner.textContent = "Les " + tableau[row][col] + " ont gagné";
            gagnant = true;
            return;
        }
    }
}


function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    let player = tableau[row][col];

   
    for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;
        if (newRow < 0 || newRow >= tableau.length || newCol < 0 || newCol >= tableau[0].length || tableau[newRow][newCol] !== player) break;
        count++;
    }


    for (let i = 1; i < 4; i++) {
        const newRow = row - i * rowDir;
        const newCol = col - i * colDir;
        if (newRow < 0 || newRow >= tableau.length || newCol < 0 || newCol >= tableau[0].length || tableau[newRow][newCol] !== player) break;
        count++;
    }

    return count >= 4;
}


function matchNul() {
    for (let row = 0; row < tableau.length; row++) {
        for (let col = 0; col < tableau[row].length; col++) {
            if (tableau[row][col] === "") return false;
        }
    }
    return true;
}


function resetJeu() {
    tableau = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];
    let buttons = document.querySelectorAll(".KevinTheGoat");
    buttons.forEach(button => {
        button.textContent = "";
    });
    gagnant = false;
    gagner.textContent = "";
}
