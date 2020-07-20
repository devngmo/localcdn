const app = new Vue({
	el: '#app',
	data: {
		tabs : [
		    { id: 'installed', title: 'Installed' },

			{ id: 'favorite', title: 'Favorite' },
			
			{ id: 'hot', title: 'Hot' },
			
			{ id: 'games', title: 'Games' },
            
            { id: 'tools', title: 'Tools' }
		],
        curTabId: 'installed'
	},
	mounted : function() {

	},
	created: function() {
		console.log('[AppBrowser] created');
	},
	watch: {
		curTabId: function(newVal, oldVal) {
            
        }
	},
	computed: {
		
	},
	methods: {
		onNavTabChanged: function(tab_id) {
			console.log(this.task);
			this.curTabId = tab_id;
		}
	}
});
