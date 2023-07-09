function getCanvasBaseDomain() {
    var props = PropertiesService.getScriptProperties();
    return props.getProperty('canvas_base_domain');
}