Vue.component('appcard', {
	template:`
<div class="appcard" @click="openApp">
    <label class="name">{{app.name}}</label>
</div>
	`,
	props: ['app'],
	data: function() {
		return {
			
		};
	},
	mounted: function() {
		
	},
    watch: {
        app: function(newVal, oldVal) {
            
        }
    },
	methods: {
        openApp: function() {
            JSI.openApp(this.$props.app.id);
        }
	}
});