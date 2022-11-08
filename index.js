var desks = 0;
var names = [];

//Importing from URL params
document.getElementById("deskContainer").innerHTML = window.location.search;
var params = new URLSearchParams(window.location.search);
var input = params.get("input");
document.getElementById("deskContainer").innerHTML = input;


function createDesk() {
    var newDesk = document.createElement("div");
    newDesk.id = desks;
    newDesk.classList = ["desk"];
    var newLabel = document.createElement("p");
    newLabel.contentEditable = "true";
    newLabel.id = "label" + desks;
    newLabel.classList = ["label"];
    newLabel.oninput = fitText;
    newDesk.innerHTML = desks+1;
    newDesk.appendChild(newLabel);
    document.getElementById("deskContainer").appendChild(newDesk);
    makeDraggable(document.getElementById(desks));
    desks++;
    addNames();
}

var element;

function makeDraggable(elmnt) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    elmnt.onmousedown = startDrag;
}

function startDrag(e) {
    e = e || window.event;
    // e.preventDefault();
    x2 = e.clientX;
    y2 = e.clientY;
    document.onmouseup = stopDrag;
    document.onmousemove = drag;
    element = e.toElement;
}

function drag(e) {
    e = e || window.event;
    // e.preventDefault();
    x1 = x2 - e.clientX;
    y1 = y2 - e.clientY;
    x2 = e.clientX;
    y2 = e.clientY;
    element.style.top = (element.offsetTop - y1) + "px";
    element.style.left = (element.offsetLeft - x1) + "px";
}

function stopDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
}

function undo() {
    if(desks-1 >= 0) {
        document.getElementById(desks-1).remove();
        desks--;
    }
}

function fitText(input) {
    if(!(input.contentEditable)) {
        input = window.event;
        input = input.target;
    }
    var labelText = input.innerHTML;
    var width = parseInt(window.getComputedStyle(input).getPropertyValue("width"));
    labelText = labelText.split(" ");
    for(var i = 0; i < labelText.length; i++) {
        labelText[i] = labelText[i].replace("&nbsp", "");
        var chars = labelText[i].length;
        var size = width/chars*1.25;
        if(size <= 20 && size <= parseInt(input.style.fontSize)) {
            console.log(size);
            input.style.fontSize = size + "px";
        } else if(size > 20) {
            input.style.fontSize = "20px";
        }
    }
}

function setNames() {
    names = document.getElementById("names").value;
    names = names.split(",");
    addNames();
}


function addNames() {
    for(var i = 0; (i < names.length && i < desks); i++) {
        document.getElementById("label" + i).innerHTML = names[i];
        fitText(document.getElementById("label" + i));
    }
}

function shuffle() {
    for(var i = names.length-1; i > 0; i--) {
        var j = Math.floor((Math.random())*(i+1));
        var temp = names[i];
        names[i] = names[j];
        names[j] = temp;
    }
    addNames();
}

function alphabeticalSort() {
    names.sort();
    addNames();
}

function printMode() {
    document.getElementById("actions").style.display = "none";
    var deskList = document.getElementsByClassName("desk");
    for(var i = 0; i < deskList.length; i++) {
        deskList[i].style.backgroundColor = "white";
        deskList[i].style.borderColor = "#000000"
    }
    print();
    document.getElementById("actions").style.display = "block";
    for(var i = 0; i < deskList.length; i++) {
        deskList[i].style.backgroundColor = "#77DD77";
        deskList[i].style.borderColor = "#228822"
    }
}
