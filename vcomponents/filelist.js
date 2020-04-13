Vue.component('file-list', {
	template:`
<div class="fl-container">
	<ul class="list-group fl-list"
		@drop.prevent="onFileDrop"
		@dragover.prevent="onFileDragEnter">
		<li class="list-group-item fl-list-item nosel" v-for="(f, idx) in files">
			<div class="fl-selector"  v-on:click="onToggleSelect(idx)">
			<input type="checkbox" v-model="f.selected">
			<span class="checkmark"></span>
			</div>
			<div :class="['fl-item-content', f.selected?'highlight':'']">
			<span class="fname">{{f.name}}</span>
			<span class="fsize">{{renderFileSize(f.size)}}</span>
			</div>
		</li>
		<li class="list-group-item">
			<button class="btn btn-primary" v-on:click="showFilePicker">
				<i class="fa fa-plus"></i> Add files...
			</button>
			<input class="fl-file-picker" type="file" style="display:none" v-on:change="onFilePicked" multiple/>
		</li>
	</ul>
	
	<div class="dbg">
		Selected: <span v-for="(f, idx) in files"> {{idx}}:{{f.selected}}</span>
	</div>
</div>
	`,
	data: function() {
		return {
			files: null
		};
	},
	methods: {
		renderFileSize : function(bytes) {
			return getFileSizeDesc(bytes);
		},
		onClick : function(event) {
			event.preventDefault();
			this.showApp();
		},
		onToggleSelect : function(idx) {
			this.files[idx].selected = !this.files[idx].selected;
			this.$forceUpdate();
		},
		onFilePicked : function(evt) {
			console.log('onFilePicked ');
			var filePicker = $('.fl-file-picker');
			this.files = filePicker[0].files;
			for(let i = 0; i < this.files.length; i++) {
				var f = this.files[i];
				f['sizeDesc'] = f.size + ' bytes';
				f['selected'] = false;
			}
			console.log(this.files);
		},
		showFilePicker : function() {
			var filePicker = $('.fl-file-picker');
			filePicker.click();
		},
		onFileDragEnter : function(evt) {
			let dt = evt.dataTransfer;
			let files = dt.items;
			if (files === null || files === undefined || files.length === 0)
			{
				evt.preventDefault();
				evt.stopPropagation();
				return;
			}
		},
		onFileDrop : function(evt) {
		  evt.preventDefault();
		  evt.stopPropagation();
		  let dt = evt.dataTransfer;
		  let files = dt.files;
		  if (files === null || files === undefined || files.length === 0)
			this.file = null;
		  else {
			for(let i = 0; i < files.length; i++)
				this.files.push(files[i]);
		  }
		  
		}
	}
});