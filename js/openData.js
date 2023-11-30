// let data = d3.json("../data/coverage.csv");
function main() {
    d3.csv('/data/example.csv').then(
        function (d){
            console.log(d);
        }
    );
}

d3.csv("../data/expenditure.CSV", function(error, data) {
    if (error) {
        console.error("Error loading the CSV file:", error);
    } else {
        console.log(data[10]);
        console.log(data[10].State_Name);
    }
});