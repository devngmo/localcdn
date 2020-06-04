Vue.component('wsb_project_detail', {
	template:`
<div class="wsb_project_detail">
	<div class="view-title">
		<button class="btn btn-info" v-on:click="goBack"><i class="fa fa-arrow-left"></i> Back</button>
		<div>
			<b>{{titleBarDisplayText}}</b>
		</div>
		<button v-if="prj.favorite" class="btn btn-danger" v-on:click="toggleFavorite">
			<i class="fa-heart fa"></i>
		</button>
		<button v-if="prj.favorite==false" class="btn btn-secondary" v-on:click="toggleFavorite">
			<i class="fa-heart far"></i>
		</button>
	</div>


	<div class="page-project-detail">
		<button class="btn btn-danger" v-on:click="askArchiveThisProject">Archive this project!</button>
	</div>
</div>
	`,
	props: [],
	data: function() {
		return {
			prj : { id: null, code: null, name: null, tags: [], desc: null, status: WSBDefs.STATUS_CONCEPT }
		};
	},
	mounted: function() {
	},
	methods: {
		notifySuccess: function(msg) {
			$.notify(msg, {className: 'success', globalPosition: 'bottom right'});
		},
		notifyError: function(msg) {
			$.notify(msg, {className: 'error', globalPosition: 'bottom right'});
		},
		deleteTag: function(idx) {
			this.prj.tags.splice(idx,1);
		},
		addedTag: function(tag) {
			this.prj.tags.push(tag);
		},
		
		goBack: function() {
			app.backToBrowser();
		},
		showProject: function(prj) {
			this.prj = prj;
		},
		toggleFavorite: function() {
			
		}
	},
	computed: {
		titleBarDisplayText: function() {
			return this.prj.name;
		},
		askArchiveThisProject: function() {
			
		}
	}
});