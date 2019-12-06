


function changeTab (tabID){
    let tables = document.querySelectorAll("table");

    tables.forEach(table => {
        if(table.id == tabID){
            table.classList.remove("hideTable");
        } else {
            table.classList.remove("hideTable");
            table.classList.add("hideTable");
        }
    });
}