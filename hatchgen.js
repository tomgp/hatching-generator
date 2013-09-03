var Canvas = require('canvas');
var fs = require('fs');
var HatchingGenerator = {};
module.exports = HatchingGenerator;

HatchingGenerator.drawFill = function(colours, strip_width, file){
	console.log("HatchingGenerator:  draw "  + file)
	var drawShape = function(context, points, fill, stroke){
		context.beginPath();
		context.fillStyle = fill;
		context.strokeStyle = stroke;
		context.moveTo(points[points.length-1].x, points[points.length-1].y );
		for(var i = 0; i<points.length; i++){
			context.lineTo(points[i].x, points[i].y);
		}
		context.stroke();
		context.fill();
	}
	//create a canavs based on how many stripes we need
	canvas_dim = strip_width * colours.length
	
	var first = true;
	var canvas = new Canvas(canvas_dim, canvas_dim);
	var ctx = canvas.getContext('2d');
	//ctx.globalCompositeOperation = 'destination-out';
	//draw the first half of the stripes
	for (var i = 0;i < colours.length; i++){
		i = Number(i);
		var points = [
			{x:0, y:(strip_width * i)},
			{x:0, y:strip_width * (i+1)},
			{x:strip_width * (i+1),y:0},
			{x:strip_width * i,y:0}];
		drawShape(ctx, points,  colours[i].fill,  colours[i].stroke);
	}
	for (var i = 0;i < colours.length; i++){
		i = Number(i);
		var points = [
			{x:(strip_width * i), y:canvas_dim},
			{x:strip_width * (i+1), y:canvas_dim},
			{x:canvas_dim, y:strip_width * (i+1)},
			{x:canvas_dim, y:strip_width * i}];
		drawShape(ctx, points,  colours[i].fill,  colours[i].stroke);
	}
	console.log('writing file')
	var out = fs.createWriteStream(file);
  	var stream = canvas.createPNGStream();

	stream.on('data', function(chunk){
		out.write(chunk);
	});
}

HatchingGenerator.test = function(){
	var c = [{fill:'rgba(255,50,90,0.5)',stroke:'rgba(255,50,90,0.5)'},
		{fill:'#000',stroke:'#000'}];

	HatchingGenerator.drawFill(c, 20, "test/tile2.png");
}

function example () {
	HatchingGenerator
}

if (require.main === module) {
	HatchingGenerator.test();
}