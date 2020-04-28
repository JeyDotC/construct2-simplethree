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
function GetPluginSettings() {
    return {
        "name": "SimpleThree",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
        "id": "SimpleThree",			// this is used to SimpleThree this behavior and is saved to the project; never change it
        "version": "1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
        "description": [
            "Creates a secondary canvas to render Three JS objects. It provides basic settings for Camera and Ambient Light.",
            "",
            "> **NOTE:** This plugin is needed by the other `simplethree_*` plugins to work."
        ].join('\n'),
        "author": "JeyDotC",
        "help url": "<your website or a manual entry on Scirra.com>",
        "category": "Three Js",				// Prefer to re-use existing categories, but you can set anything here
        "type": "world",			// appears in layout
        "rotatable": false,
        "dependency": "three.js",
        "flags": 0						// uncomment lines to enable flags...
            | pf_position_aces | pf_size_aces // | pf_effects
    };
}

if (typeof module !== 'undefined') {
    module.exports = {settings: GetPluginSettings(), type: 'Plugin'};
}

// Actions

AddNumberParam("Camera X", "The capmera X in 2D Pixels.", 0);
AddNumberParam("Camera Y", "The camera Y in 2D Pixels. (Will be translated to camera's Z axis.)", 0);
AddNumberParam("Camera Elevation", "The camera elevation in 2D Pixels. (Will be translated to camera's Y axis.)", 32);
AddAction(0, 0, "Set Camera position from 2D coordinates", "Camera", "Camera position to (<b>{0}</b>, <b>{1}</b>) and elevation of <b>{2}</b>", "Set the camera position using 2D coordinates.", "SetCameraPositionFrom2D");

AddNumberParam("Angle", "The camera angle in degrees. (Will be translated to camera's Y axis angle in Radians.)", 0);
AddAction(1, 0, "Set Camera angle from 2D angle", "Camera", "Camera angle to (<b>{0}</b>) degrees", "Set Camera angle using 2D angle in degrees. This gets translated into the camera's Y angle in radians.", "SetCameraAngleFrom2D");

AddComboParamOption('3D In Front');
AddComboParamOption('3D Behind');
AddComboParam('Canvas Order', 'If the 3D canvas will be in front or behind the 2D canvas.', 0);
AddAction(2, 0, "Set Canvas Order", "Canvas 3D", "The Canvas Order is <b>{0}</b> now", "Put the 3D canvas in front or behind the 2D canvas.", "SetCanvasOrder");

AddComboParamOption('In sync with Screen');
AddComboParamOption('Use Object Size');
AddComboParam('Canvas Sizing', 'The canvas size behavior.', 0);
AddAction(3, 0, "Set Canvas Sizing", "Canvas 3D", "The Canvas Sizing is <b>{0}</b> now", "Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout.", "SetCanvasSizing");

AddComboParamOption('Top-Left');
AddComboParamOption('Use Object Position');
AddComboParam('Canvas Positioning', 'The canvas position behavior.', 0);
AddAction(4, 0, "Set Canvas Positioning", "Canvas 3D", "The Canvas Positioning is <b>{0}</b> now", "Keep the 3D canvas at the top-left or use the object's position.", "SetCanvasPositioning");

AddNumberParam('Pixels Per 3D Unit', 'Number of 2D pixels per 3D unit', 32);
AddAction(5, 0, "Set Pixels Per 3D Unit", "Canvas 3D", "The Pixels Per 3D Unit are <b>{0}</b> now", "Set the Number of 2D pixels per 3D unit, used for 2D to 3D distances translation.", "SetPixelsPer3DUnit");

AddStringParam('Ambient light Color', 'Ambient light color in CSS-style string', "#ffffff");
AddAction(6, 0, "Set The Ambient light Color", "Ambient Light", "The Ambient light Color is <b>{0}</b> now", "Set the Ambient light Color.", "SetAmbientLightColor");

AddNumberParam('Ambient light Intensity', 'How bright is the ambient light', 1.5);
AddAction(7, 0, "Set The Ambient Light Intensity", "Ambient Light", "Ambient Light Intensity is <b>{0}</b> now", "Set How bright is the ambient light.", "SetAmbientLightIntensity");

