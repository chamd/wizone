var row = 0;
var col = 0;
var wh = 13;
var mainColor = "#cccccc";
var colorsOn = false;
var colorsNum = 0;
var colors2Num = 0;
var canMove = true;
var map = 0;

var colors = {
    "1": {
        "1": "#d9598c",
        "3": "#f1d2e7",
        "5": "#f3aa51",
        "7": "#fcf695",
        "9": "#567ace",
        "11": "#b7d3e9"
    },
    "11": {
        "1": "#bbb0dc",
        "3": "#db706c",
        "5": "#f1c3aa",
        "7": "#cee5d5",
        "9": "#ffffff",
        "11": "#a7e0e1"
    }
}

var colors1 = {
    "1": {
        "1": "#bbb0dc",
        "3": "#f1d2e7",
        "5": "#db706c",
        "7": "#fcf695",
        "9": "#a7e0e1",
        "11": "#cee5d5"
    },
    "11": {
        "1": "#ffffff",
        "3": "#b7d3e9",
        "5": "#f1c3aa",
        "7": "#f3aa51",
        "9": "#567ace",
        "11": "#d9598c"
    }
}

var colors2 = {
    "2": "#bbffb5",
    "4": "#6c00a6",
    "6": "#0b0624",
    "8": "#ffe8d4",
    "10": "#ff7300"
}

var colors3 = {
    "2": "#ffe8d4",
    "4": "#bbffb5",
    "6": "#ff7300",
    "8": "#6c00a6",
    "10": "#0b0624"
}

var izPos = {
    "row": "0",
    "col": "0"
}

var keys = ["w", "a", "s", "d", "e"];

document.getElementById("content").innerHTML += `<span id="main"></span>`
for (var r = 0; r < wh; r++) {
    for (var c = 0; c < wh; c++) {
        document.getElementById("content").innerHTML += `<span id="r${r}-c${c}" onclick="move(${r}, ${c})"></span>`
    }
    document.getElementById("content").innerHTML += "<div>"
}

document.getElementById("wasd").innerHTML += `<button id="w" onclick="wasd('w', true)">W</button>`
document.getElementById("wasd").innerHTML += `<button id="a" onclick="wasd('a', true)">A</button>`
document.getElementById("wasd").innerHTML += `<button id="s" onclick="wasd('s', true)">S</button>`
document.getElementById("wasd").innerHTML += `<button id="d" onclick="wasd('d', true)">D</button>`
document.getElementById("wasd").innerHTML += `<button id="e" onclick="wasd('e', true)">E</button>`

// function find(r, c) {
//     document.getElementById(`r${row}-c${col}`).style.backgroundColor = "black";
//     document.getElementById(`r${row}-c${col}`).style.width = "50px";
//     document.getElementById(`r${row}-c${col}`).style.height = "50px";
//     document.getElementById(`r${row}-c${col}`).style.border = "none";
//     row = r;
//     col = c;
//     if (r < 0) {
//         row = wh - 1;
//     } else if (r > wh - 1) {
//         row = 0;
//     } else if (c < 0) {
//         col = wh - 1;
//     } else if (c > wh - 1) {
//         col = 0;
//     }

//     if (colors[row]) {
//         if (colors[row][col]) {
//             mainColor = colors[row][col];
//             setupColor();
//         }
//     }

//     document.querySelector("body").style.backgroundColor = mainColor;
//     document.getElementById(`r${row}-c${col}`).style.backgroundColor = mainColor;
//     document.getElementById(`r${row}-c${col}`).style.width = "40px";
//     document.getElementById(`r${row}-c${col}`).style.height = "40px";
//     document.getElementById(`r${row}-c${col}`).style.border = "5px solid black";
//     document.getElementById("console").textContent = `POS : [ R : ${row} | C : ${col}]`;
// }

function move(r, c) {

    row = r;
    col = c;

    if (r < 0) {
        row = wh - 1;
    } else if (r > wh - 1) {
        row = 0;
    } else if (c < 0) {
        col = wh - 1;
    } else if (c > wh - 1) {
        col = 0;
    }

    document.getElementById("main").style.transform = `translate(${col * 50 + 5}px, ${row * 50 + 5}px)`;
    document.getElementById("console").textContent = `Pos : [ R : ${row} | C : ${col}]`;
}

function iz(r, c) {
    document.getElementById("iz").style.transform = `translate(${c * 50}px, ${r * 50}px)`;
    izPos = {
        "row": r,
        "col": c
    }
}

