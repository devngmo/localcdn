Vue.component('wsb_tasknow', {
	template:`
<div class="wsb_tasknow v-flex h100">
	<div class="h-flex">
		<input id="cbxPersonal" type="checkbox" checked data-toggle="toggle" data-width="120px"
			data-on="<i class='fa fa-user-lock'></i> Me" 
			data-off="<i class='fa fa-user-tie'></i> Com"
			data-offstyle="warning"
			data-onstyle="primary"
		>
		
		<input id="cbxState" type="checkbox" checked data-toggle="toggle" data-width="100px"
			data-on="<i class='fa fa-running'></i> Active" 
			data-off="<i class='fa fa-globe'></i> All"
			data-offstyle="warning"
			data-onstyle="primary"
		>
	</div>
	<wsb_tasklist ref="tasklist" name="tasknow"></wsb_tasklist>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
			isPersonal: true,
			isActiveOnly: true
		};
	},
	mounted: function() {
		let inps = $('.wsb_tasknow input');
		inps.change(evt => {
			if (evt.target.id === 'cbxPersonal') {
				this.isPersonal = $(evt.target).prop('checked');
			} else if (evt.target.id === 'cbxState') {
				this.isActiveOnly = $(evt.target).prop('checked');
			}
			this.onFilterChanged();
		});
		
		this.$refs.tasklist.filter = {
			status: [WSBDefs.TASK_STATUS_ON_PROGRESS],
			tags: [],
			excludeTags: [],
			query: null
		};
		this.$refs.tasklist.applyFilter();
	},
	methods: {
		onToggleTagChanged: function() {
			//console.log('[TASKNOW] onToggleTagChanged');
			this.onFilterChanged();
		},
		onFilterChanged: function() {
			let tags = [];
			let excludeTags = [];
			if (this.isPersonal) excludeTags.push(WSBDefs.TAG_BUSINESS);
			else tags.push(WSBDefs.TAG_BUSINESS);
			if (this.isActiveOnly) {
				this.$refs.tasklist.filter.status = [WSBDefs.TASK_STATUS_ON_PROGRESS];
			}
			else {
				this.$refs.tasklist.filter.status = [];
			}
			
			this.$refs.tasklist.filter.tags = tags;
			this.$refs.tasklist.filter.excludeTags = excludeTags;
			this.$refs.tasklist.applyFilter();
		},
		updateFilterQuery: function(query) {
			this.$refs.tasklist.filter.query = query;
			this.onFilterChanged();
		}
	}
});