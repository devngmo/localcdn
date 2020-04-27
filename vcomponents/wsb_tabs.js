Vue.component('wsb_tabs', {
	template:`
<div>
<ul class="nav nav-tabs wsb_tabs" role="tablist" :name="name">
	<li class="nav-item" v-for="tab in tabs">
		<a :class="['nav-link', active_tab==tab.id?'active':'']" 
			data-toggle="tab" :href="'#tab_content_' + tab.id" role="tab" :aria-controls="tab.id" aria-selected="false">{{tab.title}}</a>
	</li>
</ul>


<div class="tab-content" id="nav-tabs-categories-content">
	<div class="tab-pane show active" id="tab_content_tasknow" role="tabpanel" aria-labelledby="tasknow-tab">
		<wsb_tasknow></wsb_tasknow>
	</div>

	<div class="tab-pane fade " id="tab_content_docs" role="tabpanel" aria-labelledby="docs-tab">
		<wsb_docs></wsb_docs>
	</div>
	
	<div class="tab-pane fade" id="tab_content_projects" role="tabpanel" aria-labelledby="projects-tab">
		<wsb_projects></wsb_projects>
	</div>
</div>
				
</div>				
	`,
	props: ['name', 'tabs'],
	data: function() {
		return {
			query: '',
			active_tab: ''
		};
	},
	mounted: function() {
		
		if (this.$props.tabs !== null && this.$props.tabs.length > 0) {
			this.active_tab = this.$props.tabs[0].id;
		}
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