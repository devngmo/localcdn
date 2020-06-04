Vue.component('ffu_filecmd', {
	template:`
<div class="ffu_filecmd panel">
	<label>File CMD</label>
	<div class="form-group">
		<label for="exampleFormControlTextarea1">Source Path</label>
		<textarea class="form-control" v-model="fp_src" id="fp-source" rows="3"></textarea>
	</div>
	
	<div class="form-group">
		<label for="exampleFormControlTextarea1">Dest Path</label>
		<textarea class="form-control" v-model="fp_dst" id="fp-dst" rows="3"></textarea>
	</div>
	
	<div>
		<button class="btn btn-info" v-on:click="doCopy">Copy</button>
		<button class="btn btn-primary" v-on:click="doMove">Move</button>
		<button class="btn btn-danger" v-on:click="doDelete">Delete</button>
	</div>
</div>
	`,
	props: ['name'],
	data: function() {
		return {
			fp_src: '',
			fp_dst: ''
		};
	},
	mounted: function() {
	},
	methods: {
		doCopy: function() {
			IOUtils.doCopy(this.fp_src, this.fp_dst)
			.then(resp => {
				console.log('Copy result');
				console.log(JSON.stringify(resp, indent=4));
			});
		},
		doMove: function() {
			IOUtils.doMove(this.fp_src, this.fp_dst)
			.then(resp => {
				console.log('Move result');
				console.log(JSON.stringify(resp, indent=4));
			});
		},
		doDelete: function() {
			IOUtils.doDelete(this.fp_src)
			.then(resp => {
				console.log('Delete result');
				console.log(JSON.stringify(resp, indent=4));
			});
		}
		
	}
});