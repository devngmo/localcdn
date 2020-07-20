const api  = {
    baseURL: 
        'http://127.0.0.1:12345'
    ,
	filterTasks: function(filter) {
		console.log(`[API-filterTasks]`);
		console.log(JSON.stringify(filter, indent=2));
		
		return axios.post(`${this.baseURL}/wsb/tasks/filter`, filter, {crossDomain:true});
	},
	loadTaskById: function(id) {
		return axios.get(`${this.baseURL}/doc/task/${id}`, {crossDomain:true});
	},
	loadGuidelineById: function(id) {
		return axios.get(``, {crossDomain:true});
	},
	saveTask: function(task) {
		return axios.post(`${this.baseURL}/doc/save/tasks`, task, {crossDomain:true});
	},
	saveProject: function(project) {
		return axios.post(`${this.baseURL}/doc/save/projects`, project, {crossDomain:true});
	},
	saveDocument: function(doc) {
		return axios.post(`${this.baseURL}/doc/save/docs`, doc, {crossDomain:true});
	},
	filterProjects: function(filter) {
		console.log(`[API-filterProjects]`);
		console.log(JSON.stringify(filter, indent=2));
		
		return axios.post(`${this.baseURL}/wsb/projects/filter`, filter, {crossDomain:true});
	},
	filterDocuments: function(filter) {
		console.log(`[API-filterDocuments]`);
		console.log(JSON.stringify(filter, indent=2));
		
		return axios.post(`${this.baseURL}/wsb/docs/filter`, filter, {crossDomain:true});
	},
	
	saveGuideline: function(g) {
		return axios.post(`${this.baseURL}/doc/save/guidelines`, g, {crossDomain:true});
	},
	saveBookmark: function(b) {
		return axios.post(`${this.baseURL}/doc/save/bookmarks`, b, {crossDomain:true});
	},
	searchBookmark: function(query) {
		let es_query = {
			query: query,
			fields: ['title']
		};
		return axios.post(`${this.baseURL}/doc/fts/bookmarks`, es_query, {crossDomain:true});
	},
	searchTask: function(query) {
		let es_query = {
			query: query,
			fields: ['title']
		};
		return axios.post(`${this.baseURL}/doc/fts/tasks`, es_query, {crossDomain:true});
	},
	searchGuideline: function(query) {
		let es_query = {
			query: query,
			fields: ['title']
		};
		return axios.post(`${this.baseURL}/doc/fts/guidelines`, es_query, {crossDomain:true});
	}
};