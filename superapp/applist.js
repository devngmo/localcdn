Vue.component('applist', {
	template:`
<div class="v-flex f1 applist">
    <appcard v-for="app in apps" :app="app" :key="app.code">
    </appcard>
    
    
    <div v-if="isFetchingData" style="width=100%;text-align:center">
        <div  class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>`,
	props: ['tab'],
	data: function() {
		return {
			apps : [],
            isFetchingData: false
		};
	},
    
	mounted: function() {
		this.reload();
	},
    watch: {
        tab: function(newVal, oldVal) {
            this.apps = [];
            this.reload();
        }
    },
	methods: {
        reload: function() {
            let vm = this;
            this.isFetchingData = true;
            JSI.filterAppByCategory(this.$props.tab, 1);
            // .then(resp => {
                // console.log(resp);
                // vm.apps = vm.apps.concat(resp.data);
            // })
            // .catch(err => {
                // console.error(err);
            // });
        },
        onFilterAppResult: function(data_id) {
            let json = JSI.getCacheData(data_id);
            let ls = JSON.parse(json);
            this.apps = ls;
            this.isFetchingData = false;
        }
	}
});