function pickUp(r, c) {

    var e = document.getElementById(`r${r}-c${c}`);

    if (e.classList.contains("item")) {
        var nowColor = mainColor;
        mainColor = e.style.backgroundColor;

        e.style.backgroundColor = nowColor;
        document.getElementById("main").style.backgroundColor = mainColor;
        document.querySelector("body").style.backgroundColor = mainColor;

        checkColor();
    }
    if (r == izPos.row && c == izPos.col && document.getElementById("iz").style.display != "none") {
        var e = document.getElementsByClassName("item");
        for (var i = 0; i < 12; i++) {
            e[0].style.backgroundColor = "black";
            e[0].classList.remove("item");
        }
        canMove = false;
        iz(6, 6);
        setTimeout(() => {
            iz(0, 0);
            document.getElementById("iz").style.transition = "all 1s ease";
            document.getElementById("iz").style.width = "40px";
            document.getElementById("iz").style.height = "40px";
            document.getElementById("iz").style.border = "305px solid #e94f97";
            document.getElementById("main").style.transition = "all 1s ease";
            mainColor = "white";
            document.getElementById("main").style.backgroundColor = mainColor;
            document.querySelector("body").style.backgroundColor = mainColor;
            move(6, 6);
            map = 1;
        }, 2000);
        setTimeout(() => {
            var e = document.querySelectorAll("span:not(#main):not(#iz)");
            for (let i = 0; i < e.length; i++) {
                e[i].style.backgroundColor = "#e94f97"
            }
            document.getElementById("main").style.transition = "all .1s linear";
            canMove = true;
            setupColor();
        }, 3000);
        setTimeout(() => {
            document.getElementById("iz").style.display = "none";
        }, 3100);
    }
}

function setupColor() {
    if (map == 0) {
        for (var r = 1; r < 12; r += 10) {
            for (var c = 1; c < 12; c += 2) {
                var e = document.getElementById(`r${r}-c${c}`);

                e.style.backgroundColor = colors[r][c];
                e.classList.add("item");
            }
        }
    } else if (map == 1) {
        for (var c = 2; c < 11; c += 2) {
            var e = document.getElementById(`r1-c${c}`);

            e.style.backgroundColor = colors2[c];
            e.classList.add("item");
        }
    }
    document.getElementById("main").style.backgroundColor = mainColor;
}

function checkColor() {
    if (!colorsOn) {
        for (var r = 1; r < 12; r += 10) {
            for (var c = 1; c < 12; c += 2) {
                var e = document.getElementById(`r${r}-c${c}`);

                if (e.style.backgroundColor == hexToRgb(colors1[r][c])) {
                    colorsNum++;
                } else {
                    colorsNum = 0;
                    break;
                }
            }
        }

        if (colorsNum == 12) {
            document.getElementById("content").insertAdjacentHTML("afterbegin", '<span id="iz"></span>');
            iz(6, 11);
            colorsOn = true;
        }

    } else {
        for (var c = 2; c < 11; c += 2) {
            var e = document.getElementById(`r1-c${c}`);

            if (e.style.backgroundColor == hexToRgb(colors3[c])) {
                colors2Num++;
            } else {
                colors2Num = 0;
                break;
            }
        }

        if (colors2Num == 5) {
            canMove = false;
            document.getElementById("main").style.transition = "all 1s ease";
            move(6, 6);
            setTimeout(() => {
                alert("개발중..");
                location.reload();
            }, 2000);
        }

    }
}

function wasd(key, btn) {
    if (canMove) {
        switch (key) {
            case "w":
                move(row - 1, col);
                break;
            case "s":
                move(row + 1, col);
                break;
            case "a":
                move(row, col - 1);
                break;
            case "d":
                move(row, col + 1);
                break;


            case "e":
                pickUp(row, col);
                break;

            default:
                break;
        }
        if (btn) {
            document.getElementById(key).classList.add("pressed");
            setTimeout(() => {
                document.getElementById(key).classList.remove("pressed");
            }, 100);
        }
    }
}

window.addEventListener("keydown", e => {
    var key = e.key.toLowerCase();
    if (keys.includes(key)) {
        wasd(key, false);
        document.getElementById(key).classList.add("pressed");    
    }
});

window.addEventListener("keyup", e => {
    var key = e.key.toLowerCase();
    if (keys.includes(key)) {
        document.getElementById(key).classList.remove("pressed");
    }
});

move(6, 6);
setupColor();

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    var rgb = `rgb(${r}, ${g}, ${b})`;

    return result ? rgb : null;
}