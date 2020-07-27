Vue.component('code_formatter', {
	template:`
<div class="code_formatter">
	<ul class="nav nav-tabs" id="cf-tabs" role="tablist">
	  <li class="nav-item" role="presentation">
		<a class="nav-link active" id="input-tab" data-toggle="tab" href="#input" role="tab" aria-controls="input" aria-selected="true">Input</a>
	  </li>
	  <li class="nav-item" role="presentation">
		<a class="nav-link" id="output-tab" data-toggle="tab" href="#output" role="tab" aria-controls="output" aria-selected="false">Output</a>
	  </li>
	</ul>
	<div class="tab-content" id="cf-tabs-content">
	  <div class="tab-pane fade show active" id="input" role="tabpanel"
	  aria-labelledby="input-tab">
		<code_viewer :src="src_input"></code_viewer>
	  </div>
	  
	  <div class="tab-pane fade" id="output" role="tabpanel"
	  aria-labelledby="output-tab">
		<code_viewer :src="src_output"></code_viewer>
	  </div>
	</div>
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