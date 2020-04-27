Vue.component('wsb_docs', {
	template:`
<div class="wsb_docs">
	<input id="cbxDocs" type="checkbox" checked data-toggle="toggle" data-width="100px"
		data-on="<i class='fa fa-file'></i> Docs" 
		data-off="<i class='fa fa-file'></i> <span class='line-through'>Docs</span>"
	>
	<input id="cbxNotes" type="checkbox" checked data-toggle="toggle"  data-width="130px"
		data-on="<i class='fa fa-sticky-note'></i> Notes" 
		data-off="<i class='fa fa-note'></i> <span class='line-through'>Notes</span>"
	>
	<input id="cbxGuidelines" type="checkbox" checked data-toggle="toggle" data-width="150px"
		data-on="<i class='fa fa-shoe-prints'></i>Guidelines" 
		data-off="<i class='fa fa-shoe-prints'></i><span class='line-through'>Guidelines</span>"
	>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
		};
	},
	mounted: function() {
	},
	methods: {
	}
});