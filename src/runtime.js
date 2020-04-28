/*
Copyright 2020 Jeysson Guevara (JeyDotC)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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

    const CanvasOrder = {
        InFront: 0,
        Behind: 1,
    };

    const CanvasSizing = {
        InSyncWithScreen: 0,
        UseObjectSize: 1,
    };

    const CanvasPositioning = {
        TopLeft: 0,
        UseObjectPosition: 1,
    };

    const FogType = {
        None: 0,
        Linear: 1,
        ExponentialSquared: 2,
    };

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
        this.fog = undefined;

        this.canvasOrder = CanvasOrder.InFront;
        this.canvasSizing = CanvasSizing.InSyncWithScreen;
        this.canvasPositioning = CanvasPositioning.TopLeft;
        this.pixelsPer3DUnit = 32;
        this.ambientLightColor = 0xFFFFFF;
        this.ambientLightIntensity = 4;
        this.fov = 75;
        this.near = 0.5;
        this.far = 1000;
        // Fog
        this.fogType = FogType.None;
        this.fogColor = cr.RGB(255, 255, 255);
        this.fogDensity = 0.00025;
        this.fogNear = 1;
        this.fogFar = 1000;
        // Scene
        this.seceneBackgroundColor = undefined;
    };

    const instanceProto = pluginProto.Instance.prototype;

    instanceProto.pixelsTo3DUnits = function (distance2D) {
        return distance2D / (this.pixelsPer3DUnit || 1);
    };

    instanceProto.threeDimentionalUnitsToPixels = function (distance3D) {
        return distance3D * (this.pixelsPer3DUnit || 1);
    };

    instanceProto.angleTo3D = function (angle) {
        return -cr.to_radians(angle + 90);
    };

    instanceProto.configureFog = function () {
        switch (this.fogType) {
            case FogType.None:
                return;
            case FogType.Linear:
                this.scene.fog = new THREE.Fog(this.fogColor, this.fogNear, this.fogFar);
                break;
            case FogType.ExponentialSquared:
                this.scene.fog = new THREE.FogExp2(this.fogColor, this.fogDensity);
                break;
            default:
                break;
        }
    };

    instanceProto.onCreate = function () {
        this.canvasOrder = this.properties[0];
        this.canvasSizing = this.properties[1];
        this.canvasPositioning = this.properties[2];
        this.pixelsPer3DUnit = this.properties[4];
        this.ambientLightColor = new THREE.Color(this.properties[5]);
        this.ambientLightIntensity = this.properties[6];
        this.fov = this.properties[7];
        this.near = this.pixelsTo3DUnits(this.properties[8]);
        this.far = this.pixelsTo3DUnits(this.properties[9]);
        // Fog
        this.fogType = this.properties[10];
        this.fogColor = new THREE.Color(this.properties[11]);
        this.fogDensity = this.properties[12];
        this.fogNear = this.pixelsTo3DUnits(this.properties[13]);
        this.fogFar = this.pixelsTo3DUnits(this.properties[14]);
        // Scene
        this.seceneBackgroundColor = new THREE.Color(this.properties[15]);

        console.log(this);

        this.canvas3d = createCanvas();

        this.runtime.canvas.parentElement.style.display = 'grid';
        this.runtime.canvas.style.gridArea = '1/1';

        if (this.canvasOrder === CanvasOrder.InFront) {
            this.runtime.canvas.parentElement.appendChild(this.canvas3d);
        } else {
            this.runtime.canvas.parentElement.prepend(this.canvas3d);
        }

        this.scene = new THREE.Scene();
        this.scene.background = this.seceneBackgroundColor;

        this.configureFog();

        this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far);
        this.camera.position.z = 5;

        this.ambientLight = new THREE.AmbientLight(this.ambientLightColor, this.ambientLightIntensity);

        this.scene.add(this.ambientLight);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas3d,
        });

        this.runtime.tickMe(this);

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

        this.runtime.redraw = true;
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
        const canvas2D = this.runtime.canvas;
        const rendererSize = new THREE.Vector3();
        this.renderer.getSize(rendererSize);
        if (this.canvasSizing === CanvasSizing.InSyncWithScreen && (canvas2D.width != rendererSize.x || canvas2D.height != rendererSize.y)) {
            this.updateCanvas3d();
        }
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
    }

    // TODO: Put conditions here

    pluginProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() {
    }

    Acts.prototype.SetCameraPositionFrom2D = function (x, y, elevation) {
        const x3D = this.pixelsTo3DUnits(x);
        const y3D = this.pixelsTo3DUnits(y);
        const elevation3D = this.pixelsTo3DUnits(elevation);

        this.camera.position.x = x3D;
        this.camera.position.z = y3D;
        this.camera.position.y = elevation3D;
    };

    Acts.prototype.SetCameraAngleFrom2D = function (angle) {
        this.camera.rotation.y = this.angleTo3D(angle);
    };

    Acts.prototype.SetCanvasOrder = function (newCanvasOrder) {
        if (newCanvasOrder !== this.canvasOrder) {

            this.canvasOrder = newCanvasOrder;

            if (this.canvasOrder === CanvasOrder.InFront) {
                this.runtime.canvas.before(this.canvas3d);
            } else {
                this.runtime.canvas.after(this.canvas3d);
            }
        }
    };

    Acts.prototype.SetCanvasSizing = function (newCanvasSizing) {
        if (newCanvasSizing !== this.canvasSizing) {
            this.canvasSizing = newCanvasSizing;
            this.updateCanvas3d();
        }
    };

    Acts.prototype.SetCanvasPositioning = function (newCanvasPositioning) {
        if (newCanvasPositioning !== this.canvasPositioning) {
            this.canvasPositioning = newCanvasPositioning;
            this.updateCanvas3d();
        }
    };

    Acts.prototype.SetPixelsPer3DUnit = function (newPixelsPer3DUnit) {
        this.pixelsPer3DUnit = newPixelsPer3DUnit;
        this.runtime.redraw = true;
    };

    Acts.prototype.SetAmbientLightColor = function (newAmbientLightColor) {
        this.ambientLightColor = this.ambientLight.color = new THREE.Color(newAmbientLightColor);
        this.runtime.redraw = true;
    };

    Acts.prototype.SetAmbientLightIntensity = function (newAmbientLightIntensity) {
        this.ambientLightIntensity = this.ambientLight.intensity = newAmbientLightIntensity;
        this.runtime.redraw = true;
    };

    Acts.prototype.SetCameraFOV = function (cameraFov) {
        if (cameraFov == this.fov) {
            return;
        }
        this.fov = this.camera.fov = cameraFov;
        this.camera.updateProjectionMatrix();
        this.runtime.redraw = true;
    };

    Acts.prototype.SetCameraNear = function (cameraNear) {
        const newCameraNear = this.pixelsTo3DUnits(cameraNear);
        if (newCameraNear == this.near) {
            return;
        }
        this.near = this.camera.near = newCameraNear;
        this.camera.updateProjectionMatrix();
        this.runtime.redraw = true;
    };

    Acts.prototype.SetCameraFar = function (cameraFar) {
        const newCameraFar = this.pixelsTo3DUnits(cameraFar);
        if (newCameraFar == this.far) {
            return;
        }
        this.far = this.camera.far = newCameraFar;
        this.camera.updateProjectionMatrix();
        this.runtime.redraw = true;
    };

    Acts.prototype.SetFogType = function (fogType) {
        this.fogType = fogType;
        this.configureFog();
        this.runtime.redraw = true;
    };

    Acts.prototype.SetFogColor = function (fogColor) {
        this.fogColor = new THREE.Color(fogColor);
        this.configureFog();
        this.runtime.redraw = true;
    };
    Acts.prototype.SetFogDensity = function (fogDensity) {
        this.fogDensity = fogDensity;
        this.configureFog();
        this.runtime.redraw = true;
    };
    Acts.prototype.SetFogNear = function (fogNear) {
        this.fogNear = this.pixelsTo3DUnits(fogNear);
        this.configureFog();
        this.runtime.redraw = true;
    };
    Acts.prototype.SetFogFar = function (fogFar) {
        this.fogFar = this.pixelsTo3DUnits(fogFar);
        this.configureFog();
        this.runtime.redraw = true;
    };
    Acts.prototype.SetSceneBackgroundColor = function (sceneBackgroundColor) {
        this.scene.background = this.seceneBackgroundColor = new THREE.Color(sceneBackgroundColor);
        this.runtime.redraw = true;
    };

    pluginProto.acts = new Acts();

    //////////////////////////////////////
    // Expressions
    function Exps() {
    }

    Exps.prototype.CanvasOrder = function (ret) {
        ret.set_int(this.canvasOrder);
    };

    Exps.prototype.CanvasSizing = function (ret) {
        ret.set_int(this.canvasSizing);
    };

    Exps.prototype.CanvasPositioning = function (ret) {
        ret.set_int(this.canvasPositioning);
    };

    Exps.prototype.HotspotX = function (ret) {
        ret.set_float(this.hotspotX);
    };

    Exps.prototype.HotspotY = function (ret) {
        ret.set_float(this.hotspotY);
    };

    Exps.prototype.PixelsPer3DUnit = function (ret) {
        ret.set_int(this.pixelsPer3DUnit);
    };

    Exps.prototype.AmbientLightColor = function (ret) {
        ret.set_int(this.ambientLightColor.getHex());
    };

    Exps.prototype.AmbientLightIntensity = function (ret) {
        ret.set_float(this.ambientLightIntensity);
    };

    Exps.prototype.Fov = function (ret) {
        ret.set_float(this.fov);
    };

    Exps.prototype.Near = function (ret) {
        ret.set_float(this.threeDimentionalUnitsToPixels(this.near));
    };

    Exps.prototype.Far = function (ret) {
        ret.set_float(this.threeDimentionalUnitsToPixels(this.far));
    };

    Exps.prototype.FogType = function (ret) {
        ret.set_int(this.fogType);
    };
    Exps.prototype.FogColor = function (ret) {
        ret.set_int(this.fogColor.getHex());
    };
    Exps.prototype.FogDensity = function (ret) {
        ret.set_float(this.fogDensity);
    };
    Exps.prototype.FogNear = function (ret) {
        ret.set_float(this.threeDimentionalUnitsToPixels(this.fogNear));
    };
    Exps.prototype.FogFar = function (ret) {
        ret.set_float(this.threeDimentionalUnitsToPixels(this.fogFar));
    };
    Exps.prototype.SceneBackgroundColor = function (ret) {
        ret.set_int(this.seceneBackgroundColor.getHex());
    };

    pluginProto.exps = new Exps();

}());