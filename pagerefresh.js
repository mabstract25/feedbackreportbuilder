
// Form setup
const form = document.querySelector("form");

form.addEventListener("submit", e => {
    
    e.preventDefault();
    const file = e.target[0].files[0];
    parse(file);
    form.reset();
})

const logolist = {
    AB: "/Logos/ab_Logo.png",
    Rath: "/Logos/Rath_Logo.png",
    Swiss: "/Logos/Swiss_Logo.png",
    HS: "/Logos/HS_Logo.png",
};





const sessionname = document.getElementById('sessionname');
const sessiondate = document.getElementById('sessiondate');
const sessionrespondents = document.getElementById('sessionrespondents');
const sessionlocation = document.getElementById('sessionlocation');
const clientlogo = document.getElementById('clientlogo');
const clientselect = document.getElementById('clientselect');
const locationselect = document.getElementById('locationselect');
const date = document.getElementById('date');
const today = new Date();

const doughnut1 = document.getElementById('doughnut1');
const doughnut1label = document.getElementById('dough1text');
const doughnut2 = document.getElementById('doughnut2');
const doughnut2label = document.getElementById('dough2text');
const NPS1 = document.getElementById('NPSFRONT1');
const NPS1label = document.getElementById('dough3text');
const NPS2 = document.getElementById('NPSFRONT2');
const NPS2label = document.getElementById('dough4text');
const chartblue = '#57aee2';
const chartlblue = '#ddeff9';
const chartyellow = '#FDC743';
const chartlyellow = '#fff4d9';
const facilexp1 = document.getElementById('facilexp1');
const lcchart1 = document.getElementById('lcchart1');
const lcchart2 = document.getElementById('lcchart2');
const lcchart3 = document.getElementById('lcchart3');
const lcchart4 = document.getElementById('lcchart4');
const lcchart5 = document.getElementById('lcchart5');
const lcchart6 = document.getElementById('lcchart6');
const cell1 = document.getElementById('cell1');
console.log(cell1);
// Working Arrays

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
};
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
};
var LC2holder = [];
var LC2 = {
    phrOne: "It is unlikely to change how I work",
    phrOneCount: 0,
    phrTwo: "It reinforced what I already knew",
    phrTwoCount: 0,
    phrThree: "It increased my awareness and understanding",
    phrThreeCount: 0,
    phrFour: "It will influence how I work",
    phrFourCount: 0,
    phrFive: "It will significantly change how I work",
    phrFiveCount: 0,
}
var LC3holder = [];
var LC3 = {
    phrOne: "Not motivated at all",
    phrOneCount: 0,
    phrTwo: "Slightly motivated",
    phrTwoCount: 0,
    phrThree: "Moderately motivated",
    phrThreeCount: 0,
    phrFour: "Very motivated",
    phrFourCount: 0,
    phrFive: "Extremely motivated",
    phrFiveCount: 0,
}
var LC4holder = [];
var LC4 = {
    phrOne: "I am unable to apply this in my role",
    phrOneCount: 0,
    phrTwo: "I need more support and/or experience",
    phrTwoCount: 0,
    phrThree: "I can apply this successfully now",
    phrThreeCount: 0,
    phrFour: "I can apply this at an advanced level",
    phrFourCount: 0,
};
var LC5holder = [];
var LC5 = {
    phrOne: "Never",
    phrOneCount: 0,
    phrTwo: "Not sure",
    phrTwoCount: 0,
    phrThree: "This month",
    phrThreeCount: 0,
    phrFour: "This week",
    phrFourCount: 0,
};
var LC6holder = [];
var LC6 = {
    phrOne: "None at this time",
    phrOneCount: 0,
    phrTwo: "Something else",
    phrTwoCount: 0,
    phrThree: "More practice opportunities",
    phrThreeCount: 0,
    phrFour: "Follow-up sessions",
    phrFourCount: 0,
    phrFive: "Coaching or mentoring",
    phrFiveCount: 0,
    phrSix: "Additional resources",
    phrSixCount: 0,
};


