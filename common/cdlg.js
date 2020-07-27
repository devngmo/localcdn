function objectEditorHideButtonSave() {
    var dlg = $('#dlg-obj-editor');
    var btnOK = dlg.find('.js-btn-ok');
    btnOK.addClass('fade');
}

function closeObjectEditorDialog() {
    var dlg = $('#dlg-obj-editor');
    dlg.modal('hide');
}

function showObjectEditor(model, onConfirm) {
    var dlg = $('#dlg-obj-editor');
	
	if (dlg.length === 0) {
		let dlgContainer = $('#cdlg-container');
		let objEditorHTML = `
<div class="modal" tabindex="-1" role="dialog" id="dlg-obj-editor">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="dlg-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="padding: 0px">
        <div class="mbody-top"></div>
		<div class="mbody-mid" style="padding: 5px"></div>
		<div class="mbody-bot"></div>
      </div>
      <div class="modal-footer">
		<button type="button" class="btn btn-danger js-btn-delete">Delete</button>
        <button type="button" class="btn btn-primary js-btn-ok pull-right">OK</button>
		<button type="button" class="btn btn-secondary js-btn-cancel pull-right" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>		
		`;
		dlgContainer.append(objEditorHTML);
		dlg = $('#dlg-obj-editor');
	}
	let deletable = false;
	if (model.deletable) deletable = true;
	
    var title = dlg.find('.dlg-title');
    var bodyTop = dlg.find('.mbody-top');
    var bodyMid = dlg.find('.mbody-mid');
    title.text(model.title);
    bodyTop.empty();
    bodyMid.empty();

    if ('msgTop' in model) {
        bodyTop.append(model.msgTop);
    }

    var html = '';
    var i;
    var f;
    for (i in model.fields) {
        f = model.fields[i];
        if ('type' in f) {
            //TODO: implement checkbox
			if (f.type === 'select') {
                html += `<div class="input-group field-${f.id}">`;
                html += `	<div class="input-group-prepend"><label class="input-group-text">${f.caption}</label></div>`;
                html += `	<select class="custom-select" id="${f.id}">`;
                for (var i=0; i<f.items.length; i++) {
                    var item = f.items[i];
                    var itemid = item[f.key_id];
                    var itemtext = item[f.key_text];
                    html += `<option :value="${itemid}">${itemtext}</option>`;
                }
				html += '	</select>';
                html += '</div>';
                continue;
            }
            else if (f.type === 'picklist') {
                html += `<div class="input-group field-${f.id}">`;
                html += `<div><label>${f.caption}</label></div>`;
                html += '<div class="modal-picklist big">' +
                    '<ul class="list-group">';
                for (var k in f.src) {
                    var item = f.src[k];
                    var itemid = item[f.key_id];
                    var itemtext = item[f.key_text];
                    html += `<li class="list-group-item" itemid="${itemid}">`;
                    if (itemid in f.selectedids) {
                        html += `  <input type="checkbox" checked/>`;
                    } else {
                        html += `  <input type="checkbox"/>`;
                    }
                    html += `${itemtext}</li >`;
                }
                html += '</div>';
                continue;
            } else if (f.type === 'textbox') {
                html +=
                    `<div class="input-group field-${f.id} mb-3">` +
                    `    <div class="input-group-prepend">` +
                    `      <span class="input-group-text">${f.caption}</span>` +
                    `    </div>` +
                    `    <input type="text" class="form-control" id="${f.id}" value="${f.value}" placeholder="${f.placeholder}"/>` +
                    `</div>`;
            } else if (f.type === 'textarea') {
                html +=
                    `<div class="field-${f.id} mb-3">
                        <label>${f.caption}</label>
                        <textarea class="form-control" id="${f.id}" value="${f.value}" placeholder="${f.placeholder}"></textarea>
                    </div>`;
            } else if (f.type === 'datetimepicker') {
                var optionCheck = '';
                if ('optionable' in f) {
                    if (f.optionable) {
                        optionCheck = `<input type="checkbox" class="field-option-check">`;
                    }
                }
                
                html +=
                    `<div class="input-group field-${f.id} date mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">${optionCheck} ${f.caption}</span>
                        </div>
                        <input type="text" class="dialogdtpr form-control pull-right nhapngay" id="${f.id}" value="${f.value}" placeholder="${f.placeholder}" />
                    </div>`;
  
            }            
        }
        
    }
    bodyMid.append(html);
    //$('#ui-datepicker-div').css('z-index', 2100);

    for (i in model.fields) {
        f = model.fields[i];
        if ('type' in f) {

            if (f.type === 'datetimepicker') {
                var ctr = $(`#${f.id}`);
                ctr.datepicker({
                    //comment the beforeShow handler if you want to see the ugly overlay
                    beforeShow: function () {
                        setTimeout(function () {
                            $('.ui-datepicker').css('z-index', 99999999999999);
                        }, 0);
                    }
                });



            }

        }
    }

	var btnDelete = dlg.find('.js-btn-delete');
    btnDelete.off('click');
	if (deletable) {
		btnDelete.removeClass('imgone');
	} else {
		btnDelete.addClass('imgone');
	}
	btnDelete.on('click',  () => {
		console.log('[OBJ-EDITOR] do DELETE');
        JSDevice.playTapSound();
		let handled = onConfirm('delete');
		if (handled) {
			dlg.modal('hide');
		}
	});

    var btnOK = dlg.find('.js-btn-ok');
    btnOK.removeClass('fade');
    btnOK.off('click');
    btnOK.on('click', function () {
        console.log('[OBJ-EDITOR] do save');
        JSDevice.playTapSound();
        var fields = {};
        for (var i in model.fields) {
            var f = model.fields[i];
            var eField = dlg.find(`.field-${f.id}`);
            var inp = eField.find(`#${f.id}`);
            var fVal = inp.val();
			if (f.type === 'select') {
				fVal = f.items[inp[0].selectedIndex][f.key_id];
			}
            fields[f.id] = { val : fVal };
            
            if ('nullable' in f) {
                if (f.nullable === false) {
                    if (fVal === undefined || fVal === null || fVal.trim() === '') {
                        console.log(`Field ${f.id} must not be null`);                        
                        return;
                    }
                }
            }
            
            var optionCheckInp = eField.find(`.field-option-check`);
            if (optionCheckInp.length > 0) {
                fields[f.id]['optionable'] = optionCheckInp[0].value === 'on';
            }
            
        }
        let handled = onConfirm(fields);
		if (handled) {
			dlg.modal('hide');
		}
    });
    if ('btnConfirmCaption' in model) {
        btnOK.text(model.btnConfirmCaption);
    } 

    dlg.modal({
        backdrop: 'static',
        keyboard: false
    });
}

function showMsgboxDialog(title, msg) {
    let dlg = $('#cdlg-msgbox');
	if (dlg.length === 0) {
		let dlgContainer = $('#cdlg-container');
		let msgboxHTML = `
<div class="modal" tabindex="-1" role="dialog" id="cdlg-msgbox">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="padding: 0px">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>		
		`;
		dlgContainer.append(msgboxHTML);
		dlg = $('#cdlg-msgbox');
	}
	console.log('show msg');
    dlg.find('.modal-title').text(title);
    dlg.find('.modal-body').empty().append(msg);
    dlg.modal('show');
}