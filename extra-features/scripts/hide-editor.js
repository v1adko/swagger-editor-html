const setStyle = (selector, style, value, important = false) => {
	const element = document.querySelector(selector);

	if (!element) {
		console.error('Could not find an element for', selector);
		return;
	}

	element.style.setProperty(style, value, important ? 'important' : undefined);
};

const hideSpinner = () => setStyle('#loader-container', 'display', 'none');

const hideEditorPanes = () => {
	setStyle('div.Pane.vertical.Pane1', 'display', 'none');
	setStyle('div.Pane.vertical.Pane2', 'width', '100%');
	setStyle('div.SplitPane.vertical', 'height', '100%', true);
	setStyle('section.container', 'max-width', '100%');
	setStyle('div.Pane2', 'overflow-y', 'auto');
};

const makeEditorFullScreen = () => {
	setStyle('div.SplitPane.vertical', 'top', 0);
	setStyle('div.SplitPane.vertical', 'height', '100%', true);
	setStyle('div#editor-wrapper', 'height', '100%');
	setStyle('div#ace-editor', 'height', '100%', true);
	setStyle('div.Pane.vertical.Pane2', 'overflow-y', 'auto');
};

const shouldHideEditor = () => window.location.pathname.indexOf('editor') === -1;

const hideExtraStyles = () => {
	// Leave the ability to view the editor
	const hideEditor = shouldHideEditor();
	hideSpinner();

	if (hideEditor) {
		hideEditorPanes();
	} else {
		makeEditorFullScreen();
	}
};