function parse(file) {
    // var file = '/example.csv';

    Papa.parse(file, {
        header: false,
        download: true,
        delimiter: ",",
        dynamicTyping: true,
        escapeChar: "\\",
        skipEmptyLines: true,
        complete: (results)=> {        
            console.log(results.data);
            
            function textsplit(string) {
                return string.replace(":", ":<br/>");
            }
            sessionname.setHTMLUnsafe(textsplit(results.data[1][2]));
            sessiondate.textContent = results.data[1][5];
            sessionrespondents.textContent = results.data.length - 1;
            

            
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
                    lc2: results.data[i][25],
                    lc3: results.data[i][28],
                    lc4: results.data[i][27],
                    lc5: results.data[i][24],
                    lc6: results.data[i][29],

                };
                
                
                delcomment.push(testrow.comments);
                deloverall.push(testrow.overall);
                delcontent.push(testrow.content);
                delmodNPS.push(testrow.modNPS);
                delorgNPS.push(testrow.orgNPS);
                facilexpholder.push(testrow.facilexp);
                LC1holder.push(testrow.lc1);
                LC2holder.push(testrow.lc2);
                LC3holder.push(testrow.lc3);
                LC4holder.push(testrow.lc4);
                LC5holder.push(testrow.lc5);
                LC6holder.push(testrow.lc6);
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
            lclikertValues(LC1holder, LC1);
            lclikertValues(LC2holder, LC2);
            lclikertValues(LC3holder, LC3);
            lclikertValues(LC4holder, LC4);
            lclikertValues(LC5holder, LC5);
            likertValues(LC6holder, LC6);

            // Chart Defaults
            Chart.defaults.font.size = 14;
            Chart.defaults.font.family = "aptos-woff, Helvetica, sans-serif";
            Chart.defaults.font.style = 'normal';
            Chart.defaults.color = '#000000';
            

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
                    cutout: '80%',
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


            // Bar chart generaton
            function sixBarChart(canvasID,ref,colour1,colour2){
                tdata = {
                    labels: [ref.phrOne,ref.phrTwo,ref.phrThree,ref.phrFour,ref.phrFive,ref.phrSix],
                    datasets: [{
                        data: [ref.phrOneCount,ref.phrTwoCount,ref.phrThreeCount,ref.phrFourCount,ref.phrFiveCount,ref.phrSixCount],
                        backgroundColor: colour1,
                        borderColor: '#ffffff',
                        datalabels: {
                            anchor: 'end',
                            align: 'right',
                            clamp: true,
                            color: '#000000',
                            formatter: function (value) {
                                    return value + '%';
                                },
                        }
                    },{
                        data: [(100 - ref.phrOneCount),(100 - ref.phrTwoCount),(100 - ref.phrThreeCount),(100 - ref.phrFourCount),(100 - ref.phrFiveCount),(100 - ref.phrSixCount)],
                        backgroundColor: colour2,
                        borderColor: '#ffffff',
                        datalabels: {
                            labels: {
                                value: null
                            }
                        }
                    },
                    ],
                };
                new Chart(canvasID, {
                    plugins: [ChartDataLabels],
                    type: 'bar',
                    data: tdata,
                    legend: {
                        display: false
                    },
                    options: {
                        indexAxis: 'y',
                        devicePixelRatio: 2,
                        maintainAspectRatio: false,
                        responsive: true,
                        elements: {
                            bar: {
                                borderWidth: 2,
                            }
                        },
                        layout: {
                            padding: {
                                left: 50,
                                right:50
                            }
                        },
                        plugins: {
                            
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            x: {
                            stacked: true,
                            ticks:{display: false}
                            },
                            y: {
                            
                            stacked: true
                            }
                        },
                     },
                })
            };


            function fourBarChart(canvasID,ref,colour1,colour2){
                tdata = {
                    labels: [ref.phrOne,ref.phrTwo,ref.phrThree,ref.phrFour],
                    datasets: [{
                        data: [ref.phrOneCount,ref.phrTwoCount,ref.phrThreeCount,ref.phrFourCount],
                        backgroundColor: colour1,
                        borderColor: '#ffffff',
                        datalabels: {
                            anchor: 'end',
                            align: 'right',
                            clamp: true,
                            color: '#000000',
                            formatter: function (value) {
                                    return value + '%';
                                },
                        }
                    },{
                        data: [(100 - ref.phrOneCount),(100 - ref.phrTwoCount),(100 - ref.phrThreeCount),(100 - ref.phrFourCount)],
                        backgroundColor: colour2,
                        borderColor: '#ffffff',
                        datalabels: {
                            labels: {
                                value: null
                            }
                        }
                    },
                    ],
                };
                new Chart(canvasID, {
                    plugins: [ChartDataLabels],
                    type: 'bar',
                    data: tdata,
                    legend: {
                        display: false
                    },
                    options: {
                        indexAxis: 'y',
                        devicePixelRatio: 2,
                        maintainAspectRatio: false,
                        responsive: true,
                        elements: {
                            bar: {
                                borderWidth: 2,
                            }
                        },
                        layout: {
                            padding: {
                                left: 50,
                                right:50
                            }
                        },
                        plugins: {
                            
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            x: {
                            stacked: true,
                            ticks:{display: false}
                            },
                            y: {
                            
                            stacked: true
                            }
                        },
                     },
                })
            };

            function barChart(canvasID,ref,colour1,colour2){
                tdata = {
                    labels: [ref.phrOne,ref.phrTwo,ref.phrThree,ref.phrFour,ref.phrFive],
                    datasets: [{
                        data: [ref.phrOneCount,ref.phrTwoCount,ref.phrThreeCount,ref.phrFourCount,ref.phrFiveCount],
                        backgroundColor: colour1,
                        borderColor: '#ffffff',
                        datalabels: {
                            anchor: 'end',
                            align: 'right',
                            clamp: true,
                            color: '#000000',
                            formatter: function (value) {
                                    return value + '%';
                                },
                        }
                    },{
                        data: [(100 - ref.phrOneCount),(100 - ref.phrTwoCount),(100 - ref.phrThreeCount),(100 - ref.phrFourCount),(100 - ref.phrFiveCount)],
                        backgroundColor: colour2,
                        borderColor: '#ffffff',
                        datalabels: {
                            labels: {
                                value: null
                            }
                        }
                    },
                    ],
                };
                new Chart(canvasID, {
                    plugins: [ChartDataLabels],
                    type: 'bar',
                    data: tdata,
                    legend: {
                        display: false
                    },
                    options: {
                        indexAxis: 'y',
                        devicePixelRatio: 2,
                        maintainAspectRatio: false,
                        responsive: true,
                        elements: {
                            bar: {
                                borderWidth: 2,
                            }
                        },
                        layout: {
                            padding: {
                                left: 50,
                                right:50
                            }
                        },
                        plugins: {
                            
                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            x: {
                            stacked: true,
                            ticks:{display: false}
                            },
                            y: {
                            
                            stacked: true
                            }
                        },
                     },
                })
            };

            barChart(facilexp1,delfacilexp,chartblue,chartlblue);
            barChart(lcchart1,LC1,chartyellow,chartlyellow);
            barChart(lcchart2,LC2,chartyellow,chartlyellow);
            barChart(lcchart3,LC3,chartyellow,chartlyellow);
            fourBarChart(lcchart4,LC4,chartyellow,chartlyellow);
            fourBarChart(lcchart5,LC5,chartyellow,chartlyellow);
            sixBarChart(lcchart6,LC6,chartyellow,chartlyellow);
            commentCells(delcomment);
            todayDate(today,date);
    }});
};

