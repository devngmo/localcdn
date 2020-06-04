 Vue.component('ffu_utilities_browser', {
	template:`
<div class="ffu_utilities_browser">
	<ul class="nav nav-tabs" id="myTab" role="tablist">
		<li class="nav-item">
			<a class="nav-link active" id="utilities-tab" data-toggle="tab" href="#utilities" role="tab" aria-controls="utilities" aria-selected="true">Utilities</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="tasks-tab" data-toggle="tab" href="#tasks" role="tab" aria-controls="tasks" aria-selected="false">Tasks</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false">History</a>
		</li>
	</ul>
	<div class="tab-content" id="myTabContent">
		<div class="tab-pane fade show active" id="utilities" role="tabpanel" aria-labelledby="utilities-tab">
			<ffu_filecmd></ffu_filecmd>
		</div>
		<div class="tab-pane fade" id="tasks" role="tabpanel" aria-labelledby="tasks-tab">
			<ffu_tasklist filter="current"></ffu_tasklist>
		</div>
		<div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
			<ffu_tasklist filter="history"></ffu_tasklist>
		</div>
	</div>
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