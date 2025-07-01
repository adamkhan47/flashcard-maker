const copy = text => navigator.clipboard.writeText(text);
function importQuizlet() {
    const textareacontent = document.getElementById('inputText').value;
    document.getElementById('inputText').value = textareacontent.replaceAll("	", "|");
}
function exportFunc() {
    let textareacontent = document.getElementById('inputText').value;
    textareacontent = textareacontent.replaceAll("|", "	");
    copy(textareacontent);
}
function save() {
    const {term,def, successful} = convertToGoodFormat();
    if (successful) {
        //old system
        // lets store in localstorage 1 for now
        //localStorage.setItem('localStorage1', JSON.stringify({term,def}));
        //alert("Saved!");
        
        //new system
        // lets have the user save a name to the flashcard and then save that to something that stores all flashcards
        const stored =JSON.parse(localStorage.getItem('listOfAllCurrentFlashCards')) || [];
        let varr = true;
        
        while (varr === true) {
            let nameOfLocalStorageThing = prompt("Enter a name for this flashcard.");
            if (prompt === null) {varr = false; break;}
            else { try {
                if (stored.includes(nameOfLocalStorageThing) === false) {
                    varr = false;
                    stored.push(nameOfLocalStorageThing);
                    localStorage.setItem('listOfAllCurrentFlashCards', JSON.stringify(stored))
                    localStorage.setItem(nameOfLocalStorageThing, JSON.stringify({term,def}));
                    alert("Saved!");
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
            }}
            
        }
        
    }
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