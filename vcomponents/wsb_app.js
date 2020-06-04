const app = new Vue({
	el: '#app',
	data: {
		hometabs : [
			{ id: 'tasknow', title: 'Task Now' },
			
			{ id: 'docs', title: 'Docs', desc: 'Tasks, Guidelines, Documents...' },
			
			{ id: 'projects', title: 'Projects' }
		],
		workspaceTabs: [
			{ id: 'Personal', title: 'Personal', desc: 'Personal stuffs...' },
			{ id: 'Company', title: 'Company', desc: 'Company stuffs...' }
		],
		
		
		clipboard_selected_idx: -1,
		clipboard_items: [],
		clipboard_text: '',
		
		guideline_view_mode: 'viewer',
		bookmark_view_mode:  'viewer',
		task_view_mode:  'viewer',
		project_view_mode: 'project',
		
		activeViewId: 'browser',
		
		bookmarkResult: [],
		taskResult: [],
		guidelineResult: [],
		projectResults: [],
		
		tabHistories: {
			tasks: [],
			guidelines: [],
			bookmarks: [],
			projects: []
		},
		tabFavorites: {
			tasks: [],
			guidelines: [],
			bookmarks: [],
			projects: []
		},
		historyItems: [],
		favoriteItems: [],

		guidelineViewList : 'results',
		dbg: '',
		query: '',

		bookmark : { title:'', url: '' },
		task : { title:'', content: '' },
		guideline : { title:'', steps: [] },
		project: { title:'',tasks: [], docs: [], issues: [], tasks: [], guidelines:[], dataloaded: false  }
	},
	mounted : function() {

	},
	created: function() {
		console.log('[Guidelines] created');
	},
	watch: {
		query: function(newVal) {
			//this.updateInstanceSearch();
		}
	},
	computed: {
		showGuidelineSearchResult: function() {
			return this.guidelineViewList === VIEW_LIST_RESULT;
		}
	},
	methods: {
		onProjectUpdated: function(prj){ 
			this.prj = prj;
			this.$refs.tabs.$refs.project_list.applyFilterOnResult();
		},
		onTaskUpdated: function(task) {
			this.task = task;
			this.$refs.tabs.$refs.tasknow.$refs.tasklist.applyFilterOnResult();
		},
		getProjectById: function(prjID) {
			return null;
		},
		showTask: function(task) {
			this.task = task;
			console.log(this.task);
			this.activeViewId = WSBDefs.VIEWID_TASK_ITEM;				
			this.$refs.task_item_view.showTask(this.task);
		},
		toggleTaskFavorite: function() {
			this.task.favorite = !this.task.favorite;
			this.$forceUpdate();
			let idx = this.tabFavorites['tasks'][this.task];
			if (idx >= 0)
				this.tabFavorites['tasks'].splice(idx, 1);
				
			if (this.task.favorite) {
				this.tabFavorites['tasks'].push(this.task);
			}
		},
		
		getItemTitle: function(item) {
			if ('title' in item) {
				return item.title;
			}
			console.warn(item);
			return '';
		},
		openFavoriteItem: function(idx) {
			$(this.$refs.dlg_favorite).modal('hide');
			let tabid = this.activeTabId();
			this.favoriteItems= [];
			if (tabid === 'tasks') {
				this.openTask(this.tabFavorites[tabid][idx]);
			}
		},
		openHistoryItem: function(idx) {
			$(this.$refs.dlg_history).modal('hide');
			let tabid = this.activeTabId();
			this.historyItems = [];
			if (tabid === 'tasks') {
				this.openTask(this.tabHistories[tabid][idx]);
			}
			else if (tabid === 'bookmarks') {
				this.openBookmark(this.tabHistories[tabid][idx]);
			}
			else if (tabid === 'guidelines') {
				this.openGuideline(this.tabHistories[tabid][idx]);
			}
			else if (tabid === 'projects') {
				this.openProject(this.tabHistories[tabid][idx]);
			}
		},
		showFavorites: function() {
			this.favoriteItems = this.tabFavorites[this.activeTabId()];
			$(this.$refs.dlg_favorite).modal('show');
		},
		showHistory	: function() {
			this.historyItems = this.tabHistories[this.activeTabId()];
			$(this.$refs.dlg_history).modal('show');
		},
		clampText: function(text, len) {
			if (text === null  || text === undefined) return '';
			if (text.length <= len) return text;
			return text.substring(0, len);
			
		},
		showClipboard: function(idx) {
			this.clipboard_selected_idx = idx;
			this.clipboard_text = this.clipboard_items[idx];
		},
		deleteClipboard: function(idx) {
			this.clipboard_items.splice(idx, 1);
		},
		addClipboard: function() {
			if (this.clipboard_items.indexOf(this.clipboard_text) === -1)
				this.clipboard_items.push(this.clipboard_text);
		},
		toggleClipboard: function() {
			$(this.$refs.dlg_clipboard).modal('show');
		},
		universalBrowser: function() {
			return $('#universal-browser');
		},
		bookmarkEditor: function() {
			return $('#bookmark-editor');
		},
		taskEditor: function() {
			return $('#task-editor');
		},
		guidelineEditor: function() {
			return $('#guideline-editor');
		},
		activeTab: function() {
			let nav = $('.wsb_tabs');
			return nav.find('.nav-link.active');
		},
		activeTabId: function() {
			return this.activeTab().attr('aria-controls');
		},
		openGuideline: function(guideline) {
			let vm = this;
			vm.guideline = guideline;
			vm.activeViewId = WSBDefs.VIEWID_GUIDELINE;
			vm.guideline_view_mode = WSBDefs.VIEW_MODE_VIEWER;
			
			if (this.tabHistories['guidelines'].indexOf(guideline) === -1) {
				this.tabHistories['guidelines'].splice(0, 0, guideline);
				if (this.tabHistories['guidelines'].length > MAX_HISTORY_ITEMS) {
					this.tabHistories['guidelines'].pop();
				}
			}
		},
		openTask: function(task) {
			console.log('open task');
			console.log(task);
			let vm = this;
			vm.task = task;
			if ('favorite' in task === false) 
				task['favorite'] = false;
				
			vm.activeViewId = WSBDefs.VIEWID_NOTE;
			vm.task_view_mode = WSBDefs.VIEW_MODE_VIEWER;
			
			this.updateTabHistory('tasks', task);
		},
		updateTabHistory: function(tabid, item) {
			console.log(item.title);
			console.log(`update tab [${tabid}] history`);
			let har 	= this.tabHistories[tabid];
			let hidx 	= har.indexOf(item);
			if (hidx >= 0)
				har.splice(hidx, 1);
				
			har.splice(0, 0, item);
			
			if (har.length > MAX_HISTORY_ITEMS) {
				har.pop();
			}
			
			this.tabHistories[tabid] = har;				
		},
		openBookmark: function(b) {
			let vm = this;
			vm.bookmark = b;
			vm.activeViewId = this.VIEWID_BOOKMARK;
			vm.bookmark_view_mode = this.VIEW_MODE_VIEWER;
			
			if (this.tabHistories['bookmarks'].indexOf(b) === -1) {
				this.tabHistories['bookmarks'].splice(0, 0, b);
				if (this.tabHistories['bookmarks'].length > MAX_HISTORY_ITEMS) {
					this.tabHistories['bookmarks'].pop();
				}
			}
		},
		openProject: function(p) {
		
		},
		createNew: function(query) {
			let tabId = this.activeTabId();
			if (tabId === 'tasknow') {
				this.createNewTask(query);
			} else if (tabId === 'tasks') {
				this.createNewTask(query);
			} else if (tabId === 'guidelines') {
				this.createNewGuideline(query);
			} else if (tabId === 'projects') {
				this.createNewProject(query);
			}
			console.log(tabId);
		},

		createNewBookmark: function() {
			this.bookmark = { title : this.query, url : '' };
			this.activeViewId = this.VIEWID_BOOKMARK;
		},
		createNewTask: function(query) {
			this.task =  { id: null, title : query, content : '', tags: [] };
			if (!this.$refs.tabs.$refs.tasknow.isPersonal) this.task.tags.push(WSBDefs.TAG_BUSINESS);
			
			if (this.task.title === null || this.task.title.trim().length === 0)
				this.task.title = 'Your new task';
				
			this.activeViewId = this.VIEWID_TASK;
			this.showTaskEditor();
		},
		createNewProject: function(prjCode) {
			this.project =  { id: null, code : prjCode, name: prjCode, tags: [], status: WSBDefs.STATUS_CONCEPT, desc: 'New project' };
			this.showProjectEditor();
		},
		goBack: function() {
			this.activeViewId = this.VIEWID_BROWSER;
		},

		createNewGuideline: function() {
			let vm = this;
			this.guideline = { title: this.query, steps : [] };
			this.activeViewId = this.VIEWID_GUIDELINE;

			api.create(g)
			.then(resp => {
				vm.openGuideline(resp.data);
			})
			.catch(error => {
				alert(`Error: ${error}`);
			});
		},

		showTasks: function() {
			console.log('show tab tasks');
			this.activeViewId = this.VIEWID_BROWSER;
			let link = this.universalBrowser().find('a[href="#tasks"]');
			link.tab('show');
		},
		
		backToBrowser: function() {
			this.activeViewId = WSBDefs.VIEWID_BROWSER;
		},
		showProjectDetail: function() {
			this.activeViewId = WSBDefs.VIEWID_PROJECT;
			this.$refs.project_detail.showProject(this.project);
		},
		showProjectEditor: function() {
			this.activeViewId = WSBDefs.VIEWID_PROJECT_EDITOR;
			this.$refs.project_editor.prepareNewProject(this.project);
		},

		
		showTaskEditor: function() {
			this.activeViewId = WSBDefs.VIEWID_TASK_ITEM;
			this.$refs.task_item_view.prepareNewTask(this.task);
		},
		showBookmarkEdit: function() {
			this.bookmark_view_mode = this.VIEW_MODE_EDITOR;
		},
		showGuidelineEdit: function() {
			this.guideline_view_mode = this.VIEW_MODE_EDITOR;
		},
		showBookmarks: function() {
			console.log('show tab bookmarks');
			this.activeViewId = this.VIEWID_BROWSER;
			this.universalBrowser().find('a[href="#bookmarks"]').tab('show');
		},
		showProjects: function() {
			console.log('show tab projects');
			this.activeViewId = this.VIEWID_BROWSER;
			this.universalBrowser().find('a[href="#projects"]').tab('show');
		},

		showGuidelines: function() {
			this.activeViewId = this.VIEWID_BROWSER;
			this.universalBrowser().find('a[href="#guidelines"]').tab('show');
		},

		updateInstanceSearch: function() {
			this.guidelineViewList = this.VIEW_LIST_RESULT;
			console.log(`updateInstanceSearch ${this.query}`);
			this.dbg = `updateInstanceSearch ${this.query}`;
		},
		doSearch : function() {
			let query = this.$refs.searchbox.query;
			console.log(`search: ${query}`);
			
			let tabId = this.activeTabId();
			if (tabId === 'tasknow') {
				this.filterTasks(query);
			} else if (tabId === 'projects') {
				this.filterProjects(query);
				this.searchTask();
			} else if (tabId === 'guidelines') {
				this.searchGuideline();
				this.showGuidelines();
			}
		},
		filterProjects: function(query) {
			this.$refs.tabs.$refs.project_list.updateFilterQuery(query);
		},
		
		filterTasks: function(query) {
			this.$refs.tabs.$refs.tasknow.updateFilterQuery(query);
		},
		
		searchAllCategory : function() {
			this.searchBookmark();
			this.searchTask();
			this.searchGuideline();
		},
		searchBookmark: function() {
			this.bookmarkResult = [];
			let vm = this;
			api.searchBookmark(this.query)
			.then(resp => {
				vm.bookmarkResult = resp.data;
			})
			.catch(error => {
				console.log(error);
			});
		},
		searchGuideline: function() {
			console.log('search guideline');
			this.guidelineResult = [];
			let vm = this;
			api.searchGuideline(this.query)
			.then(resp => {
				vm.guidelineResult = resp.data;
			})
			.catch(error => {
				console.log(error);
			});
		},
		searchTask: function() {
			console.log('search task');
			this.taskResult = [];
			let vm = this;
			api.searchTask(this.query)
			.then(resp => {
				console.log(resp.data);
				vm.taskResult = resp.data;
			})
			.catch(error => {
				console.log(error);
			});
		},
		saveTask: function() {
			let vm = this;
			let cnt = replaceAll(this.task.content, '\n', '<br/>\n');
			cnt = replaceAll(cnt, '<br/><br/>\n', '<br/>\n');
			this.task.content = cnt;
			api.saveTask(this.task).then(resp => {
				vm.task = resp.data;
				this.task_view_mode = this.VIEW_MODE_VIEWER;
			})
			.catch(error => {
				alert(`can not save task: ${error}`);
			});
		}
	}
});