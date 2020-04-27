Vue.component('wsb_searchbox', {
	template:`
<div class="wsb_searchbox input-group mb-3">
	<input  
		v-model="query"
		type="text" class="form-control" 
		aria-label="Search">
	<div class="input-group-append">
		<button class="btn" v-on:click="createNew"><i class="fa fa-plus"></i></button>
		<button class="btn" v-on:click="search"><i class="fa fa-search"></i></button>
	</div>
</div>
	`,
	data: function() {
		return {
			query: ''
		};
	},
	methods: {
		createNew: function() {
			this.$emit('create', this.query);
		},
		search: function() {
			this.$emit('search', this.query);
		},
	}
});