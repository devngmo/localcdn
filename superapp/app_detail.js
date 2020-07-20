const app = new Vue({
	el: '#app',
	data: {
		appInfo: null
	},
	mounted : function() {

	},
	created: function() {
		console.log(`[AppDetail] created for ${JSI.getApplicationID()}`);
		this.loadAppInfo();
	},
	watch: {

	},
	methods: {
	    loadAppInfo: function() {
	        this.appInfo = JSON.parse( JSI.getApplicationInfo() );
            console.log(JSI.getApplicationInfo());
	    },
        onClick:function() {
            if (this.appInfo.status === 'ready') JSI.openAppPlayer();
            else if (this.appInfo.status === 'new') {
                JSI.requestInstallApp();
                this.loadAppInfo();
            }
            else if (this.appInfo.status === 'toUpdate') JSI.requestUpdateApp();
        }
	}
});