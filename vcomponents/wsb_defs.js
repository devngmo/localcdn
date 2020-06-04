const  WSBDefs = {
	VIEW_LIST_RESULT : 'results',
	VIEW_LIST_STEPS : 'steps',

	VIEWID_BROWSER : 'browser',
	VIEWID_TASK_ITEM : 'task-item',
	VIEWID_BOOKMARK : 'bookmark',
	VIEWID_GUIDELINE : 'guideline',
	VIEWID_PROJECT: 'project',
	VIEWID_PROJECT_EDITOR: 'project.editor',
	
	DOCTYPE_NOTES : 'note',
	DOCTYPE_GUIDELINE : 'guideline',
	DOCTYPE_URL : 'url',
	
	VIEW_MODE_VIEWER : 'viewer',
	VIEW_MODE_EDITOR : 'editor',
	
	TAG_BUSINESS : 'business',
	TAG_ARCHIVED : 'archived',
	TAG_CLOSED : 'closed',
	
	STATUS_CANCELED : '-1',	
	STATUS_CONCEPT : '0',
	STATUS_ON_PROGRESS : '1',
	STATUS_PENDING : '2',	
	STATUS_FINISHED : '3',
	STATUS_LATED : '4',
	
	TASK_STATUS_CANCELED : '-1',
	TASK_STATUS_REQUEST : '0',
	TASK_STATUS_ON_PROGRESS : '1',
	TASK_STATUS_PENDING : '2',	
	TASK_STATUS_FINISHED : '3',
	TASK_STATUS_LATED : '4',
	
	TASK_TYPE_ISSUE : 'issue',
	
	
	PRIORITY_LOW: 'low',
	PRIORITY_NORMAL: 'normal',
	PRIORITY_MEDIUM: 'medium',
	PRIORITY_HIGH: 'high',
	PRIORITY_URGENT: 'urgent'
};

WSBDefs.install = function(Vue){
	Vue.prototype.$K = (key) => {
		return WSBDefs[key];
	};
};

Vue.use(WSBDefs);
