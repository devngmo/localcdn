function sidebar(id) {
	let overlayElement = $(`#${id}-overlay`);
	let isCreateNew = false;
	if (overlayElement === undefined || overlayElement === null || overlayElement.length === 0) {
		let overlayHTML = `<div id="${id}-overlay" class="sidebar-overlay show"></div>`;
		$('body').append(overlayHTML);
		isCreateNew = true;
	}
	let overlay = $(`#${id}-overlay`);
	
	let jctrl = {
		el: `#${id}`,
		show: function() {
			$(this.el).removeClass('hide');
			$(this.el).addClass('show');
			
			overlay.removeClass('hide');
			overlay.addClass('show');
		},
		hide: function() {
			$(this.el).addClass('hide');
			$(this.el).removeClass('show');
			
			overlay.addClass('hide');
			overlay.removeClass('show');
		}
	};
	
	if (isCreateNew) {
		
		overlay.on('click', function() {
			jctrl.hide();
		});
	}
		
	return jctrl;
}