function dropMedMenu()
{
    const dropDown = document.getElementById('dropDownMed');
    const hiddenMeds = document.getElementsByClassName('pastMed');
    const medStyles = window.getComputedStyle(hiddenMeds[0]);
    var currOpacity = medStyles.getPropertyValue('opacity');
    var newOpacity;
    
    if (currOpacity == 1)
    {
        newOpacity = 0;
        dropDown.style.transform = "rotate(-270deg)";
    }
    else
    {
        newOpacity = 1;
        dropDown.style.transform = "rotate(270deg)";
    }

    for (let i = 0; i < hiddenMeds.length; i++)
    {
        hiddenMeds[i].style.opacity = newOpacity;
    }
}

function dropImgMenu()
{
    const dropDown = document.getElementById('dropDownImg');
    const hiddenImgs= document.getElementsByClassName('pastImg');
    const imgStyles = window.getComputedStyle(hiddenImgs[0]);
    var currOpacity = imgStyles.getPropertyValue('opacity');
    var newOpacity;
    
    if (currOpacity == 1)
    {
        newOpacity = 0;
        dropDown.style.transform = "rotate(-270deg)";
    }
    else
    {
        newOpacity = 1;
        dropDown.style.transform = "rotate(270deg)";
    }

    for (let i = 0; i < hiddenImgs.length; i++)
    {
        hiddenImgs[i].style.opacity = newOpacity;
    }
}

function randomDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    const randomDiff = Math.floor(Math.random() * diff);
    const randomDate = new Date(start.getTime() + randomDiff);
    return randomDate;
  }

function loadFileContent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("file-text").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "../static/Summary.txt", true);
    xhttp.send();
}

window.onload = function() {
    loadFileContent();
};

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    var lines = [];

    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            var allText = rawFile.responseText;
            lines = allText.split('\n');
            callback(lines);
        }
    }
    rawFile.send();
}

function checkIfDate(text)
{
    return /^[\d/\n]+$/.test(text);
}

function sortDates(a, b)
{
    return b[2] - a[2];
}

