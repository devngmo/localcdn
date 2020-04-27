Vue.component('wsb_tasknow', {
	template:`
<div class="wsb_tasknow">
	<input id="cbxPersonal" type="checkbox" checked data-toggle="toggle" data-width="200px"
		data-on="<i class='fa fa-user-lock'></i> Personal" 
		data-off="<i class='fa fa-user-tie'></i> Company"
		data-offstyle="primary"
		data-onstyle="warning"
	>
	<wsb_tasklist name="tasknow" :task_filter="task_filter"></wsb_tasklist>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
			task_filter: {
				tags: ['now']
			}
		};
	},
	mounted: function() {
	},
	methods: {
	}
});