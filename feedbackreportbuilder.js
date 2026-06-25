
// var data;
// var overall = document.getElementById("overall");
var content = document.getElementById("content");
var facil = document.getElementById("facilitator");
var overallscore = document.getElementById("overallscore")
var overallnumber = document.getElementById("overallscore").innerHTML;
var contentnumber = document.getElementById("contentscore").innerHTML;
var facilnumber = document.getElementById("facilscore").innerHTML;
var comment1 = document.getElementById("comment1");
let commentdiv = document.getElementById("commentdiv");
const overalldoughnut = document.getElementById("overalldoughnut");
const contentdoughnut = document.getElementById("contentdoughnut");
const facildoughnut = document.getElementById("facildoughnut");
const modulebar = document.getElementById("modulebarchart");


var data;

function parse() {
    var file = '/aberdeenacceleratec4.csv';

    Papa.parse(file, {
        header: false,
        download: true,
        delimiter: ",",
        dynamicTyping: true,
        escapeChar: "\\",
        complete: function(results) {
        console.log("Finished:", results.data);
        data = results.data;
        overalls();
        chartgeneration();
        outputtest();
        chartgenerationtwo();
        
        }
    });
}

// Comment Data Here 
function outputtest(){
    const output = [];
        for (let row of data.slice(1, -1)) {
            output.push(row[17]);
        }
        
    
    const filtered = output.filter(item => item !== null);
    // comment1.innerHTML = filtered[1];

    console.log(filtered);
        
    
    var table = document.createElement("TABLE");
    
    for(var i = 0; i < filtered.length; i++) {
    var row = table.insertRow(i);
    row.insertCell(0).innerHTML = filtered[i];
    }

    commentdiv.append(table);
    table.classList.add("Commentable");

        

    
};


// Pie Chart Values Here - First bracket = Row minus 1. Second bracket = Column minus 1
function overalls(){
        overallscore.innerHTML = data[10][20].toFixed(1);
        contentscore.innerHTML = data[10][19].toFixed(1);
        facilscore.innerHTML = data[10][18].toFixed(1);
    };

    

    





function chartgeneration(){

var overallcalculation = (function CalcOverall() {
    let num1 = overallscore.innerHTML;
    let num2 = 5 - overallscore.innerHTML;
    // let num2 = 5 - overallscore.innerHTML; CHANGE THIS WHEN LOWER THAN 5
    // let calc = num2;
    return num2;
})()

var contentcalculation = (function CalcContent() {
    let num1 = contentscore.innerHTML;
    let num2 = 5 - contentscore.innerHTML;
    // let calc = num2 - num1;
    return num2;
})()

var facilcalculation = (function CalcFacil() {
    let num1 = facilscore.innerHTML;
    let num2 = 5 - facilscore.innerHTML;
    // let num2 = 5 - facilscore.innerHTML;  CHANGE THIS WHEN LOWER THAN 5
    // let calc = num2 - num1;
    return num2;
})()




overalldata = {
        datasets: [{
            data: [overallnumber,overallcalculation],
            backgroundColor: ['#94cfc0', '#dff1ec'],
            borderColor: '#ffffff',
        }],

        
    };


contentdata = {
        datasets: [{
            data: [contentnumber,contentcalculation],
            backgroundColor: ['#94cfc0', '#dff1ec'],
            borderColor: '#ffffff',
        }],

        
    };

facildata = {
        datasets: [{
            data: [facilnumber,facilcalculation],
            backgroundColor: ['#94cfc0', '#dff1ec'],
            borderColor: '#ffffff',
        }],

        
    };

new Chart(overalldoughnut, 
{
    type: 'doughnut',
    data: overalldata,
    
});

new Chart(contentdoughnut, 
{
    type: 'doughnut',
    data: contentdata,
    
});

new Chart(facildoughnut, 
{
    type: 'doughnut',
    data: facildata,
    
});

};







function chartgenerationtwo(){

// const barlab = data.filter("How would you rate");


var mod1 = data[10][24];
var mod2 = data[10][25];
var mod3 = data[10][27];
var mod4 = data[10][32];
var mod5 = data[10][33];

var lab1 = data[0][24].slice(18,-1);
var lab2 = data[0][25].slice(18,-1);
var lab3 = data[0][27].slice(18,-1);
var lab4 = data[0][32].slice(18,-1);
var lab5 = data[0][33].slice(18,-1);

moduledata = {
    labels: [lab1,lab2,lab3,lab4,lab5],
    datasets: [{
        data: [mod1,mod2,mod3,mod4,mod5],
        backgroundColor: ['#94cfc0', '#dff1ec'],
        borderColor: '#ffffff',
    }],
};

new Chart(modulebar,
    {
    type: 'bar',
    data: moduledata,
    options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true,
        elements: {
        bar: {
            borderWidth: 2,
        }
        },
        plugins: {
        legend: {
            display: false,
        }
        },
        
    },
    
    });


}



