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
        // lets store in localstorage 1 for now
        localStorage.setItem('localStorage1', JSON.stringify({term,def}));
        alert("Saved!");
        //const stored = JSON.parse(localStorage.getItem('localStorage1')); 
        //alert("HUHHH: " + stored.term + stored.def); 
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