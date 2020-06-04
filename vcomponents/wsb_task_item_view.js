Vue.component('wsb_task_item_view', {
	template:`
<div id="task-item-view">
	<div class="view-title">
		<button class="btn btn-info" v-on:click="goBack"><i class="fa fa-arrow-left"></i> Back</button>
		<div>
			<b>{{titleBarDisplayText}}</b>
		</div>
		<button v-if="task.favorite" class="btn btn-danger" v-on:click="toggleFavorite">
			<i class="fa-heart fa"></i>
		</button>
		<button v-if="task.favorite==false" class="btn btn-secondary" v-on:click="toggleFavorite">
			<i class="fa-heart far"></i>
		</button>
		<button class="btn btn-success" v-on:click="save"><i class="fa fa-save"></i></button>
	</div>
	
	<div class="page-task-content">
		<div class="input-group"  style="padding: 2px">
		  <div class="input-group-prepend">
			<span class="input-group-text">Title</span>
		  </div>
		  <input 
			v-model="task.title" type="text" class="tag-input form-control" 
			placeholder="task title" aria-label="Title">
		</div>
		<div style="padding: 2px">
			<input class="col-md-6 toggle-personal" type="checkbox" checked data-toggle="toggle" data-width="100px"
				data-on="<i class='fa fa-user-lock'></i> Me" 
				data-off="<i class='fa fa-user-tie'></i> Com"
				data-offstyle="warning"
				data-onstyle="primary"
			>
			
			<div class="form-group compact">
				<select v-model="task.status" class="colored-selector bsf-control compact" id="selStatus">
				  <option class="cs-ignore"  value="-1">Canceled</option>
				  <option class="cs-active"  value="0" >Request</option>
				  <option class="cs-active"  value="1" >On Progress</option>
				  <option class="cs-pending" value="2" >Pending</option>
				  <option class="cs-success" value="3" >Finished</option>
				  <option class="cs-danger"  value="4" >Lated</option>
				</select>
			  </div>
			  
			  <div class="form-group compact">
				<select v-model="task.priority" class="colored-selector bsf-control compact" id="selPriority">
				  <option class="cs-pr-low"  	value="low">Low</option>
				  <option class="cs-pr-normal"  value="normal" >Normal</option>
				  <option class="cs-pr-medium"  value="medium" >Medium</option>
				  <option class="cs-pr-high" 	value="high" >High</option>
				  <option class="cs-pr-urgent" 	value="urgent" >Urgent</option>
				</select>
			  </div>
		</div>
		
		<div class="input-group mb-3" style="padding: 4px">
		  <div class="input-group-prepend">
			<span class="input-group-text">#Hashtag</span>
		  </div>
		  <input 
			v-model="task.hashtag" type="text" class="tag-input form-control" 
			placeholder="hashtag" aria-label="hashtag" maxlength="10">
		</div>
		
		<wsb_tagbox ref="tagbox" :tags="task.tags" :locked_tags="locked_tags" allow_add="true" v-on:delete="deleteTag" v-on:added="addedTag"></wsb_tagbox>
		<div style="margin:4px">
			<b>Detail</b>
			<textarea v-model="task.content" rows="10" style="padding:5px; width: 100%; flex: 1"></textarea>
		</div>
		
	</div>
</div>`,
	props: ['task_id'],
	data: function() {
		return {
			isPersonal: true,
			isActive: false,
			
			//status: WSBDefs.TASK_STATUS_ON_PROGRESS,
			viewMode: WSBDefs.VIEW_MODE_VIEWER,
			task: {id: null, title: '', content: '', favorite: false, tags: []},
			locked_tags: []
		};
	},
	create: function() {
		
	},
	mounted: function() {
		ColoredSelect('#selStatus').init();
		ColoredSelect('#selPriority').init();
		let vm = this;
		let toggle = $('#task-item-view input.toggle-personal');
		toggle.change(evt => {
			vm.isPersonal = $(evt.target).prop('checked');
			console.log('is personal: ' + vm.isPersonal);
		});
		// $('#task-item-view .toggle-active').change(evt => {
			// this.isActive = !$(evt.target).prop('checked');
		// });
	},
	methods: {
		notifySuccess: function(msg) {
			$.notify(msg, {className: 'success', globalPosition: 'bottom right'});
		},
		notifyError: function(msg) {
			$.notify(msg, {className: 'error', globalPosition: 'bottom right'});
		},
		deleteTag: function(idx) {
			this.task.tags.splice(idx,1);
		},
		addedTag: function(tag) {
			this.task.tags.push(tag);
		},
		goBack: function() {
			app.activeViewId = WSBDefs.VIEWID_BROWSER;
		},
		setToggle: function(id, isOn) {
			if (isOn)
				$(id).bootstrapToggle('on');
			else 
				$(id).bootstrapToggle('off');
		},
		setIsPersonal: function(isPersonal) {
			console.log('set is PERSONAL ' + isPersonal);
			this.setToggle('.toggle-personal', isPersonal);
			this.isPersonal = isPersonal;
		},
		save: function() {
			console.log('save task');
			
			let vm = this;
			let saveTask = JSON.parse(JSON.stringify(this.task));
			//this.task.status = this.status;
			//saveTask.status = this.status;
			
			let isAddNew = this.task.id === null;
			if (!vm.isPersonal) saveTask.tags.push(WSBDefs.TAG_BUSINESS);
			if (!vm.isActive) 	saveTask.tags.push(WSBDefs.TAG_ARCHIVED);
			
			//console.log(saveTask);
			
			api.saveTask(saveTask)
			.then(resp => {
				console.log(resp.data);
				vm.task.id = resp.data.id;
				
				if (isAddNew) {
					app.onTaskUpdated(saveTask);
					vm.notifySuccess("Added task: " + this.task.title);
				} else {
					vm.notifySuccess("Updated task: " + this.task.title);
					copyProps(saveTask, app.task);
				}
			})
			.catch(err => {
				vm.notifyError('Can not save task!');
			});
		},
		toggleFavorite: function() {
			
		},
		prepareNewTask: function(task) {
			console.log('[TASK ITEM] prepare new task: ' + task.title);
			this.task = JSON.parse(  JSON.stringify( task ) ); // copy it
			
			this.setIsPersonal( this.task.tags.indexOf(WSBDefs.TAG_BUSINESS) < 0);
			this.task.tags = [];
			
		},
		showTask: function(task) {
			console.log('Show task');
			console.log(task);
			let vm = this;
			this.task = JSON.parse(  JSON.stringify( task ) ); // copy it
			//this.status = this.task.status;
			let idx = this.task.tags.indexOf(WSBDefs.TAG_BUSINESS);
			this.setIsPersonal(idx < 0);
			if (idx >= 0) {
				this.task.tags.splice(idx,1);
			}
			this.isActive = true;
			idx = this.task.tags.indexOf(WSBDefs.TAG_ARCHIVED);
			if (idx >= 0) {
				this.isActive = false;
				this.task.tags.splice(idx,1);
			}
			this.$nextTick(() => {
				  ColoredSelect('#selStatus').applySelectionColor();
				  ColoredSelect('#selPriority').applySelectionColor();
			});
		}
	},
	computed: {
		titleBarDisplayText: function() {
			let title = '';
			if (!this.isActive)
				title = '[ARCHIVED] ';
			if(this.isPersonal)
				return 'Personal Task';
			return 'Business Task';
		}
	}
});