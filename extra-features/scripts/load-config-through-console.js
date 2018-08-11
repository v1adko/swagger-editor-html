const action = (type, payload) => window.editor.getStore().dispatch({ type, payload });

const loadConfigURL = (url) => {
	fetch(url)
		.then((r) => r.text())
		.then((configYaml) => {
			const configJson = YAML.parse(configYaml);

			if (!shouldHideEditor()) {
				action('spec_update_spec_origin', 'not-editor');
				action('spec_update_spec', configYaml);
				action('spec_update_spec_origin', 'not-editor');

				action('err_clear', { source: 'parser' });
			}

			action('spec_update_json', configJson);
		})
		.then(() => console.info('Config successfully loaded.'))
		.catch((err) => console.error(err));
	return 'Loading...';
};

const allowEditorConfigLoad = () => {
    window.editor = new Proxy(window.editor, {
        set(target, prop, value) {
            if (prop === 'CONFIG_URL') {
                loadConfigURL(value);
            }
            target[prop] = value;
            return true;
        }
    });    
}
