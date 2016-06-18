// start slingin' some d3 here.
var svg = d3.select('body').append('svg');
var w = 1200;
var h = 800;

svg.attr('width', w).attr('height', h);

var dragstarted = function () {
  playerCircle.style('fill', 'green');
};

var dragged = function (d) {
  d3.select(this).attr('cx', d[0] = d3.event.sourceEvent.x)
                 .attr('cy', d[1] = d3.event.sourceEvent.y);
};

// do we need this?
var dragended = function () {
  d3.select(this).classed('dragging', false);
};


var drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on('dragstart', dragstarted)
        .on('drag', dragged)
        .on('dragend', dragended);


var playerData = [1];
// player circle
var playerCircle = svg.selectAll('circle')
                      .data(playerData)
                      .enter()
                      .append('circle')
                      .call(drag);

playerCircle.attr('r', '10px')
    .attr('cx', function(d) { return w / 2; })
    .attr('cy', function(d) { return h / 2; })
    .attr('id', 'player');
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

// var update = function(data) {
//   //data join
//   //join new data with old elements

//   //update
//   //update old elements
//   circles.attr('class', 'update')
//          .attr('class', 'enemies')
//          .transition()
//          .duration(750)
//          .attr('cx', function(d) { return w * Math.random(); })
//          .attr('cy', function(d) { return h * Math.random(); });
// };



//setInterval(function() { update(circles); }, 1500);





// collision function

var collision = function() {
  var player = d3.selectAll('circle')[0][0];
  var enemies = d3.selectAll('circle')[0].slice(1);

  for (var i = 0; i < enemies.length; i++) {
    //console.log('enemies[i].attributes.cx.value is', enemies[i].attributes.cx.value);
    // if (Math.round(enemies[i].attributes.cx.value) === Math.round(player.attributes.cx.value) && Math.round(enemies[i].attributes.cy.value) === Math.round(player.attributes.cy.value)) {
    //   console.log('colliding!!!');
    // }

    if ( Math.abs(enemies[i].attributes.cx.value - player.attributes.cx.value) <= 19 && Math.abs(player.attributes.cy.value - enemies[i].attributes.cy.value) <= 19 ) {
      console.log('enemies[i] is', enemies[i]);
      console.log('colliding!!!');
    }
  }
};

setInterval(function() {
  collision();
}, 100);






