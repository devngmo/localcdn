 Vue.component('tagfilter', {
	template:`
<div class="tagfilter" :name="name">
	<div class="view-filtered-tags">
		<div>
			<div class="input-group mb-3">
			  <div class="input-group-prepend">
				<span class="input-group-text">Tag filter</span>
			  </div>
			  <input v-model="tag" type="text" class="form-control" aria-label="Add new tag" :tf-name="name">
			  <div class="input-group-append">
				<span class="input-group-text" v-on:click="addTag">Add</span>
			  </div>
			</div>
		</div>
		
		<div class="view-tag-item nosel" v-for="(tag, idx) in tags" v-on:click="removeTag(idx)">
			#{{tag}}
		</div>
	</div>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
			tags: [],
			viewMode: 'add',
			tag: ''
		};
	},
	mounted: function() {
		$(`input[tf-name="${this.$props.name}"]`).focusout(() => { 
			console.log(`[tf-${this.$props.name}] lost focus`);
		});
	},
	methods: {
		addTag: function() {
			this.tags.push(this.tag);
		},
		removeTag: function(idx){
			this.tags.splice(idx, 1);
		}
	}
});