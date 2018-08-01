### Save Swagger documentation in HTML with editor styles

[Following issue](https://github.com/swagger-api/swagger-editor/issues/664) in detail describes the inability to export documentation from [editor.swagger.io](https://editor.swagger.io/) into static HTML.

This simple hack allows you to use the editor preview styles without the editor pane (as of August 1, 2018).

Simply point the config [URL](https://github.com/v1adko/swagger-editor-html/blob/master/index.html#L75) to your custom API definitons (`.yaml` or `.json`).
