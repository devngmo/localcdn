Vue.component('wsb_projects', {
	template:`
<div class="wsb_projects">
	<div class="h-flex">
		<input id="cbxPersonal" type="checkbox" checked data-toggle="toggle" data-width="200px"
			data-on="<i class='fa fa-user-lock'></i> Personal" 
			data-off="<i class='fa fa-user-tie'></i> Company"
			data-offstyle="warning"
			data-onstyle="primary"
		>
		
		<input id="cbxState" type="checkbox" checked data-toggle="toggle" data-width="200px"
			data-on="<i class='fa fa-running'></i> Active" 
			data-off="<i class='fa fa-globe'></i> All"
			data-offstyle="warning"
			data-onstyle="primary"
		>
	</div>
	<ul class="list-group project-list h100">
		<li v-for="(prj, idx) in projects" 
			v-on:click="openProject(idx)"
			:class="'prj-card wsb-card ' + prjStatusCardStyle(prj.status)"
			v-html="renderProjectCard(prj)"
		>
		</li>
	</ul>
</div>
	`,
	props: [],
	data: function() {
		return {
			isPersonal: true,
			isActiveOnly: true,
			
			projects: [],
			filter: {
				status: [WSBDefs.STATUS_ON_PROGRESS, WSBDefs.STATUS_CONCEPT, WSBDefs.STATUS_LATED],
				tags: [],
				excludeTags: [],
				query: null
			}
		};
	},
	mounted: function() {
		let inps = $('.wsb_projects input');
		inps.change(evt => {
			if (evt.target.id === 'cbxPersonal') {
				this.isPersonal = $(evt.target).prop('checked');
			} else if (evt.target.id === 'cbxState') {
				this.isActiveOnly = $(evt.target).prop('checked');
			}
			this.onFilterChanged();
		});
		
		this.applyFilter();

	},
	methods: {
		prjStatusCardStyle: function(status) {
			if (status === WSBDefs.STATUS_CANCELED) return 'cs-ignore';
			if (status === WSBDefs.STATUS_CONCEPT) return 'cs-suggest';
			if (status === WSBDefs.STATUS_ON_PROGRESS) return 'cs-active';
			if (status === WSBDefs.STATUS_PENDING) return 'cs-pending';
			if (status === WSBDefs.STATUS_FINISHED) return 'cs-success';
			if (status === WSBDefs.STATUS_LATED) return 'cs-danger';
			return '';
		},
		renderProjectCard: function(prj) {
			return `
				<span class="prjcode">${prj.code}</span>
				<span class="title">${prj.name}</span>
				<span class="status-ico">${this.statusIcon(prj.status)}</span>`;
		},
		statusIcon: function( status) {
			if (status === WSBDefs.STATUS_CANCELED) return '<i class="fa fa-ban"></i>';
			if (status === WSBDefs.STATUS_CONCEPT) return '<i class="fa fa-lightbulb"></i>';
			if (status === WSBDefs.STATUS_ON_PROGRESS) return '<i class="fa fa-running"></i>';
			if (status === WSBDefs.STATUS_PENDING) return '<i class="fa fa-pause"></i>';
			if (status === WSBDefs.STATUS_FINISHED) return '<i class="fa fa-check"></i>';
			if (status === WSBDefs.STATUS_LATED) return '<i class="fa fa-exclamation"></i>';
			return '';
		},
		openProject: function(idx) {
			app.activeViewId = WSBDefs.VIEWID_PROJECT;
			app.$refs.project_detail.showProject(this.projects[idx]);
		},
		applyFilterOnResult: function() {
			this.applyFilter();
		},
		applyFilter: function() {
			console.log('[PROJECT LIST] apply filter...');
			let vm = this;
			
			api.filterProjects(this.filter)
			.then(resp => {
				console.log(resp);
				let ls = [];
				resp.data.map(prj => {
					if (prj.tags === undefined) prj['tags'] = [];
					if (prj.status === undefined) prj['status'] = WSBDefs.STATUS_ON_PROGRESS;
					if (prj.favorite === undefined) prj['favorite'] = false;
					
					ls.push(prj);
				});
				vm.projects = ls;
			});
		},
		updateFilterQuery: function(query) {
			this.filter.query = query;
			this.onFilterChanged();
		},
		onFilterChanged : function() {
			let tags = [];
			let excludeTags = [];
			if (this.isPersonal) excludeTags.push(WSBDefs.TAG_BUSINESS);
			else tags.push(WSBDefs.TAG_BUSINESS);
			if (this.isActiveOnly) {
				this.filter.status = [WSBDefs.TASK_STATUS_ON_PROGRESS];
			}
			else {
				this.filter.status = [];
			}
			
			this.filter.tags = tags;
			this.filter.excludeTags = excludeTags;
			this.applyFilter();
		}
	}
});