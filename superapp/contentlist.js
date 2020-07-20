Vue.component('contentlist', {
	template:`
<div class="contentlist">
    <ul class="list-group" v-if="items != null">
        <div class="data-item" v-for="(e, i) in items" @click="openItem(i)" v-html="renderItem(i)">
            
        </div>
    </ul>
</div>
	`,
    props: ['name', 'active_tab', 'content_provider', 'item_renderer', 'filter'],
	data: function() {
		return {
			items: []
		};
	},
	mounted: function() {
		console.log(`[DATALIST:${this.$props.name}] mounted`);
        this.reload();
	},
    created: function() {
        console.log(`[DATALIST:${this.$props.name}] created`);
        
    },
    watch: {
        active_tab: function(newVal, oldVal) {
            console.log(`[DATALIST:${this.$props.name}] active tab = ${newVal}`);
            this.reload();
        }
    },
    computed: {

    },
	methods: {
        renderItem: function(index) {
            return this.$props.item_renderer(index, this.items[index]);
        },
        reload: function() {
            let vm = this;
            console.log(`[DATALIST:${this.$props.name}] reload...`);
            if (this.$props.content_provider) {
                this.$props.content_provider.execDatalistRequest({ type: 'reload', filter: this.$props.filter})
                .then(resp => {
                    vm.items = vm.$props.content_provider.getItemsFromFilterResult(resp);
                });
            }
        },
        openItem: function(index) {
            console.log(`[DATALIST:${this.$props.name}] click at item [${index}]`);
            this.$emit('item_clicked', index);
        }
	}
});