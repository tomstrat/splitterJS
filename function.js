

const VIP_NAMES = ["Keytek", "The Aerial Man", "Digital TV", "Packsafe",
"Salter Heating", "Wyedean Damp", "S H Badsey", "121 Boilers",
"The Monmouthshire Window", "Monmouth Conservatories", "CGS",
 "L Miles", "LEL Scaffolding", "Yate Windows"];

const ACCOUNT_MANAGERS = ["Jane Eveleigh", "Sam Bray", "Matthew Rose",
"Dan Bernard", "Julie Cole", "Joanne Collins", "Jo Hughes", "Amber Sharpe",
"Amy Carlin", "Jacqui Lewis"];

const AM_NUMBERS = {
    "Jane Eveleigh":"01179630011",
    "Sam Bray":"07584418002",
    "Dan Bernard":"01179231122",
    "Julie Cole":"07769256172",
    "Joanne Collins":"07384254044",
    "Jo Hughes":"01179231122",
    "Amber Sharpe":"01179630019",
    "Amy Carlin":"07503642097",
    "Jacqui Lewis":"01179630014"
};


let mainData = [];

//This section deals with reading in the CSV
function handleFiles (files){
    // Check for the various File API support.
    if (window.File && window.FileReader) {
      // Great success! All the File APIs are supported.
      getAsText(files[0]);
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
}

function getAsText(fileToRead){
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    //Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event){
    var csv = event.target.result;
    processData(csv);
}

function errorHandler(evt){
    if(evt.target.error.name == "NotReadableError"){
        alert("Cannot read file!");
    }
}

function removeSlash(data){
    let newData = [];
    for(let i=0;i<data.length;i++){
    newData.push(data[i].replace(/\"/g,""));
    }
    return newData;
}

function processData(csv){
    var allTextLines = csv.split(/\r\n|\n/)
    for (let i=0; i<allTextLines.length; i++){
        var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        var newData = removeSlash(data);
        var tarr = [];
        for (var j=0; j<newData.length; j++){
        tarr.push(newData[j]);
        }
        mainData.push(tarr);
    }

    mainReader(mainData);
}

function mainReader(list){
    for (let i=1;i<list.length;i++){

        let hadEmail = false;
        let hadSMS = false;

        if(checkVIP(list[i][0])){
            // Check if can receive email
            if(list[i][6] == "yes" && list[i][5] != ""){
                writeEmail(list[i][0],list[i][5],checkAM(list[i][8]),AM_NUMBERS[checkAM(list[i][8])],makeAMEmail(checkAM(list[i][8])));
                hadEmail = true;
            }
            // Check if can receive sms
            if(list[i][4] == "yes" && list[i][3] != ""){
                writeNumber(list[i][3]);
                hadSMS = true;
            }
            if(hadEmail == false && hadSMS == false){
                writeLetter(list[i][0],list[i][1],list[i][2]);
            }
        }
    }
    changeTab("dataEmail");
}

// Check line is VIP
function checkVIP(name){
    for(let i=0;1<VIP_NAMES.length;i++){
        if(name == VIP_NAMES[i]){
            return false;
        }
    }
    return true;
}

// Check correct AM (replace if needed)
function checkAM(am){
    for(let i=0;i<ACCOUNT_MANAGERS.length;i++){
        if(am == ACCOUNT_MANAGERS[i]){
            return am;
        }
    }
    return "Jane Eveleigh";
}

// Make AM Email
function makeAMEmail(am){
    let amSplit = am.split(" ");
    return amSplit[0] + amSplit[1] + "@localpages.co.uk";
}

// Functions to write rows to the tables
function writeEmail (company,email,am,amEmail,amNumber){

    let BOOK = document.getElementById("bookInput").value;
    let YEAR = document.getElementById("yearInput").value;

    let emailTable = document.getElementById("dataEmail");
    let newRow = document.createElement("tr");
    let companyCol = document.createElement("td");
    let emailCol = document.createElement("td");
    let amCol = document.createElement("td");
    let amNumberCol = document.createElement("td");
    let amEmailCol = document.createElement("td");
    let bookCol = document.createElement("td");
    let yearCol = document.createElement("td");

    newRow.classList.add("row");

    companyCol.innerHTML = company;
    emailCol.innerHTML = email;
    amCol.innerHTML = am;
    amNumberCol.innerHTML = amNumber;
    amEmailCol.innerHTML = amEmail;
    bookCol.innerHTML = BOOK;
    yearCol.innerHTML = YEAR;

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
    let newRow = document.createElement("tr");
    let numberCol = document.createElement("td");

    newRow.classList.add("row");

    numberCol.innerHTML = number;

    newRow.appendChild(numberCol);

    SMSTable.appendChild(newRow);
}

function writeLetter(company, address, postcode){
    let letterTable = document.getElementById("dataLetter");
    let newRow = document.createElement("tr");
    let companyCol = document.createElement("td");
    let addressCol = document.createElement("td");
    let postcodeCol = document.createElement("td");

    newRow.classList.add("row");

    companyCol.innerHTML = company;
    addressCol.innerHTML = address;
    postcodeCol.innerHTML = postcode;

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