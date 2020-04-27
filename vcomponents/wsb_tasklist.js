Vue.component('wsb_tasklist', {
	template:`
<div class="wsb_tasklist" :name="name">
	<ul class="list-group">
		<li class="list-group-item wsb-card task" v-for="task in tasks">
		{{task.title}}
		</li>
	</ul>
</div>
	`,
	props: ['name', 'task_filter'],
	data: function() {
		return {
			tasks: []
		};
	},
	mounted: function() {
		api.filterTasks(this.$props.task_filter);
	},
	methods: {
	}
});