// start slingin' some d3 here.
var svg = d3.select('body').append('svg');
var w = 1200;
var h = 800;

svg.attr('width', w).attr('height', h);

var drag = d3.behavior.drag()
        .origin(function(d) { return d;})
        .on('dragstart', dragstarted)
        .on('drag', dragged)
        .on('dragend', dragended);


function dragstarted () {
  playerCircle.style('fill', 'green');
}

function dragged() {
  console.log('d3.event', d3.event);
  playerCircle.attr('cx', d3.event.x);
  playerCircle.attr('cy', d3.event.y);
}

function dragended() {
  d3.select(this).classed('dragging', false);
}

var playerData = [1];
// player circle
var playerCircle = svg.selectAll('circle')
                      .data(playerData)
                      .enter()
                      .append('circle')
                      .call(drag);

playerCircle.attr('r', '5px')
    .attr('cx', function(d) { return w / 2; })
    .attr('cy', function(d) { return h / 2; })
    .attr('id', 'player')
    //.call(drag);


var dataset = [5, 10, 15, 20, 25, 30, 35, 40, 41, 42, 43];
// creating circles within our SVG
var circles = svg.selectAll('circle')
                 .data(dataset)
                 .enter()
                 .append('circle')
                 .attr('r', '15px')
                 .attr('cx', function(d) { return w * Math.random(); })
                 .attr('cy', function(d) { return h * Math.random(); })
                 .attr('class', 'enemies');

var update = function(data) {
  //data join
  //join new data with old elements

  //update
  //update old elements
  circles.attr('class', 'update')
         .transition()
         .duration(750)
         .attr('cx', function(d) { return w * Math.random(); })
         .attr('cy', function(d) { return h * Math.random(); });
};

setInterval(function() { update(circles); }, 1500);


// dragging method for player









// data set for our enemies
// var enemiesData = d3.range(5).map(function() {
//   var x = Math.random() * w;
//   var y = Math.random() * h;
//   return {
//     vx: Math.random() * 2 - 1,
//     vy: Math.random() * 2 - 1,
//     path: d3.range(12).map(function() { return [x, y]; })
//   }
// })

// // creating group of elements w/n SVG
// // var g = svg.selectAll('g')
// //            .data(enemiesData)
// //            .enter()
// //            .append('g')
// //            .attr('cx', function(d) { return d.x })
// //            .attr('cy', function(d) { return d.y });

// // appending circle to group of elements
// var circles = svg.selectAll('circle')
//    .data(enemiesData)
//    .enter()
//    .append('circle')
//    .attr('r', '5px')
//    .attr('class', 'enemies');
//    .attr('cx', function(d) { return d.x })
//    .attr('cy', function(d) { return d.y });

