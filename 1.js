Vue.createApp({
	data () {
		return {
			id: 1,
			newItem: '',
			items: [],
			filter: '全部'
		}
	},
	methods: {
		addItem () {
			if (this.newItem.length < 2) return

			this.items.push({
				id: this.id++,
				name: this.newItem,
				done: false,
				model: this.newItem,
				edit: false
			})

			this.newItem = ''
		},
		findIdxById (id) {
			return this.items.findIndex(item => item.id === id)
		},
		editItem (id) {
			this.items[this.findIdxById(id)].edit = true
		},
		delItem (id) {
			this.items.splice(this.findIdxById(id), 1)
		},
		saveEdit (id) {
			const idx = this.findIdxById(id)
			this.items[idx].name = this.items[idx].model
			this.items[idx].edit = false
		},
		cancelEdit (id) {
			const idx = this.findIdxById(id)
			this.items[idx].model = this.items[idx].name
			this.items[idx].edit = false
		},
		markDone (value) {
			this.items.map(item => {
				item.done = value
				return item
			})
		},
		delItems (value) {
			this.items = this.items.filter(item => {
				if (value === '全部') return false
				else if (value === '已完成')  return item.done === false
				else return item.done === true
			})
		}
	},
	computed: {
		inputStyle () {
			return this.newItem.length === 0 ? { border: '5px solid black'} : this.newItem.length < 2 ? { border: '5px solid red'} : { border: '5px solid blue'}
		},
		filteredItem () {
			return this.items.filter(item => {
				if (this.filter === '全部') return true
				// else if (this.filter === '已完成')  return item.done
				else if (this.filter === '已完成')  return item.done === true
				// else return !item.done
				else return item.done === false
			})
		}
	},
	watch: {
		items: {
			handler () {
				localStorage.newtodo = JSON.stringify(this.items)
			},
			deep: true
		}
	},
	created () {
		this.items = JSON.parse(localStorage.newtodo || '[]')
		this.id = this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1 
	}
}).mount('#app')