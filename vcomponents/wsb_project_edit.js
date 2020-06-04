Vue.component('wsb_project_edit', {
	template:`
<div class="wsb_project_edit">
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
		<button class="btn btn-success" v-on:click="save"><i class="fa fa-save"></i></button>
	</div>


	<div class="page-project-detail">
		<div class="input-group"  style="padding: 2px">
		  <div class="input-group-prepend">
			<span class="input-group-text">Project Code</span>
		  </div>
		  <input 
			ref="inp_prj_code"
			v-model="prj.code" type="text" class="tag-input form-control" maxlength="20"
			placeholder="project code" aria-label="Project code">
		</div>
		<div class="input-group"  style="padding: 2px">
		  <div class="input-group-prepend">
			<span class="input-group-text">Name</span>
		  </div>
		  <input 
			v-model="prj.name" type="text" class="tag-input form-control" 
			placeholder="project name" aria-label="Project name">
		</div>
		<div style="padding: 2px">
			<input class="col-md-6 toggle-personal" type="checkbox" checked data-toggle="toggle" data-width="200px"
				data-on="<i class='fa fa-user-lock'></i> Personal" 
				data-off="<i class='fa fa-user-tie'></i> Company"
				data-offstyle="warning"
				data-onstyle="primary"
			>
			
			<div class="form-group compact">
				<select v-model="prj.status" class="colored-selector form-control compact" id="selStatus">
				  <option class="cs-ignore"  value="-1">Canceled</option>
				  <option class="cs-suggest"  value="0" >Idea & Concept</option>
				  <option class="cs-active"  value="1" >On Progress</option>
				  <option class="cs-pending" value="2" >Pending</option>
				  <option class="cs-success" value="3" >Finished</option>
				  <option class="cs-danger"  value="4" >Lated</option>
				</select>
			  </div>
		</div>
		
		<wsb_tagbox ref="tagbox" :tags="prj.tags" :locked_tags="locked_tags" allow_add="true" v-on:delete="deleteTag" v-on:added="addedTag"></wsb_tagbox>
		<div style="margin:4px">
			<b>Detail</b>
			<textarea v-model="prj.desc" rows="10" style="padding:5px; width: 100%; flex: 1"></textarea>
		</div>
		
	</div>
</div>
	`,
	props: [],
	data: function() {
		return {
			locked_tags: [],
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
			if (this.prj.id === null) {
				app.backToBrowser();
			} else {
				app.showProjectDetail();
			}
		},
		prepareNewProject: function(prj) {
			this.prj = prj;
		},
		save: function() {
			console.log('save project');
			
			let vm = this;
			let savePrj = JSON.parse(JSON.stringify(this.prj));
			
			let isAddNew = this.prj.id === null;
			if (!vm.isPersonal) savePrj.tags.push(WSBDefs.TAG_BUSINESS);
			if (!vm.isActive) 	savePrj.tags.push(WSBDefs.TAG_ARCHIVED);
			
			api.saveProject(savePrj)
			.then(resp => {
				console.log(resp.data);
				vm.prj.id = resp.data.id;
				
				if (isAddNew) {
					app.onProjectUpdated(savePrj);
					vm.notifySuccess("Added prj: " + this.prj.name);
				} else {
					vm.notifySuccess("Updated prj: " + this.prj.name);
					copyProps(savePrj, app.prj);
				}
			})
			.catch(err => {
				if (err.response.status === 409) {
					vm.notifyError(`Project with CODE [${savePrj.code}] already exists!!!`);
					$(vm.$refs.inp_prj_code).focus();
					
				} else {
					vm.notifyError(`Can not save project! Error: ${err}`);
				}
			});
		},
		toggleFavorite: function() {
			
		}
	
	},
	computed: {
		titleBarDisplayText: function() {
			return this.prj.name;
		}
	}
});