let JSI = null;

if (typeof _JSI === 'undefined') {
    JSI = {
        getApplicationInfo: function() {
            return JSON.stringify({ id: 'MockupApp', name: 'Mockup App', provider_type: 'github', package_url: 'somewhere', localpath: this.app_localpath, status: this.mockAppStatus });
        },
        app_localpath: null,
        mockAppStatus: 'new',
        isAppHasNewVersion: function() {
            return false;
        },
        requestInstallApp: function() {
            console.log('Request Install');
            this.mockAppStatus = 'installing';

            setTimeout(()=> {
                JSI.mockAppStatus = 'ready';
                JSI.app_localpath = 'mock/app';

                app.loadAppInfo();
            }, 3000);
        },
        requestUpdateApp: function() {
            console.log('Request Update');
            this.mockAppStatus = 'updating';
        },
        openAppPlayer: function() {
            window.open('app_player.html');
        },
        getApplicationID: function() {
            return 'MockupApp';
        },
        openApp: function(app_id) {
            window.open('app_detail.html');
        },
        onWebAppReady: function() {
        },
        filterAppByCategory: function(category, page) {
            console.log(`filterAppByCategory ${category} ${page}`);
            
            setTimeout(() => {
                console.log(`on timeout filter result`);
                let data_id = `app_filter_${category}_${page}`;
                app.$refs.applist.onFilterAppResult(data_id);
            }, 2000);
        },
        getCacheData: function(data_id) {
            console.log(`getCacheData ${data_id}`);
            
            let ls = [];
            let parts = data_id.split('_');
            let category = parts[1];
            
            for(let i = 0; i < 10; i++){ 
                let id = `app_${i}`;
                ls.push({ id: id, code: id, name: id, category : category });
            }
            return JSON.stringify(ls);
        }
    };
} else {
    JSI = _JSI;
}