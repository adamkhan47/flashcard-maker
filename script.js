function importQuizlet() {

}
function exportFunc() {

}
function save() {
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
    if (successful) {
        alert(term);
        alert(def);
    }
}