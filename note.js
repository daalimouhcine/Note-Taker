//Creat variables
const submit = document.querySelector("#submit");
const input = document.querySelector("#note");
const notesContainer = document.querySelector(".notes-container");

let NumNotes = 1;



//Creat Events
document.addEventListener("DOMContentLoaded",setLocal);
submit.addEventListener("click",addNote);



//Creat Functions
function addNote(e) {
    e.preventDefault();

    if(input.value !== "") {

        const noteDiv = document.createElement("div");
        const noteH3 = document.createElement("h3");
        const noteP = document.createElement("p");
        noteP.classList.add("par");
        const noteButton = document.createElement("button");
        noteButton.classList.add("detail");
        const close = document.createElement("button");
        close.innerHTML = '<i class="fas fa-times"></i>';
        close.classList.add("close-note");

        const detailP = document.createElement("p");
        detailP.classList.add("detail-p");
        detailP.innerText = input.value;

        //Append elements
        notesContainer.appendChild(noteDiv);
        noteDiv.appendChild(noteH3);
        noteDiv.appendChild(noteP);
        noteDiv.appendChild(noteButton);
        noteDiv.appendChild(close);

        noteDiv.appendChild(detailP);

        noteH3.innerText = "Note " + NumNotes;

        let numPar = input.value;
        numPar = numPar.split("");
        let newPar = [];
        if(numPar.length > 80) {
            for(let i = 0 ; i < 80 ; i++) {
                newPar.push(numPar[i]);
            };
            newPar = newPar.join("");
            noteP.innerText = newPar + " ...";
        } else {
            noteP.innerText = input.value;
        }

        noteButton.innerText = "View Detail";

        saveLocal(input.value,input.value);

        NumNotes++;

        input.value = "";
        
        noteButton.addEventListener("click",focusNote);
        close.addEventListener("click",closeNote);
    } else {
        alert("please fill in the input.")
    }

}

function focusNote(e) {
    let target = e.target.parentNode.querySelector(".detail-p");

    const focusContainer = document.createElement("div");
    focusContainer.classList.add("focus-container");
    const focus = document.createElement("div");
    focus.classList.add("focus-div");
    const close = document.createElement("div");
    close.innerHTML = '<i class="fas fa-times"></i>';
    close.classList.add("close-focus");
    const par = document.createElement("p");
    par.innerText = target.innerText;

    //Append the elements
    document.querySelector("body").appendChild(focusContainer);
    focusContainer.appendChild(focus);
    focus.appendChild(close);
    focus.appendChild(par);


    close.addEventListener("click",closeFocus);

}

function closeFocus(e) {
    let target = e.target.parentNode.parentNode;

    target.remove();
}

function closeNote(e) {
    let target = e.target.parentNode;
    target.classList.add("fall");
    target.addEventListener("transitionend",function(){
        target.remove();
        deleteLocal(target);
    });
    NumNotes--;
}


function saveLocal(item,detail) {
    let notes;
    if(localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    notes.push(item);
    localStorage.setItem("notes",JSON.stringify(notes));


    let localDetail;
    if(localStorage.getItem("details") === null) {
        localDetail = [];
    } else {
        localDetail = JSON.parse(localStorage.getItem("details"));
    }
    localDetail.push(detail);
    localStorage.setItem("details",JSON.stringify(localDetail));

}

function setLocal() {
    let notes;
    if(localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    let localDetail;
    if(localStorage.getItem("details") === null) {
        localDetail = [];
    } else {
        localDetail = JSON.parse(localStorage.getItem("details"));
    }

    for(let i = 0 ; i < localDetail.length ; i++) {


        const noteDiv = document.createElement("div");
        const noteH3 = document.createElement("h3");
        const noteP = document.createElement("p");
        noteP.classList.add("par");
        const noteButton = document.createElement("button");
        noteButton.classList.add("detail");
        const close = document.createElement("button");
        close.innerHTML = '<i class="fas fa-times"></i>';
        close.classList.add("close-note");

        const detailP = document.createElement("p");
        detailP.classList.add("detail-p");
        detailP.innerText = localDetail[i];

        noteH3.innerText = "Note " + NumNotes;

        let numPar = notes[i];
        numPar = numPar.split("");
        let newPar = [];
        if(numPar.length > 80) {
            for(let i = 0 ; i < 80 ; i++) {
                newPar.push(numPar[i]);
            };
            newPar = newPar.join("");
            noteP.innerText = newPar + " ...";
        } else {
            noteP.innerText = notes[i];
        }

        noteButton.innerText = "View Detail";

        //Append elements
        notesContainer.appendChild(noteDiv);
        noteDiv.appendChild(noteH3);
        noteDiv.appendChild(noteP);
        noteDiv.appendChild(noteButton);
        noteDiv.appendChild(close);
        
        noteDiv.appendChild(detailP);

        NumNotes++;

        noteButton.addEventListener("click",focusNote);
        close.addEventListener("click",closeNote);


    }
}

function deleteLocal(item) {
    let notes;

    if(localStorage.getItem("notes") === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    
    let localDetail;
    if(localStorage.getItem("details") === null) {
        localDetail = [];
    } else {
        localDetail = JSON.parse(localStorage.getItem("details"));
    }


    let deleteLocal = item.querySelector(".detail-p").innerHTML;
    deleteLocal = deleteLocal.split("<br>");
    deleteLocal = deleteLocal.join("\n");
    if(notes.indexOf(deleteLocal) >= 0){
        notes.splice(notes.indexOf(deleteLocal),1);
        localStorage.setItem("notes",JSON.stringify(notes));
    } 

    let deleteDetailLocal = item.querySelector(".detail-p").innerHTML;
    deleteDetailLocal = deleteDetailLocal.split("<br>");
    deleteDetailLocal = deleteDetailLocal.join("\n");
    if(localDetail.indexOf(deleteDetailLocal) >= 0){
        localDetail.splice(localDetail.indexOf(deleteDetailLocal),1);
        localStorage.setItem("details",JSON.stringify(localDetail));
    }

    console.log(item.querySelector(".par").innerHTML);
    console.log(item.querySelector(".detail-p").innerHTML);
}