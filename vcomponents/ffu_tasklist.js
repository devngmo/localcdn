Vue.component('ffu_tasklist', {
	template:`
<div class="ffu_tasklist">
	<ul class="list-group">
		<li class="list-group-item" v-for="item in list">
			<span>{{item.title}}</span>
		</li>
	</ul>
</div>
	`,
	props: ['filter'],
	data: function() {
		return {
			list: []
		};
	},
	mounted: function() {
		
	},
	methods: {
		
	}
});