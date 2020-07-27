function ColoredSelect(selector) {
	return {
		selector : selector,
		init: function() {
			let sel = $(this.selector);
			if (sel === undefined || sel === null) return;
			
			//console.log(`[COLORED-SELECT] init: ${this.selector}`);
			let cs = this;
			sel.on('change', evt => {
				//console.log('on change ');
				cs.applySelectionColor(evt.target);
			});
			
		},
		
		applySelectionColor: function(element = null) {
			//console.log('applySelectionColor');
			let target = element;
			if (target === null){ 
				let targets = $(this.selector);
				for(let i = 0; i < targets.length; i++) {
					this.applySelectionColor(targets[i]);
				}
				return;
			}
			
			
			let classes = target.className.split(' ');
			let newClasses = '';
			for(let i = classes.length-1; i >= 0; i--) {
				if (!classes[i].startsWith('cs-')) {
					newClasses += ' ' + classes[i];
				}
			}
			
			target.className = newClasses;
			if (target.selectedOptions.length > 0)
				target.className += ' ' + target.selectedOptions[0].className;
			
			//console.log(`[COLORED-SELECT] apply className: ${target.className}`);
		}
	};
	
}