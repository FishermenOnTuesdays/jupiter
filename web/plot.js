jQuery(function(){
    jQuery("#draw").click(onDraw);
});

function onDraw()
{
    //data.name = jQuery("#name").val();
    //data.new_user = jQuery("#new_user").val();
    //data.rawText = jQuery("#"+data.textNum + " .inner").text();
    //data.userText = jQuery("#text").val();

    data = {
        "x": jQuery("#x").val(),
        "y": jQuery("#y").val(),
        "z": jQuery("#z").val()
    }

    console.log("gone");
    jQuery.post('http://127.0.0.1:5000', data, success)
    
}

function success(data)
{
    console.log(data);
    console.log("success");
}

//--------------------------------------------------------------------------
function plot() {
    Plotly.d3.csv("out.csv", function(data){ processData(data) } );
    };

function processData(allRows) {

console.log(allRows);
var x = [], y = [], xx = [], t = [], z = [];

for (var i = 0; i < allRows.length; i++) {
    row = allRows[i];
    x.push(row['x']);
    y.push(row['y']);
    xx.push(row['xx']);
    t.push(row['t']);
    z.push(row['z']);
}
//console.log('X', x, 'Y', y);
makePlotXY(x, y);
makePlotPoincare(x, xx);
makePlotXYt(x, y, t);
makePlotXY_3D(x, y, z)
}

function makePlotXY(x, y){
var plotDiv = document.getElementById("plot");
var traces = [{
    x: x,
    y: y
}];

Plotly.newPlot('chartXY', traces,
    {title: 'Фазовая кривая'});
};

function makePlotPoincare(x, y){
var plotDiv = document.getElementById("plot");
var traces = [{
    x: x,
    y: y
}];

Plotly.newPlot('chartPoincare', traces,
    {title: 'Пуанкаре'});
};

function makePlotXYt(x, y, t){
var plotDiv = document.getElementById("plot");
var traceX = {
    x: t,
    y: x,
    name: 'x'
};

var traceY = {
    x: t,
    y: y,
    name: 'y'
};

traces = [traceX, traceY];

Plotly.newPlot('chartXYt', traces,
    {title: 'XYt'});
};

function makePlotXY_3D(x, y, z){
var plotDiv = document.getElementById("plot");

// base plane
var basePlane = [];
for(let x = 0; x <= 10; x++){
    var line = []
    for(let y = 0; y <= 10; y++)
        line.push(0)
    basePlane.push(line)
}

// input plane
var inputPlane = [];
for(let x = 0; x <= 10; x++){
    var line = []
    for(let y = 0; y <= 10; y++)
        line.push(-x-y-2)
    inputPlane.push(line)
}

function getData() {
    var basePlane = [];
    for(let i = 0; i<10; i++)
    basePlane.push(Array(10).fill().map(() => 0))
    return basePlane;
}  

var data = getData();
//console.log(data);

var trace = {
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    opacity: 1,
    line: {
        color: '#000000'
    },
    name: 'flow'
};

var base = {
    z: basePlane,
    showscale: false,
    opacity: 0.1,
    type: 'surface',
    name: 'базовая плоскость'
};

var input = {
    z: inputPlane,
    showscale: false,
    opacity: 0.9,
    type: 'surface',
    name: 'данная плоскость'
};

data = [base, input, trace];

Plotly.newPlot('chartXY3D', data,
    {
        title: 'XY',
        height: 1000
    });
};

//--------------
plot();