AddNumberParam("Field Of View", "The Field Of View (FOV) in degrees. (Will be translated to camera's Y axis angle in Radians.)", 75);
AddAction(8, 0, "Set Field Of View (FOV)", "Camera", "Camera FOV is (<b>{0}</b>) degrees now", "How wide is the field of view of the camera in degrees.", "SetCameraFOV");

AddNumberParam("Near", "The closest distance an object will be drawn in 2D units.", 3.2);
AddAction(9, 0, "Set Camera Near Distance", "Camera", "Camera near distance is (<b>{0}</b>) 2D Units now", "Set The closest distance an object will be drawn in 2D units.", "SetCameraNear");

AddNumberParam("Far", "The furthest distance an object will be drawn in 2D units.", 32000);
AddAction(10, 0, "Set Camera Far Distance", "Camera", "Camera far distance is (<b>{0}</b>) 2D Units now", "Set The furthest distance an object will be drawn in 2D units.", "SetCameraFar");

AddComboParamOption('None');
AddComboParamOption('Linear');
AddComboParamOption('Exponential Squared');
AddComboParam('Fog Type', 'The Type of Fog, use None to have no fog at all.', 0);
AddAction(11, 0, "Set Fog Type", "Fog", "Fog Type is <b>{0}</b> now", "Set The Fog Type.", "SetFogType");

AddStringParam('Fog Color', 'Fog color in CSS-style string', "#ffffff");
AddAction(12, 0, "Set Fog Color", "Fog", "Fog Color is <b>{0}</b> now", "Set The Fog Color.", "SetFogColor");

AddNumberParam("Fog Density", "How fast the fog will grow dense.", 0.06);
AddAction(13, 0, "Set Density ", "Fog", "Fog Density is <b>{0}</b> now", "Defines how fast the fog will grow dense. Only applies on Exponential Squared Fog", "SetFogDensity");

AddNumberParam("Fog Near Distance", "Distance in 2D units.", 3.2);
AddAction(14, 0, "Set Fog Near", "Fog", "Fog Near is <b>{0}</b> now", "Set The Fog Near Distance. Only applies for Linear Fog.", "SetFogNear");

AddNumberParam("Fog Far Distance", "Distance in 2D units.", 300);
AddAction(15, 0, "Set Fog Far", "Fog", "Fog Near is <b>{0}</b> now", "Set The Fog Far Distance. Only applies for Linear Fog.", "SetFogFar");

AddStringParam('Scene Background Color', 'Color in CSS-style string', "#ffffff");
AddAction(16, 0, "Set Scene Background Color", "Fog", "Scene Background Color is <b>{0}</b> now", "Set The Scene Background Color.", "SetSceneBackgroundColor");

