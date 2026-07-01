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

            for(var i = 1; i < results.data.length; i++) {
                
                // Creating Pie & Comments Data
                var testrow = {
                    
                    comments: results.data[i][18],
                    overall: results.data[i][21],
                    content: results.data[i][20],
                    modNPS: results.data[i][22],
                    orgNPS: results.data[i][23],
                    facilexp: results.data[i][26],
                    
                };
                
                delcomment.push(testrow.comments);
                deloverall.push(testrow.overall);
                delcontent.push(testrow.content);
                delmodNPS.push(testrow.modNPS);
                delorgNPS.push(testrow.orgNPS);
                facilexpholder.push(testrow.facilexp);
            
            };
            delcomment = delcomment.filter(function (el) {
                    return el != null;
                });
            
            // Null filter not needed for score values.
            // deloverall = deloverall.filter(function(el) {
            //     return el != null;
            // });
            
            deloverall = average(deloverall);
            delcontent = average(delcontent);
            delmodNPS = NPS(delmodNPS);
            delorgNPS = NPS(delorgNPS);
            console.log(facilexpholder);
            likertValues(facilexpholder, delfacilexp);

    }});
};


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
    console.log(promoters, passives, detractors);

    return parseFloat((((promoters - detractors) / arr.length) * 100).toFixed(0));

};

function likertValues(arr, ref) {
    console.log(arr);
    console.log(ref.phrOne);
    let count = 0;
    let source = arr;
    
    // for (entry of source)  {
    //         if ;
    //     };
        
    // console.log(count);
    
};

// Promoters - 9 & 10
// Detracters - 1 - 6
// Passives - 7 & 8 

// Formula - Total up the 9 & 10s, subtract the total number of 1 - 6, divide this new total by total number of respondants, then times by 100.





