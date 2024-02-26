interface Menu {
	path: string;
	name: string;
	btnRole?: string;
	type: 1 | 2; //1：页面、2：按钮
	children?: Menu[];
}

export type MenuTree = Menu[];

export const menuTreeMock: MenuTree = [
	{
		path: '/data-analysis',
		name: '数据分析',
		type: 1,
		children: [
			{
				path: '/management-report',
				name: '经营报表',
				type: 1,
				children: [
					{
						path: '/commodity-sales',
						name: '商品销售占比表',
						type: 1,
						children: [
							{
								path: '/index',
								name: '商品销售占比表',
								type: 1,
							},
							{
								path: '',
								btnRole: 'report-com-s-btn',
								name: '查询按钮',
								type: 2,
							},
						],
					},
				],
			},
		],
	},
];
