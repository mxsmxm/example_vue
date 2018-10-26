const app = new Vue({
	el: "#app",
	data: {
		people: [{
				"isActive": true,
				"balance": 1755.48,
				"name": "Lilly Clark",
				"email": "lillyclark@hinway.com",
				"registered": "2014-07-23T05:19:53"
			},
			{
				"isActive": false,
				"balance": 3066.5,
				"name": "Chasity Cherry",
				"email": "chasitycherry@hinway.com",
				"registered": "2017-04-20T01:41:22"
			},
			{
				"isActive": false,
				"balance": 3408.2,
				"name": "Figueroa Mclean",
				"email": "figueroamclean@hinway.com",
				"registered": "2016-12-02T10:49:54"
			},
			{
				"isActive": false,
				"balance": 2835.65,
				"name": "Zamora Petty",
				"email": "zamorapetty@hinway.com",
				"registered": "2014-07-30T04:25:00"
			},
			{
				"isActive": true,
				"balance": 1179.49,
				"name": "Gale Head",
				"email": "galehead@hinway.com",
				"registered": "2017-08-02T10:22:04"
			},
			{
				"isActive": true,
				"balance": 2883.47,
				"name": "Wright Huber",
				"email": "wrighthuber@hinway.com",
				"registered": "2017-10-17T03:50:52"
			},
			{
				"isActive": true,
				"balance": 3459.53,
				"name": "Mable Peters",
				"email": "mablepeters@hinway.com",
				"registered": "2014-02-02T12:07:48"
			}
		],
		currency: '$',
		filterField: '',
		filterQuery: '',
		filterUserState: ''
	},
	methods: {
		activeClass(person){
			if(person.isActive)
			{
				return ["active","bord"];
			}
			else
			{
				return "inActive";
			}
		},
		isActiveFilterSelected() {
			return(this.filterField === "isActive");
		},
		activeStatus(person) {
			return(person.isActive) ? "Active" : "Inactive";
		},
		formatBalance(balance) {
			return this.currency + balance.toFixed(2);
		},
		formatData(data) {
			let registered = new Date(data);
			return registered.toLocaleString()
		},
		filterRow(person) {
			let result = true;
			if(this.filterField) {
				if(this.filterField === 'isActive') {
					if(typeof this.filterUserState === "boolean") {
						result = this.filterUserState === person.isActive;
					} else {
						result = true
					}

				} else {
					let field = this.filterField; //下拉框里的过滤值
					if(typeof person[field] === 'number') { //如果下拉框是数字,查询条件使用><=
						try {
							let query = this.filterQuery;
							let reg = /([>|<]=?)(\d+\.?\d+?$)/;
							let m = reg.exec(query);
							if(m.length === 3) {
								switch(m[1]) {
									case ">":
										result = person[field] > parseInt(m[2]);
										break;
									case "<":
										result = person[field] < parseInt(m[2]);
										break;
									case ">=":
										result = person[field] >= parseInt(m[2]);
										break;
									case "<=":
										result = person[field] <= parseInt(m[2]);
										break;
									case "=":
										result = person[field] === parseInt(m[2]);
										break;
								}
							}
						} catch(e) {}
					} else {
						let query = this.filterQuery.toLowerCase();
						result = person[field].toString().toLowerCase().includes(query);
					}
				}
			}
			return result;
		} //end filterRow fn
	}
});