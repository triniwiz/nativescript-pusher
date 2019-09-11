const path = require('path');
const fs = require('fs');

module.exports = function ($logger, $projectData, $injector, hookArgs) {
	return new Promise((resolve, reject) => {
		const appDirectoryPath = ((hookArgs && hookArgs.checkForChangesOpts && hookArgs.checkForChangesOpts.projectData && hookArgs.checkForChangesOpts.projectData) || hookArgs.projectData).appDirectoryPath;
		if (!appDirectoryPath) {
			reject(new Error('Unable to get path to app directory'));
		} else {
			const platform = (((hookArgs && hookArgs.checkForChangesOpts) || hookArgs.prepareData).platform || '').toLowerCase();
			if (platform === 'android') {
				const googleServicesPath = path.join($projectData.appResourcesDirectoryPath, 'Android', 'google-services.json');
				const googleServices = fs.readFileSync(googleServicesPath);
				const googleServicesOutputPath = path.join($projectData.platformsDir, 'android', 'app', 'google-services.json');
				fs.writeFileSync(googleServicesOutputPath, googleServices);
			} else if (platform === 'ios') {
				//noop
			}

			resolve();
		}
	});
};
