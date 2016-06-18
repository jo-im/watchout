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

var update = function(data) {
  //data join
  //join new data with old elements

  //update
  //update old elements
  circles.attr('class', 'update')
         .attr('class', 'enemies')
         .transition()
         .duration(750)
         .attr('cx', function(d) { return w * Math.random(); })
         .attr('cy', function(d) { return h * Math.random(); });
};



setInterval(function() { update(circles); }, 1500);





// collision function
var collisionCount = 0;
var currentScore = 0;
var game = function() {
  var player = d3.selectAll('circle')[0][0];
  var enemies = d3.selectAll('circle')[0].slice(1);
  // var timer = d3.timer(function(elapsed) {
  //   if (collisionCount < 5) {
  //     d3.selectAll('#currentScore').text(elapsed / 1000);
  //   }
  // }, 1000);
  for (var i = 0; i < enemies.length; i++) {
    //console.log('enemies[i].attributes.cx.value is', enemies[i].attributes.cx.value);
    // if (Math.round(enemies[i].attributes.cx.value) === Math.round(player.attributes.cx.value) && Math.round(enemies[i].attributes.cy.value) === Math.round(player.attributes.cy.value)) {
    //   console.log('colliding!!!');
    // }
    
    if ( Math.abs(enemies[i].attributes.cx.value - player.attributes.cx.value) <= 20 && Math.abs(player.attributes.cy.value - enemies[i].attributes.cy.value) <= 20 ) {
       console.log('colliding!');
       console.log('before incrementing collisionCount, collisionCount is', collisionCount);
       //increment collisionCount
      collisionCount++;
      console.log('JUST incremented collisionCount', collisionCount);
       //if collisionCount is equal to 5
      if (collisionCount === 5) {
        //have current score equal to 0
        d3.selectAll('#currentScore').text('0');
        currentScore = 0;
      //have collisionCount to equal to 0
        d3.selectAll('#collisionCount').text('0');
        collisionCount = 0;
      } else {
        console.log('We incremented collisionCount and collisionCount is now', collisionCount);
        d3.selectAll('#collisionCount').text(collisionCount);
       //if current score is greater than the high score
      }
      if (Number(d3.selectAll('#currentScore').text()) > Number(d3.selectAll('#highScore').text())) {
         //have high score equal to the current score
        d3.selectAll('#highScore').text(d3.selectAll('#currentScore').text());
       //set current score to 0
        d3.selectAll('#currentScore').text('0');
      }
    }
  }
};

setInterval(function() {
  game();
}, 100);


var timer = setInterval(function() { currentScore++; d3.selectAll('#currentScore').text(currentScore); }, 1000);

// setInterval(function() {
//   var currentTime = 
//   d3.selectAll()
// }, 1000)



