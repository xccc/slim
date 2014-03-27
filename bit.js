function test1() {

	this.smexy = 'hehe';
	var secret = 'ekek';

}
var test1 = new test1();
console.log(test1.smexy)

function test2() {

	return {

	free: function() {
		console.log('im available!');
	}
	}


}

var hot = (function() {

	this.lul = 'pede';
	return {
	 freex: function() { console.log('pihkar'); } 
	}
});

console.log(hot().lul)
