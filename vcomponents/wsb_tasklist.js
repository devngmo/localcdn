Vue.component('wsb_tasklist', {
	template:`
<div class="wsb_tasklist f1 v-flex" :name="name">
	<ul class="list-group task-list f1">
		<li v-for="(task, idx) in tasks" 
			v-on:click="openTask(idx)"
			:class="'task-card wsb-card task ' + taskStatusCardStyle(task)"
			v-html="renderTask(task)"
		>
		</li>
	</ul>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
			tasks: [],
			filter: {
				status: [],
				tags: [],
				excludeTags: [],
				query: null
			}
		};
	},
	mounted: function() {
		
	},
	methods: {
		renderTask: function(task) {
			let hashtag = task.hashtag;
			let bgColor = 'white';
			let color = 'black';
			let prj = app.getProjectById(task.project_id);
			if (prj !== null) {
				bgColor = prj.hashtagBgColor;
				color = prj.hashtagColor;
			}
			return `
				<span class="hashtag" style="background-color:${bgColor}; color: ${color}">${hashtag}</span>
				<span class="title">${task.title}</span>
				<span class="status-ico">${this.taskStatusIcon(task.status)}</span>`;
		},
		taskStatusCardStyle: function(task) {
			if (task.priority === WSBDefs.PRIORITY_URGENT) return 'cs-pr-urgent';
			if (task.priority === WSBDefs.PRIORITY_HIGH) return 'cs-pr-high';
			//if (task.priority === WSBDefs.PRIORITY_MEDIUM) return 'cs-pr-med';
			//if (task.priority === WSBDefs.PRIORITY_NORMAL) return 'cs-pr-med';
			//if (task.priority === WSBDefs.PRIORITY_LOW) return 'cs-pr-med';
			
			if (task.tags.indexOf(WSBDefs.TASK_TYPE_ISSUE) >= 0) return 'cs-danger';
			if (task.status === WSBDefs.TASK_STATUS_CANCELED) return 'cs-ignore';
			if (task.status === WSBDefs.TASK_STATUS_ON_PROGRESS) return 'cs-active';
			if (task.status === WSBDefs.TASK_STATUS_PENDING) return 'cs-pending';
			if (task.status === WSBDefs.TASK_STATUS_FINISHED) return 'cs-success';
			if (task.status === WSBDefs.TASK_STATUS_LATED) return 'cs-danger';
			return '';
		},
		taskStatusIcon: function(status) {
			if (status === WSBDefs.TASK_STATUS_CANCELED) return '<i class="fa fa-ban"></i>';
			if (status === WSBDefs.TASK_STATUS_ON_PROGRESS) return '<i class="fa fa-running"></i>';
			if (status === WSBDefs.TASK_STATUS_PENDING) return '<i class="fa fa-pause"></i>';
			if (status === WSBDefs.TASK_STATUS_FINISHED) return '<i class="fa fa-check"></i>';
			if (status === WSBDefs.TASK_STATUS_LATED) return '<i class="fa fa-exclamation"></i>';
			return '';
		},
		applyFilter: function() {
			console.log('[TASKLIST] apply filter...');
			let vm = this;
			
			api.filterTasks(this.filter)
			.then(resp => {
				console.log(resp);
				let ls = [];
				resp.data.map(t => {
					let task = t;
					if (t.tags === undefined) t['tags'] = [];
					if (t.status === undefined) t['status'] = WSBDefs.TASK_STATUS_ON_PROGRESS;
					if (t.hashtag === undefined) t['hashtag'] = '';
					if (t.priority === undefined) t['priority'] = WSBDefs.PRIORITY_NORMAL;
					ls.push(task);
				});
				vm.tasks = ls;
			});
		},
		openTask: function(index) {
			console.log(`[TASKLIST] open task [${index}]`);
			app.showTask(this.tasks[index]);
		},
		applyFilterOnResult: function() {
			let ls = [];
			for(let i = 0; i < this.tasks.length; i++) {
				let t = this.tasks[i];
				if (this.filter.status.indexOf( t.status ) >= 0) {
					ls.push(t);
				}
			}
			this.tasks = ls;
		}
	}
});