Vue.component('code_viewer', {
	template:`
<div class="code_viewer">
	
</div>
	`,
	data: function() {
		return {
			src_input : '',
			src_output: ''
		};
	},
	watch: {
		src_input: function(newVal, oldVal) {
			if (newVal != null)
				this.checkAndBeautify();
		}
	},
	created: function() {
		
	},
	mounted: function() {
		
	},
	methods: {
		checkAndBeautify: function() {
			console.log('Detect code language and beautify it...');
			this.src_output = this.src_input;
		}
	}
});