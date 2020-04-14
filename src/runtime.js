// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins not created");

/////////////////////////////////////
// plugin class
cr.plugins_.SimpleThree = function (runtime) {
    this.runtime = runtime;
};

(function () {
    const pluginProto = cr.plugins_.SimpleThree.prototype;

    /////////////////////////////////////
    // plugin type class
    pluginProto.Type = function (plugin) {
        this.plugin = plugin;
        this.runtime = plugin.runtime;
    };

    const typeProto = pluginProto.Type.prototype;

    typeProto.onCreate = function () {
    };

    /////////////////////////////////////
    // plugin instance class
    pluginProto.Instance = function (type) {
        this.type = type;
        this.plugin = type.plugin;
        this.runtime = type.runtime;

        this.renderer = undefined;
        this.scene = undefined;
        this.camera = undefined;
        this.canvas3d = undefined;
        this.ambientLight = undefined;

        this.canvasOrder = CanvasOrder.InFront;
        this.canvasSizing = CanvasSizing.InSyncWithScreen;
        this.canvasPositioning = CanvasPositioning.TopLeft;
        this.pixelsPer3DUnit = 32;
        this.ambientLightColor = 'ffffff';
        this.ambientLightIntensity = 4;
    };

    const instanceProto = pluginProto.Instance.prototype;

    const CanvasOrder = {
        InFront: 0,
        Behind: 1
    };
    const CanvasSizing = {
        InSyncWithScreen: 0,
        UseObjectSize: 1
    };
    const CanvasPositioning = {
        TopLeft: 0,
        UseObjectPosition: 1
    };

    instanceProto.pixelsTo3DUnits = function(distance2D){
        return distance2D / (this.pixelsPer3DUnit || 1);
    };

    instanceProto.angleTo3D = function(angle){
      return -cr.to_radians(angle + 90);
    };

    instanceProto.onCreate = function () {
        this.canvasOrder = this.properties[0];
        this.canvasSizing = this.properties[1];
        this.canvasPositioning = this.properties[2];
        this.pixelsPer3DUnit = this.properties[4];
        this.ambientLightColor = parseInt(`0x${this.properties[5]}`);
        this.ambientLightIntensity = this.properties[6];

        if (this.ambientLightColor === NaN){
            console.warn('Invalid color expression, falling back to FFFFFF');
            this.ambientLightColor = 0xFFFFFF;
        }

        console.log(this.properties);

        this.canvas3d = createCanvas();

        this.runtime.canvas.parentElement.style.display = 'grid';
        this.runtime.canvas.style.gridArea = '1/1';

        if (this.canvasOrder === CanvasOrder.InFront) {
            this.runtime.canvas.parentElement.appendChild(this.canvas3d);
        } else {
            this.runtime.canvas.parentElement.prepend(this.canvas3d);
        }

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 5;

        this.ambientLight = new THREE.AmbientLight(this.ambientLightColor, this.ambientLightIntensity);

        this.scene.add(this.ambientLight);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas3d,
        });

        this.updateCanvas3d();

        window.addEventListener('resize', this.updateCanvas3d.bind(this));
    };

    function createCanvas() {
        document.querySelectorAll(".simplethree-3d-canvas")
            .forEach(el => el.remove());

        const canvas3d = document.createElement("canvas");
        canvas3d.setAttribute("class", "simplethree-3d-canvas");
        canvas3d.style.display = "block";
        canvas3d.style.gridArea = '1/1';

        return canvas3d;
    }

    instanceProto.updateCanvas3d = function () {
        if (this.canvasPositioning === CanvasPositioning.UseObjectPosition) {
            const newPosition = {
                x: this.x - this.hotspotX * this.width,
                y: this.y - this.hotspotY * this.height
            };

            this.canvas3d.style.marginLeft = `${newPosition.x}px`;
            this.canvas3d.style.marginTop = `${newPosition.y}px`;
        }

        const newSize = this.canvasSizing === CanvasSizing.UseObjectSize ?
            {width: this.width, height: this.height} :
            {width: this.runtime.canvas.width, height: this.runtime.canvas.height};

        this.renderer.setSize(newSize.width, newSize.height);
        this.camera.aspect = newSize.width / newSize.height;
    };

    instanceProto.onDestroy = function () {
        // called when associated object is being destroyed
        // note runtime may keep the object and plugin alive after this call for recycling;
        // release, recycle or reset any references here as necessary
        this.canvas3d.remove();
        window.removeEventListener('resize', this.updateCanvas3d.bind(this));
    };

    instanceProto.drawGL_earlyZPass = function (glw) {
        this.drawGL(glw);
    };

    instanceProto.drawGL = function (glw) {
        this.renderer.render(this.scene, this.camera);
    };

    // called when saving the full state of the game
    instanceProto.saveToJSON = function () {
        // return a Javascript object containing information about your plugin's state
        // note you MUST use double-quote syntax (e.g. "property": value) to prevent
        // Closure Compiler renaming and breaking the save format
        return {
            // e.g.
            "n": this.name,
            "t": this.tags
        };
    };

    // called when loading the full state of the game
    instanceProto.loadFromJSON = function (o) {
        // load from the state previously saved by saveToJSON
        // 'o' provides the same object that you saved, e.g.
        // this.myValue = o["myValue"];
        // note you MUST use double-quote syntax (e.g. o["property"]) to prevent
        // Closure Compiler renaming and breaking the save format
        this.name = o["n"];
        this.tags = o["t"];
    };

    instanceProto.tick = function () {
        var dt = this.runtime.getDt(this.inst);

        // called every tick for you to update this.inst as necessary
        // dt is the amount of time passed since the last tick, in case it's a movement
    };

    // The comments around these functions ensure they are removed when exporting, since the
    // debugger code is no longer relevant after publishing.
    /**BEGIN-PREVIEWONLY**/
    instanceProto.getDebuggerValues = function (propsections) {
        // Append to propsections any debugger sections you want to appear.
        // Each section is an object with two members: "title" and "properties".
        // "properties" is an array of individual debugger properties to display
        // with their name and value, and some other optional settings.
        propsections.push({
            "title": this.type.name,
            "properties": [
                // Each property entry can use the following values:
                // "name" (required): name of the property (must be unique within this section)
                // "value" (required): a boolean, number or string for the value
                // "html" (optional, default false): set to true to interpret the name and value
                //									 as HTML strings rather than simple plain text
                // "readonly" (optional, default false): set to true to disable editing the property
                {"name": "Name", "value": this.name},
                {"name": "Tags", "value": this.tags.join(',')}
            ]
        });
    };

    instanceProto.onDebugValueEdited = function (header, name, value) {
        // Called when a non-readonly property has been edited in the debugger. Usually you only
        // will need 'name' (the property name) and 'value', but you can also use 'header' (the
        // header title for the section) to distinguish properties with the same name.
        if (name === "Name")
            this.name = value;

        if (name === "Tags")
            this.tags = value.split(',');
    };

    /**END-PREVIEWONLY**/

    //////////////////////////////////////
    // Conditions
    function Cnds() {
    };

    // TODO: Put conditions here

    pluginProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() {
    };

    Acts.prototype.SetCameraPositionFrom2D = function(x, y, elevation){
        const x3D = this.pixelsTo3DUnits(x);
        const y3D = this.pixelsTo3DUnits(y);
        const elevation3D = this.pixelsTo3DUnits(elevation);

        this.camera.position.x = x3D;
        this.camera.position.z = y3D;
        this.camera.position.y = elevation3D;
    };

    Acts.prototype.SetCameraAngleFrom2D = function(angle){
        this.camera.rotation.y = this.angleTo3D(angle);
    };

    pluginProto.acts = new Acts();

    //////////////////////////////////////
    // Expressions
    function Exps() {
    };

    // TODO: Put expressions here

    pluginProto.exps = new Exps();

}());