// Vue Form Generator
function createVueDialogForm(dlgId, object, customCSS = {}) {
	let title = object.title;
	let vfg_html = '';
	let vdata_declare = '';
	for(let i = 0; i < object.fields.length; i++) {
		if (vdata_declare.length > 0)
			vdata_declare += ',\n';
		let f = object.fields[i];
		let bottomHint = (f.bottomHint === undefined)?'': f.bottomHint;
		let disabled = '';
		if (!f.editable) disabled = 'disabled';
		if (f.ctrltype === 'textfield') {
			vdata_declare = vdata_declare + `f_${f.id} : '${f.value}'`;
			vfg_html += `
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text f-caption" id="f-${f.id}">${f.title}</span>
  </div>
  <input v-model="f_${f.id}" type="text" class="form-control" placeholder="${f.title}" aria-label="${f.title}" aria-describedby="f-${f.id}" ${disabled}>
</div>
${bottomHint}`;
		} else if (f.ctrltype === 'textarea') {
			vdata_declare = vdata_declare + `f_${f.id} : '${f.value}'`;
			vfg_html += `
<label class="f-caption">${f.title}</label>
<textarea v-model="f_${f.id}" class="form-control"></textarea>
${bottomHint}`;
		} else if (f.ctrltype === 'multiple.options') {
			let slotTemplate = '';
			if (typeof f.options[0] === 'object') {
				let selectedObjects = [];
				f.value.map(v => {
					f.options.map(o => {
						if (o.id === v) {
							selectedObjects.push(o);
						}
					});
				});
				
				vdata_declare = vdata_declare + `f_${f.id} : ${JSON.stringify(selectedObjects)},`;
				
				slotTemplate = `
	<template slot="singleLabel" slot-scope="{ option }">
		<b>{{ option.name }}</b>
	</template>
				`;
			} else {
				vdata_declare = vdata_declare + `f_${f.id} :
				${JSON.stringify(f.value)},`;
			}
			vdata_declare = vdata_declare + `f_${f.id}_options : ${JSON.stringify(f.options)}`;
			vfg_html += `
<label class="f-caption">${f.title}</label>
<multiselect v-model="f_${f.id}" :options="f_${f.id}_options" 
	:multiple="true"
	 label="id" track-by="id" :preselect-first="true"
	>
	
</multiselect>
${bottomHint}`;

	
		}
	}
	
	let = src = `
<div class="modal vfg" tabindex="-1" role="dialog" id="${dlgId}">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${vfg_html}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">OK</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`;



let script = `
<script>
	console.log('exec script in generated form');
	
	${dlgId} = new Vue({
		components: {
			Multiselect: window.VueMultiselect.default
		},
		el: '#${dlgId}',
		data: {
			${vdata_declare}
		},
		watch: {
			f_tags: function(newVal, oldVal) {
				console.log(newVal);
			}
		}
	});
	//vfg_dlg.$forceUpdate();
</script>
`;
	
	return src + script;
}