const path = require('path');

module.exports = {
	description: 'throws when setting the asset source in the transform hook',
	options: {
		plugins: {
			name: 'test-plugin',
			transform(code) {
				const assetId = this.emitAsset('test.ext');
				this.setAssetSource(assetId, 'asdf');
				return code;
			}
		}
	},
	error: {
		code: 'PLUGIN_ERROR',
		hook: 'transform',
		id: path.join(__dirname, 'main.js'),
		message:
			'setAssetSource cannot be called in transform for caching reasons. Use emitAsset with a source, or call setAssetSource in another hook.',
		plugin: 'test-plugin',
		pluginCode: 'INVALID_SETASSETSOURCE'
	}
};