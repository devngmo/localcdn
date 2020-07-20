Vue.component('navbar', {
	template:`
<div class="v-flex navbar">
    <ul class="nav nav-tabs">
        <li class="nav-item" v-for="tab in tabs">
            <a :class="['nav-link', active_tab==getTabId(tab)?'active':'']" 
                data-toggle="tab" role="tab" aria-selected="false" @click="selectTab(tab)">{{getTabName(tab)}}</a>
        </li>
    </ul>
</div>				
	`,
	props: ['tabs', 'key_id', 'key_name'],
	data: function() {
		return {
			query: '',
			active_tab: ''
		};
	},
	mounted: function() {
		
		if (this.$props.tabs !== null && this.$props.tabs.length > 0) {
			this.active_tab = this.$props.tabs[0].id;
		}
	},
	methods: {
        getTabName: function(tab) {
            if (this.$props.key_name === undefined || this.$props.key_name === '') return tab;
            return tab[this.$props.key_name];
        },
        getTabId: function(tab) {
            if (this.$props.key_id === undefined || this.$props.key_id === '') return tab;
            return tab[this.$props.key_id];
        },
        selectTab: function(tab) {
            let tab_id = this.getTabId(tab);
            this.$emit('change', tab_id);
        }
	}
});