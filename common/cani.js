const CANI = {
	blinkBackground: function(el, colorStep = 30, blinkInterval=20, timeout = 800) {
		let cl = 0;
		let jel = $(el);
		let timePassed= 0;
		let currentColor = jel.css('background-color');
		
		let fn = setInterval(() => {
			timePassed += blinkInterval;
			if (timePassed >= timeout) {
				clearInterval(fn);
				jel.css('background-color', '');
				return;
			}
			cl+= colorStep;
			if (cl > 510) cl = 0;
			
			let channel = cl;
			if (cl > 255)
				channel = 255 - (cl-255);
			
			$(el).css('background-color', `RGB(${channel},${channel},${channel})`);
		}, blinkInterval);
	}
};