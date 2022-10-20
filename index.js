/* Todo
- add undo for moving/etc -- var lastAction => move, create, assign, etc
- fit text to input by changing font size -- figure out font size based on character width
*/

var desks = 0;

function createDesk() {
    desks++;
    var newDesk = document.createElement("div");
    newDesk.id = desks;
    newDesk.classList = ["desk"];
    var newLabel = document.createElement("p");
    newLabel.contentEditable = "true";
    newLabel.id = "label" + desks;
    newLabel.classList = ["label"];
    newLabel.oninput = fitText;
    newDesk.appendChild(newLabel);
    document.body.appendChild(newDesk);
    makeDraggable(document.getElementById(desks));
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
    if(desks > 0) {
        document.getElementById(desks).remove();
        desks--;
    }
}

function fitText(input) {
    input = input || window.event;
    input = input.target;
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

