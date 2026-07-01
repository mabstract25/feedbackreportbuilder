var delcomment = [];
var deloverall = [];
var delcontent = [];
var delmodNPS = [];

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
                    
                };

                delcomment.push(testrow.comments);
                deloverall.push(testrow.overall);
                delcontent.push(testrow.content);

            
            };
            delcomment = delcomment.filter(function (el) {
                    return el != null;
                });
            
            deloverall = deloverall.filter(function(el) {
                return el != null;
            });
            
            deloverall = average(deloverall);
            delcontent = average(delcontent);
            console.log(delcontent, deloverall)
            // console.log(deloverall);

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
    for (const element of arr) {
        if (element >= 9) {
            promoters += 1;
        }
    }
    console.log(promoters);
};

// Promoters - 9 & 10
// Detracters - 1 - 6
// Passives - 7 & 8 

// Formula - Total up the 9 & 10s, subtract the total number of 1 - 6, divide this new total by total number of respondants, then times by 100.





