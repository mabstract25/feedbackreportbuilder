// HTML2PDF Test - possibly useful, unsure.

// const print = document.getElementById('PDFcontainer');
// var printopt = {
//     margin: 0,
//     filename: 'testpdf',
//     image: {type: 'jpeg', quality: 0.98},
//     html2canvas: {dpi: 96, letterRendering: true },
//     jsPDF: {unit: 'cm', format: 'a4', compress: 'false', orientation: 'portrait'},


// } 
// function printpdf() {
//     html2pdf().set(printopt).from(print).save();
// }

const doughnut1 = document.getElementById('doughnut1');
const doughnut1label = document.getElementById('dough1text');
const doughnut2 = document.getElementById('doughnut2');
const doughnut2label = document.getElementById('dough2text');
const NPS1 = document.getElementById('NPSFRONT1');
const NPS1label = document.getElementById('dough3text');
const NPS2 = document.getElementById('NPSFRONT2');
const NPS2label = document.getElementById('dough4text');



var headerarr = [];
var delcomment = [];
var deloverall = [];
var delcontent = [];
var delmodNPS = [];
var delorgNPS = [];
var facilexpholder = [];
var delfacilexp = {
    phrOne: "Delivered the content at a comfortable pace",
    phrOneCount: 0,
    phrTwo: "Explained things with clarity and structure",
    phrTwoCount: 0,
    phrThree: "Motivated me to engage with the learning",
    phrThreeCount: 0,
    phrFour: "Provided appropriate time to practise skills",
    phrFourCount: 0,
    phrFive: "Shared relevant real-world experience",
    phrFiveCount: 0,
}
var LC1holder = [];
var LC1 = {
    phrOne: "I didn't understand the concepts",
    phrOneCount: 0,
    phrTwo: "I understood some parts",
    phrTwoCount: 0,
    phrThree: "I understood most parts",
    phrThreeCount: 0,
    phrFour: "I understood everything clearly",
    phrFourCount: 0,
    phrFive: "I could explain these concepts to someone else",
    phrFiveCount: 0,
}

function parse() {
    var file = '/example.csv';

    Papa.parse(file, {
        header: false,
        download: true,
        delimiter: ",",
        dynamicTyping: true,
        escapeChar: "\\",
        skipEmptyLines: true,
        complete: (results)=> {        
            console.log(results.data);
            
            // Build the headers
            for (var i = 0; i < results.data.length; i++) {
                
                let headers = results.data[0][i];
                if(headers != undefined){
                    headerarr.push(headers);
                }
                
                
            }
            
            

            
            // Process the data, extract row by row into arrays.
            for(var i = 1; i < results.data.length; i++) {
                
                // Creating Pie & Comments Data
                var testrow = {
                    
                    comments: results.data[i][18],
                    overall: results.data[i][21],
                    content: results.data[i][20],
                    modNPS: results.data[i][22],
                    orgNPS: results.data[i][23],
                    // Creating Likert charts (Horizontal Bars)
                    facilexp: results.data[i][26],
                    lc1: results.data[i][31],
                };
                
                delcomment.push(testrow.comments);
                deloverall.push(testrow.overall);
                delcontent.push(testrow.content);
                delmodNPS.push(testrow.modNPS);
                delorgNPS.push(testrow.orgNPS);
                facilexpholder.push(testrow.facilexp);
                LC1holder.push(testrow.lc1);
                

                
            };
            // Comment filtering.
            delcomment = delcomment.filter(function (el) {
                    return el != null;
                });
            
            
            // Main calculation and processing functions.
            deloverall = average(deloverall);
            delcontent = average(delcontent);
            delmodNPS = NPS(delmodNPS);
            delorgNPS = NPS(delorgNPS);
            likertValues(facilexpholder, delfacilexp);
            lclikertValues(LC1holder, LC1)
            console.log(delmodNPS)
            // Doughnut chart generation

            function doughnutChart(canvasID, dataID, textID){
                new Chart(canvasID, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [dataID,(5.0 - dataID)],
                        backgroundColor: ['#94cfc0', '#dff1ec']
                    }]
                },
                options: {
                    cutout: '80%'
                }
                });
                textID.textContent = dataID;
            }

            doughnutChart(doughnut1, deloverall, doughnut1label);
            doughnutChart(doughnut2, delcontent, doughnut2label);

            function rotateSVG(target,value,text){
                if (value > 0){
                    target.style.transform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    target.style.webkitTransform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    target.style.moztransform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    text.textContent = "+" + value; 
                } else if (value < 0){
                    target.style.transform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    target.style.webkitTransform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    target.style.moztransform = "rotate(" + (value + (value * 0.40)) + "deg)";
                    text.textContent = value; 
                };
                
                
            };
            rotateSVG(NPS1,delmodNPS,dough3text);
            rotateSVG(NPS2,delorgNPS,dough4text);
    }});
};
// Calculation and processing functions.
function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
};

