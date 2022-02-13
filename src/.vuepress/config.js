module.exports = {
    title: '知行天下',
    description: '知之者为知之,不知为不知,是知也',
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/logo.jpg'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./topMenu.js'),
        sidebar: require('./sideBar.js'),
        sidebarDepth: 1,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 50,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },
	plugins: [
		["vuepress-plugin-automenu", { /* options */}],
		["fulltext-search", {
			"tokenize":"full",
			"encode":"default",
		}],
		// ["full-search", {
		// 	"tokenize":"full",
		// 	"encode":"default",
        // }],
        // [require("../../../vuepress-plugin-full-search/index")]
	]
}
