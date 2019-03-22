String.prototype.trim = function() {
	let str = this.replace(/^\s+/, ""),
		end = str.length - 1,
		ws = /\s/;
	while (ws.test(str.charAt(end))) {
		end--;
	}
	return str.slice(0, end + 1);
}

if(!window.requestAnimationFrame){
    let lastTime = 0;
    window.requestAnimationFrame = function(callback){
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0,16.7-(currTime - lastTime));
        let id  = window.setTimeout(function(){
            callback(currTime + timeToCall);
        },timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}