readTextFile('../static/person.txt', function(lines) {
    var fullName = lines[32];
    document.getElementById('full-name').innerHTML = "<center>" + fullName + "</center>";
    var idTag = "ID: " + lines[33];
    document.getElementById('id').innerHTML = idTag;
    var DOB = "DOB: " + lines[34];
    document.getElementById('dob').innerHTML = DOB;
    var deathDate = lines[35];
    var deceased = document.getElementById('deceased');
    if (deathDate.length != 11)
    {
        deceased.style.opacity = 0;
    }
    else
    {
        deceased.style.opacity = 1;
        deceased.innerHTML = "DECEASED: " + deathDate;
    }
    var birthDate = new Date(lines[34]);

    if (deathDate.length != 11)
    {
        var endDate = new Date();
    }
    else
    {
        var endDate = new Date(deathDate);
    }
    var age = endDate.getFullYear() - birthDate.getFullYear();
    if (endDate.getMonth() < birthDate.getMonth() || 
        (endDate.getMonth() === birthDate.getMonth() && endDate.getDate() < birthDate.getDate())) {
        age--;
    }

    var dispAge = "Age: " + age;
    document.getElementById('age').innerHTML = dispAge;
    var sex = "Sex: " + lines[40];
    document.getElementById('sex').innerHTML = sex;
    var race = "Race: " + lines[38];
    document.getElementById('race').innerHTML = race;
    var ethnicity = "Ethnicity: " + lines[39];
    document.getElementById('ethnicity').innerHTML = ethnicity;
    var address1 = lines[41];
    document.getElementById('addyL1').innerHTML = address1;
    var city = lines[42];
    var state = lines[43];
    var zip = lines[44];
    document.getElementById('addyL2').innerHTML = city + ", " + state + " " + zip;
    
    var lineNumber = 46;
    var nextLineNumber = 46;
    var allergy = lines[nextLineNumber];
    let allergyList = [];
    allergyList = allergy.split("Allergy to ");
    if (lines[46].length < 5)
    {
        var allergyAmount = 0;
    }
    else
    {
        var allergyAmount = allergyList.length - 1;
    }

    if (allergyAmount != 0)
    {
        for (let i = 0; i < allergyAmount; i++)
        {
            document.getElementById('allergy-list').innerHTML += allergyList[i+1] + "<br>";
        }
    }
    
    var lineNum = 68;
    var meds = lines[lineNum];
    let medsList = [];
    medsList = meds.split(", ");
    if (lines[lineNum].length < 5)
    {
        var medAmount = 0;
    }
    else
    {
        var medAmount = medsList.length;
    }

    var medList = document.getElementById('med-list');
    var endDate = new Date();
    var startDate = new Date(DOB);
    if (medAmount != 0)
    {
        for (let i = 0; i < medAmount; i++)
        {
            const ranDate = randomDate(startDate, endDate.setFullYear(endDate.getFullYear() + (age-2)))
            var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            var formDate = ranDate.toLocaleString('en-US', options);

            medList.innerHTML += "<tr><td>" 
            + medsList[i] + "</td> <td>" + formDate + "</td><td class=\"center\">~</td></tr>";
        }
    }

    // var nextLineNum = parseInt(lineNum) + 1;
    // var today = new Date();

    // var holdNextLineNum = nextLineNum;
    // var temp = [];
    // var sortMeds = [];
    // for (let k = 0; k < medAmount*3; k++)
    // {
    //     temp[k] = lines[holdNextLineNum+k];
    // }

    // var reverse = temp.length-1;
    // var total = medAmount*3;
    // for (let m = 0; m < total; m+=3)
    // {
    //     for (let n = 0; n < medAmount*3; n+=3)
    //     {
    //         if (temp[n+2].length == 2)
    //         {
    //             for (let p = 0; p < 3; p++)
    //             {
    //                 sortMeds[m+p] = temp[n+p];
    //                 temp[n+p] = "";
    //             }
    //             break;
    //         }
    //         if (temp[n+2].length > 2)
    //         {
    //             var holdDate = new Date(temp[n+2]);
    //             if (today >= holdDate)
    //             {
    //                 for (let q = 0; q < 3; q++)
    //                 {
    //                     sortMeds[reverse-(2-q)] = temp[n+q];
    //                     temp[n+q] = "";
    //                 }
    //                 reverse -= 3;
    //                 m -= 3;
    //                 total -= 3;
    //                 break;
    //             }
    //             else
    //             {
    //                 for (let r = 0; r < 3; r++)
    //                 {
    //                     sortMeds[m+r] = temp[n+r];
    //                     temp[n+r] = "";
    //                 }
    //                 break;
    //             }
    //         }
    //     }
    // }

    // var holdLineNum = 0;

    // for (let j = 0; j < medAmount; j++)
    // {
    //     for (let col = 0; col < 3; col++)
    //     {
    //         if (col == 0)
    //         {
    //             var medName = sortMeds[holdLineNum];
    //         }
    //         if (col == 1)
    //         {
    //             var medStart = sortMeds[holdLineNum+col];
    //         }
    //         if (col == 2)
    //         {
    //             var medEnd = sortMeds[holdLineNum+col];
    //             if (medEnd.length > 2)
    //             {
    //                 var medEndCheck = new Date(sortMeds[holdLineNum+col]);
    //             }
    //             else
    //             {
    //                 var medEndCheck = new Date("01/01/0001");
    //             }
    //         }
    //     }
        
    //     if (medEnd.length > 2 && today >= medEndCheck)
    //     {
    //         medList.innerHTML += "<tr class=\"pastMed\"> <td>" + medName + 
    //         "</td> <td>" + medStart + "</td><td>" + medEnd + "</td></tr>";
    //     }
    //     if (medEnd.length > 2 && today < medEndCheck)
    //     {
    //         medList.innerHTML += "<tr><td>" + medName + 
    //         "</th><td>" + medStart + "</td><td>" + medEnd + "</td></tr>";
    //     }
    //     else if (medEnd.length == 2)
    //     {
    //         medList.innerHTML += "<tr><td>" 
    //         + medName + "</td> <td>" + medStart + "</td><td class=\"center\">" + medEnd + "</td></tr>";
    //     }
    //     holdLineNum = parseInt(holdLineNum) + 3;
    // }

    var lineNum = 61;
    var imgsCode = lines[lineNum];
    var imgsSite = lines[lineNum-2];
    let imgsCodeList = [];
    imgsCodeList = imgsCode.split(", ");
    let imgsSiteList = [];
    imgsSiteList = imgsSite.split(", ");
    if (imgsSite.length < 5)
    {
        var imgAmount = 0;
    }
    else
    {
        var imgAmount = imgsCodeList.length;
    }
    var imgList = document.getElementById('img-list');
    endDate = new Date();
    startDate = new Date(DOB);
    if (imgAmount != 0)
    {
        for (let i = 0; i < imgAmount; i++)
        {
            const ranIDate = randomDate(startDate, endDate.setFullYear(endDate.getFullYear() + (age-2)))
            var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            var formIDate = ranIDate.toLocaleString('en-US', options);

            imgList.innerHTML += "<tr><td><center>" + imgsCodeList[i] + 
            "</center></th><td>" + imgsSiteList[i] + "</td><td>" + formIDate + "</td></tr>";
        }
    }

    // lineNumber = holdNextLineNum + (medAmount * 3);
    // nextLineNumber = lineNumber + 1;
    // let itemp = [];
    // let sortImgs = [];
    // var imgAmount = lines[lineNumber];

    // for (let w = 0; w < imgAmount*3; w++)
    // {
    //     itemp[w] = lines[nextLineNumber+w];
    // }

    // for (let i = 0; i < itemp.length; i += 3)
    // {
    //     let image = itemp.slice(i, i + 3);
    //     let printDate = image[2];
    //     image.push(printDate);
    //     image[2] = new Date(image[2]);
    //     sortImgs.push(image);
    // }

    // sortImgs.sort(sortDates);

    // var imgList = document.getElementById('img-list');
    // var imgName = [];
    // var imgSite = [];
    // var imgDate = [];
    // var counter = 0;
    // sortImgs.forEach(image =>
    // {
    //         imgName.push(image[0]);
    //         imgSite.push(image[1]);
    //         imgDate.push(image[3]);

    //         if (counter < 4)
    //         {
    //             imgList.innerHTML += "<tr><td><center>" + imgName[counter] + 
    //             "</center></th><td>" + imgSite[counter] + "</td><td>" + imgDate[counter] + "</td></tr>";
    //             counter++;
    //         }
    //         else
    //         {
    //             imgList.innerHTML += "<tr class=\"pastImg\"> <td ><center>" + imgName[counter] + 
    //             "</center></td> <td>" + imgSite[counter] + "</td><td>" + imgDate[counter] + "</td></tr>";
    //             counter++;
    //         }
    // });
   
});