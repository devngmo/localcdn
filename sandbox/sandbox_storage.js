function SandboxCollectionDocument(collection, docid) {
	return {
		collection: collection,
		docid: docid,
		get: function() {
			return axios.get(`http://localhost:5100/collection/${this.collection}/${this.docid}`);
		},
		save: function(updatedContent) {
			return axios.post(`http://localhost:5100/collection/${this.collection}/${this.docid}`, updatedContent);
		},
		delete: function() {
			return axios.delete(`http://localhost:5100/collection/${this.collection}/${this.docid}`);
		}
	};
}

function SandboxCollection(name) {
	return {
		name: name,
		get: function() {
			return axios.get(`http://localhost:5100/collection/${name}`);
		},
		add: function(document) {
			return axios.put(`http://localhost:5100/collection/${name}`, document);
		},
		doc: function(docid) {
			return SandboxCollectionDocument(this.name, docid);
		}
	};
}

SandboxStorage = {
	onCollection: function(collectionName) {
		return SandboxCollection(collectionName);
	}
};