function average(arr) {
    let avr = sum(arr) / arr.length;
    avr.toFixed(1);
    return parseFloat(avr.toFixed(1)); 
};

function NPS(arr) {
    let promoters = 0;
    let detractors = 0;
    let passives = 0;
    const between = (x, min, max) => {
        return x >= min && x <= max;
    }

    for (const element of arr) {
        if (element >= 9) {
            promoters += 1;
        } else if (between(element, 7, 8)) {
            passives += 1;
        } else if (between(element, 1, 6)) {
            detractors += 1;
        } else;
    }

    return parseFloat((((promoters - detractors) / arr.length) * 100).toFixed(0));

};

function calcPercent(val1,val2){
    return parseFloat(((val1/val2.length) * 100).toFixed(0));
    
}

function likertValues(arr, ref) {
    
    arr.forEach((element) => {
        let sploot = element.split(" | ");
        sploot.forEach((element) => {
            if(element === ref.phrOne){
                ref.phrOneCount += 1;
            }else if(element === ref.phrTwo){
                ref.phrTwoCount += 1;
            }else if(element === ref.phrThree){
                ref.phrThreeCount += 1;
            }else if(element === ref.phrFour){
                ref.phrFourCount += 1;
            }else if(element === ref.phrFive){
            ref.phrFiveCount += 1;} else;
                    
            
        })
      
    });
     

    ref.phrOneCount = calcPercent(ref.phrOneCount,arr);
    ref.phrTwoCount = calcPercent(ref.phrTwoCount,arr);
    ref.phrThreeCount = calcPercent(ref.phrThreeCount,arr);
    ref.phrFourCount = calcPercent(ref.phrFourCount,arr);
    ref.phrFiveCount = calcPercent(ref.phrFiveCount,arr);
    
}

function lclikertValues(arr, ref) {

    arr.forEach((element) => {
        
            if(element === ref.phrOne){
                ref.phrOneCount += 1;
            }else if(element === ref.phrTwo){
                ref.phrTwoCount += 1;
            }else if(element === ref.phrThree){
                ref.phrThreeCount += 1;
            }else if(element === ref.phrFour){
                ref.phrFourCount += 1;
            }else if(element === ref.phrFive){
            ref.phrFiveCount += 1;} else;
                    
      
    });

    ref.phrOneCount = calcPercent(ref.phrOneCount,arr);
    ref.phrTwoCount = calcPercent(ref.phrTwoCount,arr);
    ref.phrThreeCount = calcPercent(ref.phrThreeCount,arr);
    ref.phrFourCount = calcPercent(ref.phrFourCount,arr);
    ref.phrFiveCount = calcPercent(ref.phrFiveCount,arr);
    
}



// Promoters - 9 & 10
// Detracters - 1 - 6
// Passives - 7 & 8 

// Formula - Total up the 9 & 10s, subtract the total number of 1 - 6, divide this new total by total number of respondants, then times by 100.





