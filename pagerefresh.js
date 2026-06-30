var delcomment = [];
var deloverall = [];

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
                
                var testrow = {
                    
                    comments: results.data[i][18],
                    overall: results.data[i][21],
                    
                    
                };

                delcomment.push(testrow.comments);
                deloverall.push(testrow.overall);

            

            
            };
            delcomment = delcomment.filter(function (el) {
                    return el != null;
                });
            deloverall = deloverall.filter(function(el) {
                return el != null;
            });

            deloverall = average(deloverall);
            // console.log(average(deloverall));
            console.log(deloverall);

    }});
};


function sum(arr) {
                return arr.reduce(function (a, b) {
                    return a + b;
                }, 0);
            } 

function average(arr) {
                let avr = sum(arr) / arr.length;
                avr.toFixed(1);
                return parseFloat(avr.toFixed(1)); 
}







