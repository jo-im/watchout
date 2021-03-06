// start slingin' some d3 here.
var svg = d3.select('body').append('svg');
var w = 1200;
var h = 800;

svg.attr('width', w).attr('height', h);

var dragstarted = function () {
  //playerCircle.style('fill', 'green');
};

var dragged = function (d) {
  d3.select(this).attr('x', d[0] = d3.event.sourceEvent.x)
                 .attr('y', d[1] = d3.event.sourceEvent.y);
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
var playerCircle = svg.selectAll('image')
                      .data(playerData)
                      .enter()
                      .append('image')
                      .attr('height', '80px')
                      .attr('width', '80px')
                      .attr('xlink:href', 'chibi_sakura_by_kandera-d412k7.png')
                      .call(drag);

playerCircle
    .attr('x', function(d) { return w / 2; })
    .attr('y', function(d) { return h / 2; })
    .attr('id', 'player');
    //.call(drag);


var dataset = [5, 10, 15, 20, 25, 30, 35, 40, 41, 42, 43];
// creating circles within our SVG
var shuriken = svg.selectAll('image')
                 .data(dataset)
                 .enter()
                 .append('image')
                 //.attr('r', '15px')
                 .attr('x', function(d) { return w * Math.random(); })
                 .attr('y', function(d) { return h * Math.random(); })
                 .attr('height', '30px')
                 .attr('width', '30px')
                 .attr('xlink:href', 'https://pixabay.com/static/uploads/photo/2013/07/12/18/46/throwing-star-153835_960_720.png')
                 .attr('class', 'enemies');                 

var update = function(data) {
  //data join
  //join new data with old elements

  //update
  //update old elements
  shuriken.attr('class', 'update')
         .attr('class', 'enemies')
         .transition()
         .duration(750)
         .attr('x', function(d) { return w * Math.random(); })
         .attr('y', function(d) { return h * Math.random(); });
};



setInterval(function() { update(shuriken); }, 1500);





// collision function
var collisionCount = 0;
var currentScore = 0;
var flag = false;

var game = function() {
  var player = d3.selectAll('image')[0][0];
  var enemies = d3.selectAll('image')[0].slice(1);
  var playerX = Number(player.attributes.x.value);
  var playerY = Number(player.attributes.y.value);
   ///// x + h/ 2 and y + h /2 
  // var timer = d3.timer(function(elapsed) {
  //   if (collisionCount < 5) {
  //     d3.selectAll('#currentScore').text(elapsed / 1000);
  //   }
  // }, 1000
  
  for (var i = 0; i < enemies.length; i++) {
    var enemiesX = Math.abs(enemies[i].attributes.x.value);
    var enemiesY = Math.abs(enemies[i].attributes.y.value);
   

    if (playerX < enemiesX + 30 && playerX + 65 > enemiesX && playerY < enemiesY + 30 && 128 + playerY > enemiesY) {
      // console.log('colliding!');
      // console.log('before incrementing collisionCount, collisionCount is', collisionCount);
      //  //increment collisionCount
      increaseCollision();
      // console.log('JUST incremented collisionCount', collisionCount);
      // if (Number(d3.selectAll('#currentScore').text()) > Number(d3.selectAll('#highScore').text())) {
      //    //have high score equal to the current score
      //   d3.selectAll('#highScore').text(d3.selectAll('#currentScore').text());
      //  //set current score to 0
      //   d3.selectAll('#currentScore').text('0');
      // }
      //  //if collisionCount is equal to 5
      // if (collisionCount === 5) {
      //   //have current score equal to 0
      //   d3.selectAll('#currentScore').text('0');
      //   currentScore = 0;
      // //have collisionCount to equal to 0
      //   d3.selectAll('#collisionCount').text('0');
      //   collisionCount = 0;
      // } else {
      //   console.log('We incremented collisionCount and collisionCount is now', collisionCount);
      //   d3.selectAll('#collisionCount').text(collisionCount);
      //  //if current score is greater than the high score
      // }
    }
  }
};

var increaseCollision = function() {
  if (flag) {
    return;
  } else {
    collisionCount++;
    // d3.selectAll('.scoreboard').transition().duration(1000).style('background-color', d3.rgb(255,0,0));
    flag = true;
    setTimeout(function() { flag = false; }, 1000);
    if ( Number(d3.selectAll('#currentScore').text()) > Number(d3.selectAll('#highScore').text())) {
      d3.selectAll('#highScore').text(d3.selectAll('#currentScore').text());
      d3.selectAll('#currentScore').text('0');
    }
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

    // d3.selectAll('.scoreboard').transition().duration(1000).style('background-color', d3.rgb(255,255,255));
  }
};

setInterval(function() {
  game();
}, 40);


var timer = setInterval(function() { currentScore++; d3.selectAll('#currentScore').text(currentScore); }, 1000);

// setInterval(function() {
//   var currentTime = 
//   d3.selectAll()
// }, 1000)



