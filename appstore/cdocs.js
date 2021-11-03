/**
	API for Collection Document from server: 10.71.100.92 / http://113.161.144.222:11003
**/
function CDocs_DocumentAPI(collectionAPI, docid) {
	return {
		collectionAPI: collectionAPI,
		docid: docid,
		get: function() {
			let url = combineURL(this.collectionAPI.connection.host, 
				combineURL(
					combineURL('collection', this.collectionAPI.collectionID),
					combineURL('doc', this.docid)
				)
			);
			return axios.get(url, headers = this.createRequestHeaders());
		},
		save: function(updatedContent) {
			let url = combineURL(this.collectionAPI.connection.host, 
				combineURL(
					combineURL('collection', this.collectionAPI.collectionID),
					combineURL('doc', this.docid)
				)
			);
			return axios.post(url, headers = this.createRequestHeaders(), updatedContent);
		},
		delete: function() {
			//not implemented
		}
	};
}

function CDocs_CollectionAPI(connection, collectionID) {
	return {
		connection: connection,
		collectionID: collectionID,
		getInfo: function() {
			let url = combineURL(this.connection.host, combineURL('collection', collectionID));
			return axios.get(url, headers = this.createRequestHeaders());
		},
		getDocuments: function() {
			let url = combineURL(this.connection.host, 
				combineURL(
					combineURL('collection', collectionID),
					'docs'
				)	
			);
			return axios.get(url, headers = this.createRequestHeaders());
		},
		createRequestHeaders: function() {
			return {
				Authorization: `Bearer ${this.connection.token}`
			};
		},
		add: function(document) {
			let url = combineURL(this.connection.host, 
				combineURL(
					combineURL('collection', collectionID),
					'doc'
				)	
			);
			return axios.put(url, headers = this.createRequestHeaders(), document);
		},
		doc: function(docid) {
			return CDocs_DocumentAPI(this, docid);
		},
		update: function() {
			let url = combineURL(this.connection.host, 
					combineURL('collection', collectionID)
			);
			return axios.post(url, headers = this.createRequestHeaders());
		}
	};
}

CDocs = {
	host: null,
	token: null,
	tokenExpiration: null,
	login: function(user, pass) {
		let ins = this;
		return new Promise((resolve, reject) => {
			let url = combineURL(this.host, 'Authentication/login');
			axios.post(url, { userID: user, password: pass})
			.then(resp => {
				ins.token = resp.data.token;
				ins.tokenExpiration = resp.data.expiration;
				resolve('ok');
			})
			.catch(err => {
				reject(err);
			});
		});
	}, 	
	
	connect: function(host) {
		this.host = host;
		return this;
	},
	
	onCollection: function(collectionID) {
		return CDocs_CollectionAPI(this, collectionID);
	}
};