// General functions



clientselect.addEventListener("change", (e) => {
    let select = e.target.value;
    let obj = logolist;
    
    clientlogo.src = obj[select];
})

locationselect.addEventListener("change", (e) => {
    let select = e.target.value;
    sessionlocation.textContent = select;
})

function todayDate(today,target) {
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    target.textContent = today;
}


// getClientImage(logolist,clientselect,clientlogo);

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

function commentCells(arr) {

    var currentdiv = cell1;
    var counter = 0;
    // Function for building a new container with header
    function newCont(ref) {
        cont = document.createElement("div");
        var ID = 'Container' + counter;
        cont.id = ID;
        cont.classList.add("feedbackcontainer");
        var title = document.createElement("div");
        title.classList.add("feedbacktitle");
        cont.appendChild(title);
        var h2 = document.createElement("h2");
        h2.textContent = "Delegate Feedback";
        title.appendChild(h2);
        ref.after(cont);
        currentdiv = document.getElementById(ID);
    }
    // Set the first container in place
    newCont(currentdiv);
    // Formula for calculating a value range
    const between = (x, min, max) => {
        return x >= min && x <=max;
    }
    // For each element in the comment array.
    arr.forEach((element) => {
        var height = currentdiv.clientHeight;
        var div = document.createElement("div");
        div.classList.add("feedbackcell");
        var p = document.createElement("p");
        p.classList.add("feedbackcomment");
        p.textContent = element;
        div.appendChild(p);
        // For the length of the array, do:
        for (var i = 0; i < arr.length; i++) {
            if (height <= 800) {
            currentdiv.appendChild(div);
            } else if (between(height, 801, 850)) {
            currentdiv.classList.add("pbreak");
            newCont(currentdiv);
            counter += 1;
            // Resetting the height, just in case.
            height = currentdiv.clientHeight;
            };
        };

        
    });
    // TEMPORARY - Trim the last header, as container0 duplicates for some reason.
    trim = currentdiv.nextSibling;
    trim.remove();


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
            ref.phrFiveCount += 1;
            }else if(element === ref.phrSix){
            ref.phrSixCount += 1;
            } else;
                    
            
        })
      
    });
     

    ref.phrOneCount = calcPercent(ref.phrOneCount,arr);
    ref.phrTwoCount = calcPercent(ref.phrTwoCount,arr);
    ref.phrThreeCount = calcPercent(ref.phrThreeCount,arr);
    ref.phrFourCount = calcPercent(ref.phrFourCount,arr);
    ref.phrFiveCount = calcPercent(ref.phrFiveCount,arr);
    ref.phrSixCount = calcPercent(ref.phrSixCount,arr);
    
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
    ref.phrSixCount = calcPercent(ref.phrSixCount,arr);
}



// Promoters - 9 & 10
// Detracters - 1 - 6
// Passives - 7 & 8 

// Formula - Total up the 9 & 10s, subtract the total number of 1 - 6, divide this new total by total number of respondants, then times by 100.





