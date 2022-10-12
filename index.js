/* Todo
- add undo for moving/etc -- var lastAction => move, create, assign, etc
- fix moving -- somehow make all moveable at once -- issue with var element
*/

var desks = 0;

function createDesk() {
    desks++;
    var newDesk = document.createElement("div");
    newDesk.id = desks;
    newDesk.classList = ["desk"];
    document.body.appendChild(newDesk);
    makeDraggable(document.getElementById(desks));
}

var element;

function makeDraggable(elmnt) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    elmnt.onmousedown = startDrag;
    element = elmnt;
}

function startDrag(elmnt, e) {
    e = e || window.event;
    e.preventDefault();
    x2 = e.clientX;
    y2 = e.clientY;
    document.onmouseup = stopDrag;
    document.onmousemove = drag;
}

function drag(e) {
    e = e || window.event;
    e.preventDefault();
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
    if(desks > 1) {
        makeDraggable(document.getElementById(desks-1));
    }
    if(desks > 0) {
        document.getElementById(desks).remove();
        desks--;
    }
}