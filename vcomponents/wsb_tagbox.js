Vue.component('wsb_tagbox', {
	template:`
<div class="wsb_tagbox">
	<div class="input-group mb-3"  style="margin: 4px">
	  <div class="input-group-prepend">
		<span class="input-group-text">Tag</span>
	  </div>
	  <input 
		v-model="tag" type="text" class="tag-input form-control" 
		placeholder="Enter new tag here" aria-label="Tag" v-on:keypress="onKeyPress">
		
		<div class="input-group-append">
			<button class="btn" v-on:click="add"><i class="fa fa-plus"></i></button>
		</div>
	</div>

	
	
	<div class="wsb-task tag-item" v-for="(t,idx) in tags" v-on:click="deleteTag(idx)">
		{{t}}
	</div>
</div>`,
	props: ['tags', 'allow_add', 'locked_tags'],
	
	data: function() {
		return {
			tag: ''
		};
	},
	mounted: function() {
		//console.log('[TAGBOX] mounted');
		//console.log(this.$props.tags);
	},
	created: function() {
		//console.log('[TAGBOX] created');
		//console.log(this.$props.tags);
	},
	
	methods: {
		onKeyPress: function(e) {
			if (e.keyCode === 13)
			{
				this.$emit('added', this.tag);
				this.tag = '';
			}
		},
		save: function() {
			//console.log('[TAGBOX] save...');
			let vm = this;
		},
		
		deleteTag: function(index) {
			let deletable = true;
			if (this.$props.locked_tags.indexOf(this.$props.tags[index]) >= 0) deletable = false;
			
			this.tag = this.$props.tags[index];
			
			if (deletable)
				this.$emit('delete', index);
		},
		
		add: function() {
			if (this.tag.trim().length === 0) return;
			
			this.$emit('added', this.tag);
		}
	}
});