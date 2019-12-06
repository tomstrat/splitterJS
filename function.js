
const BOOK = document.getElementById("bookInput").value;
const YEAR = document.getElementById("yearInput").value;

const VIP_NAMES = ["Keytek", "The Aerial Man", "Digital TV", "Packsafe",
"Salter Heating", "Wyedean Damp", "S H Badsey", "121 Boilers",
"The Monmouthshire Window", "Monmouth Conservatories", "CGS",
 "L Miles", "LEL Scaffolding", "Yate Windows"];

const ACCOUNT_MANAGERS = ["Graham Higgins", "Caroline Williams",
"Jane Eveleigh", "Sam Bray", "Matthew Rose", "Dan Bernard",
"Steve Wivell", "Julie Cole", "Joe Harris", "Joanne Collins", "Jo Hughes",
"Amy Carlin", "Jacqui Lewis"];

const AM_NUMBERS = {
    "Graham Higgins":"01179630013",
    "Caroline Williams":"01179630012",
    "Jane Eveleigh":"01179630011",
    "Sam Bray":"07584418002",
    "Dan Bernard":"01179231122",
    "Steve Wivell":"07918088902",
    "Julie Cole":"07769256172",
    "Joe Harris":"01179630019",
    "Joanne Collins":"07384254044",
    "Jo Hughes":"01179231122",
    "Amy Carlin":"07503642097",
    "Jacqui Lewis":"01179630014"
};























// Functions to write rows to the tables
function writeEmail (company,email,am,amNumber,amEmail){
    let emailTable = document.getElementById("dataEmail");
    let newRow = document.createElement("tr").classList.add("row");
    let companyCol = document.createElement("td").innerHTML(company);
    let emailCol = document.createElement("td").innerHTML(email);
    let amCol = document.createElement("td").innerHTML(am);
    let amNumberCol = document.createElement("td").innerHTML(amNumber);
    let amEmailCol = document.createElement("td").innerHTML(amEmail);
    let bookCol = document.createElement("td").innerHTML(BOOK);
    let yearCol = document.createElement("td").innerHTML(YEAR);

    newRow.appendChild(companyCol);
    newRow.appendChild(emailCol);
    newRow.appendChild(amCol);
    newRow.appendChild(amNumberCol);
    newRow.appendChild(amEmailCol);
    newRow.appendChild(bookCol);
    newRow.appendChild(yearCol);

    emailTable.appendChild(newRow);
}

function writeNumber(number){
    let SMSTable = document.getElementById("dataSMS");
    let newRow = document.createElement("tr").classList.add("row");
    let numberCol = document.createElement("td").innerHTML(number);

    newRow.appendChild(numberCol);

    SMSTable.appendChild(newRow);
}

function writeLetter(company, address, postcode){
    let letterTable = document.getElementById("dataLetter");
    let newRow = document.createElement("tr").classList.add("row");
    let companyCol = document.createElement("td").innerHTML(company);
    let addressCol = document.createElement("td").innerHTML(address)
    let postcodeCol = document.createElement("td").innerHTML(postcode)

    newRow.appendChild(companyCol);
    newRow.appendChild(addressCol);
    newRow.appendChild(postcodeCol);

    letterTable.appendChild(newRow);
}



// This changes the table data with html tabs
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