// String util : remplace a character in a string at a position
var strReplace = function(str,char,position) {
	return str.substr(0, position) + char + str.substr(position + 1);
}

// Construct a random world
var worldBuilder = function(size){
	var world = "";
	while(world.length < size) {
		world += Array(Math.floor((Math.random()*10)+4)).join("_");
		world += "|";
	}
	return world.substring(1, size);
}