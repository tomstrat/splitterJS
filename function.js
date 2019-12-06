
const BOOK = document.getElementById("bookInput").value;
const YEAR = document.getElementById("yearInput").value;

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
  
  function processData(csv){
    var allTextLines = csv.split(/\r\n|\n/)
    for (var i=0; i<allTextLines.length; i++){
      var data = allTextLines[i].split(',');
      var tarr = [];
      for (var j=0; j<data.length; j++){
        tarr.push(data[j]);
      }
      mainData.push(tarr);
    }
    mainReader(mainData);
  }

function mainReader(list){
    for (i=0;i<list.length;i++){

        let hadEmail = false;
        let hadSMS = false;

        if(checkVIP(list[i][0])){
            // Check if can receive email
            if(list[i][6] == "yes" && list[i][5] != ""){
                writeEmail(list[i][0],list[i][5],list[i][8],AM_NUMBERS.list[i][8],makeAMEmail(list[i][8]));
                hadEmail = true;
            }
            // Check if can receive sms
            if(list[i][4] == "yes" && list[i][3] != ""){
                writeNumber(list[i][3]);
                hadSMS = true;
            }
            if(hadEmail == true || hadSMS == true){
                writeLetter(list[i][0],list[i][1],list[i][2]);
            }
        }
    }
}

// Check line is VIP
function checkVIP(name){
    for(i=0;1<VIP_NAMES;i++){
        if(name == VIP_NAMES[i]){
            return false;
        }
    }
    return true;
}

// Check correct AM (replace if needed)
function checkAM(am){
    for(i=0;i<ACCOUNT_MANAGERS;i++){
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