// Expressions
AddExpression(0, ef_return_number, "Canvas Order", "Canvas 3D", "CanvasOrder", "The 3D canvas in front or behind the 2D canvas. 0=3D In Front, 1=3D Behind");
AddExpression(1, ef_return_number, "Canvas Sizing", "Canvas 3D", "CanvasSizing", "Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout. 0=In sync with Screen, 1=Use Object Size");
AddExpression(2, ef_return_number, "Canvas Positioning", "Canvas 3D", "CanvasPositioning", "Keep the 3D canvas at the top-left or use the object's position. 0=Top-Left, 1=Use Object Position");
AddExpression(3, ef_return_number, "Hotspot X", "Canvas 3D", "HotspotX", "The location of the hot spot in the object.");
AddExpression(4, ef_return_number, "Hotspot Y", "Canvas 3D", "HotspotY", "The location of the hot spot in the object.");
AddExpression(5, ef_return_number, "Pixels Per 3D Unit", "Canvas 3D", "PixelsPer3DUnit", "Number of 2D pixels per 3D unit, used for 2D to 3D distances translation");
AddExpression(6, ef_return_string, "Ambient light Color", "Ambient Light", "AmbientLightColor", "Ambient light color in RGB format");
AddExpression(7, ef_return_number, "Ambient light Intensity", "Ambient Light", "AmbientLightIntensity", "How bright is the light");
AddExpression(8, ef_return_number, "Field Of View (FOV)", "Camera", "Fov", "How wide is the field of view of the camera in degrees.");
AddExpression(9, ef_return_number, "Near", "Camera", "Near", "The closest distance an object will be drawn in 2D units.");
AddExpression(10, ef_return_number, "Far", "Camera", "Far", "The furthest distance an object will be drawn in 2D units.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
    new cr.Property(ept_section, "Three-dimensional Canvas Options"),
    new cr.Property(ept_combo, "Canvas Order", "3D In Front", "Put the 3D canvas in front or behind the 2D canvas.", "3D In Front|3D Behind"),
    new cr.Property(ept_combo, "Canvas Sizing", "In sync with Screen", "Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout.", "In sync with Screen|Use Object Size"),
    new cr.Property(ept_combo, "Canvas Positioning", "Top-Left", "Keep the 3D canvas at the top-left or use the object's position.", "Top-Left|Use Object Position"),
    new cr.Property(ept_combo, "Hotspot", "Top-left", "Choose the location of the hot spot in the object.", "Top-left|Top|Top-right|Left|Center|Right|Bottom-left|Bottom|Bottom-right"),
    new cr.Property(ept_integer, "Pixels Per 3D Unit", 32, "Number of 2D pixels per 3D unit, used for 2D to 3D distances translation"),
    new cr.Property(ept_section, "Ambient Light Options"),
    new cr.Property(ept_color, "Ambient light Color", cr.RGB(255, 255, 255), "Ambient light color in RGB format"),
    new cr.Property(ept_float, "Ambient light Intensity", 1.5, "How bright is the light"),
    new cr.Property(ept_section, "Camera Options"),
    new cr.Property(ept_float, "Field Of View (FOV)", 75, "How wide is the field of view of the camera in degrees."),
    new cr.Property(ept_float, "Near", 3.2, "The closest distance an object will be drawn in 2D units."),
    new cr.Property(ept_float, "Far", 32000, "The furthest distance an object will be drawn in 2D units."),
    new cr.Property(ept_section, "Fog"),
    new cr.Property(ept_combo, "Fog Type", "None", "Type of the scene Fog.", "None|Linear|Exponential Squared"),
    new cr.Property(ept_color, "Fog Color", cr.RGB(255, 255, 255), "Color of the Fog."),
    new cr.Property(ept_float, "Fog Density (Exponential Squared Fog Only)", 0.06, "Defines how fast the fog will grow dense."),
    new cr.Property(ept_float, "Fog Near (Linear Fog Only)", 3.2, "The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog."),
    new cr.Property(ept_float, "Fog Far (Linear Fog Only)", 300, "The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog."),
    new cr.Property(ept_section, "Scene"),
    new cr.Property(ept_color, "Scene Background Color", cr.RGB(0, 0, 0), "Color of the Scene's background."),
];

// Called by IDE when a new behavior type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType();
}

// Class representing a behavior type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
    return new IDEInstance(instance);
};

// Class representing an individual instance of the behavior in the IDE
function IDEInstance(instance, type) {
    assert2(this instanceof arguments.callee, "Constructor called as a function");

    // Save the constructor parameters
    this.instance = instance;
    this.type = type;

    // Set the default property values from the property table
    this.properties = {};

    for (var i = 0; i < property_list.length; i++)
        this.properties[property_list[i].name] = property_list[i].initial_value;

    // any other properties here, e.g...
    // this.myValue = 0;
}

IDEInstance.prototype.OnCreate = function () {
    this.instance.SetHotspot(GetHotspot(this.properties["Hotspot"]));
};

IDEInstance.prototype.OnRendererInit = function (renderer) {
    // console.log(renderer);
};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function (renderer) {
    const instanceRect = this.instance.GetBoundingRect();
    const quad = new cr.quad();
    quad.set_from_rect(instanceRect);
    renderer.Fill(quad, this.properties["Scene Background Color"])
};

IDEInstance.prototype.OnRendererReleased = function (renderer) {
    // console.log(renderer);
};