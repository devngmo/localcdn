Vue.component('wsb_projects', {
	template:`
<div class="wsb_projects">
	<div>
		<input id="cbxPersonal" type="checkbox" checked data-toggle="toggle" data-width="200px"
			data-on="<i class='fa fa-user-lock'></i> Personal" 
			data-off="<i class='fa fa-user-tie'></i> Company"
			data-offstyle="primary"
			data-onstyle="warning"
		>
		<input id="cbxPrjActive" type="checkbox" checked data-toggle="toggle" data-width="200px"
			data-on="<i class='fa fa-running'></i> Active Only" 
			data-off="<i class='fa fa-globe'></i> All"
			data-offstyle="primary"
			data-onstyle="info"
		>
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