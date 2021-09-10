module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: [`../packages/${process.env.ONLY || '**'}/**/*.stories.@(tsx)`],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'none',
	},
	reactOptions: {
		fastRefresh: true,
	},
};
