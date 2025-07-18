function importQuizlet() {
    const textareacontent = document.getElementById('inputText').value;
    document.getElementById('inputText').value = textareacontent.replaceAll("	", "|");
}
function exportFunc() {
    let textareacontent = document.getElementById('inputText').value;
    textareacontent = textareacontent.replaceAll("|", "	");
    navigator.clipboard.writeText(textareacontent);
}
function save() {
    let {successful} = convertToGoodFormat();
    if (successful) {
        document.getElementById('popup').style.visibility = 'visible';
        const buttonContainer = document.getElementById('popup');
        buttonContainer.innerHTML = '<h3>&nbsp&nbspCurrent Flashcard Sets:</h3> <br><ul id="flashcard-list"> </ul>';
        let listOfFlashcards = JSON.parse(localStorage.getItem('listOfAllCurrentFlashCards'));
        let ul = document.getElementById('flashcard-list');
        try {
            for (let i = 0; i<listOfFlashcards.length; i++) {
                let li = document.createElement('li');
                li.classList.add('flashcard-item');
                li.textContent = listOfFlashcards[i];
                ul.appendChild(li);
            }
        } catch(error) {
            let li = document.createElement('li');
            li.classList.add('flashcard-item');
            li.textContent = "No flashcards found.";
            ul.appendChild(li);
        };
        buttonContainer.innerHTML += '<textarea id="saveText" name ="saveText" rows="1" cols="20"></textarea><button id="hide" onclick="save2()">Save</button><button id="hide" onclick="clearAll()">Clear All Flashcards</button>';            
        
    }
}
function save2() {
    let {term,def} = convertToGoodFormat();
    const stored =JSON.parse(localStorage.getItem('listOfAllCurrentFlashCards')) || [];
    let nameOfLocalStorageThing = document.getElementById('saveText').value;
    if (nameOfLocalStorageThing === null || nameOfLocalStorageThing === "") {console.log("left"); return;} 
    try {
        if (stored.includes(nameOfLocalStorageThing) === false) {
            varr = false;
            stored.push(nameOfLocalStorageThing);
            localStorage.setItem('listOfAllCurrentFlashCards', JSON.stringify(stored))
            localStorage.setItem(nameOfLocalStorageThing, JSON.stringify({term,def}));
            alert("Saved!");
            save();
            hideSave()
        }
        else if(stored.includes(nameOfLocalStorageThing) === true) {
            if (window.confirm('Do you want to overwrite the "' + nameOfLocalStorageThing+ '" flashcard?')) {
                varr = false;
                localStorage.setItem('listOfAllCurrentFlashCards', JSON.stringify(stored))
                localStorage.setItem(nameOfLocalStorageThing, JSON.stringify({term,def}));
                alert("Saved!");
                hideSave()
            }
        }
    }
    catch(error) {
        console.error(error);
        varr = false;
        let names = [];
        names.push(nameOfLocalStorageThing);
        localStorage.setItem('listOfAllCurrentFlashCards', JSON.stringify({names}))
        localStorage.setItem(nameOfLocalStorageThing, JSON.stringify({term,def}));
        alert("Saved!");
        save();
        hideSave()
    }
}
function clearAll() {
    if (window.confirm("Are you sure you want to clear all flashcards?")) {
        localStorage.clear();
        save();
    }
}
function hideSave() {
    const buttonContainer = document.getElementById('popup');
    document.getElementById('popup').style.visibility = 'hidden';
    buttonContainer.innerHTML = "";
}
function convertToGoodFormat() {
    const textareacontent = document.getElementById('inputText').value;
    const lines = textareacontent.split('\n').length;
    let term = [];
    let def = [];
    let arrayOfContent = textareacontent.split('\n');
    let successful = false;
    for (let i = 0; i<lines; i++) {
        const arr = arrayOfContent[i].split("|")
        if (arr.length < 2 === false) {
            term.push(arr[0]);
            def.push(arr[1]);
            successful = true;
        }
        else {
            alert("Invalid data.");
            successful = false;
            break;
        }
    }
    return {
        term,
        def,
        successful
    };   
}
async function importAll() {
    if (window.confirm("You will clear all data to import, is that fine?") === false) {return;}
    localStorage.clear();
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    let contents = await file.text();  // This is the file contents as a string
    console.log(contents);
    const keysLine = contents.substring(0, contents.indexOf("\n"));
    const listOfFlashcards = keysLine.split(",");
    localStorage.setItem('listOfAllCurrentFlashCards', JSON.stringify(listOfFlashcards));
    contents = contents.substring(contents.indexOf("\n") + 1);
    for (let i = 0; i<listOfFlashcards.length; i++) {
        if(contents.indexOf("\n") > 0) {
            localStorage.setItem(listOfFlashcards[i], contents.substring(0,contents.indexOf("\n")));
            contents = contents.substring(contents.indexOf("\n") + 1);
        }
        else {
            localStorage.setItem(listOfFlashcards[i], contents);
        }
    }

}
function exportAll() {
    let listOfFlashcards = JSON.parse(localStorage.getItem('listOfAllCurrentFlashCards'));
    let text = "" + listOfFlashcards;
    for (let i = 0; i<listOfFlashcards.length; i++) {
        text+= "\n" + JSON.stringify(JSON.parse(localStorage.getItem(listOfFlashcards[i])));
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "flashcardsave.txt";
    a.click();
}