# SimpleThree
**Type:** Plugin

Creates a secondary canvas to render Three JS objects. It provides basic settings for Camera and Ambient Light.

> **NOTE:** This plugin is needed by the other `simplethree_*` plugins to work.

# Properties

| Name | Type | Description | Options |
|------|------|-------------|---------|
| | | **Three-dimensional Canvas Options**| |
|**Canvas Order**| _combo_ | Put the 3D canvas in front or behind the 2D canvas. Default value: `3D In Front` | - 3D In Front<br/>- 3D Behind |
|**Canvas Sizing**| _combo_ | Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout. Default value: `In sync with Screen` | - In sync with Screen<br/>- Use Object Size |
|**Canvas Positioning**| _combo_ | Keep the 3D canvas at the top-left or use the object's position. Default value: `Top-Left` | - Top-Left<br/>- Use Object Position |
|**Hotspot**| _combo_ | Choose the location of the hot spot in the object. Default value: `Top-left` | - Top-left<br/>- Top<br/>- Top-right<br/>- Left<br/>- Center<br/>- Right<br/>- Bottom-left<br/>- Bottom<br/>- Bottom-right |
|**Pixels Per 3D Unit**| _integer_ | Number of 2D pixels per 3D unit, used for 2D to 3D distances translation Default value: `32` |  |
| | | **Ambient Light Options**| |
|**Ambient light Color**| _color_ | Ambient light color in RGB format Default value: `ffffff` |  |
|**Ambient light Intensity**| _float_ | How bright is the light Default value: `1.5` |  |
| | | **Camera Options**| |
|**Field Of View (FOV)**| _float_ | How wide is the field of view of the camera in degrees. Default value: `75` |  |
|**Near**| _float_ | The closest distance an object will be drawn in 2D units. Default value: `3.2` |  |
|**Far**| _float_ | The furthest distance an object will be drawn in 2D units. Default value: `32000` |  |
| | | **Fog**| |
|**Fog Type**| _combo_ | Type of the scene Fog. Default value: `None` | - None<br/>- Linear<br/>- Exponential Squared |
|**Fog Color**| _color_ | Color of the Fog. Default value: `ffffff` |  |
|**Fog Density (Exponential Squared Fog Only)**| _float_ | Defines how fast the fog will grow dense. Default value: `0.06` |  |
|**Fog Near (Linear Fog Only)**| _float_ | The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog. Default value: `3.2` |  |
|**Fog Far (Linear Fog Only)**| _float_ | The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog. Default value: `300` |  |
| | | **Scene**| |
|**Scene Background Color**| _color_ | Color of the Scene's background. Default value: `0` |  |

# ACES

## Actions

| Name | Description | Parameters |
|------|-------------|------------|
| |**Camera**| |
|**Set Camera position from 2D coordinates**| Set the camera position using 2D coordinates. | - **Camera X** _number_: The capmera X in 2D Pixels. <br />- **Camera Y** _number_: The camera Y in 2D Pixels. (Will be translated to camera's Z axis.) <br />- **Camera Elevation** _number_ = `32`: The camera elevation in 2D Pixels. (Will be translated to camera's Y axis.)  |
|**Set Camera angle from 2D angle**| Set Camera angle using 2D angle in degrees. This gets translated into the camera's Y angle in radians. | - **Angle** _number_: The camera angle in degrees. (Will be translated to camera's Y axis angle in Radians.)  |
|**Set Field Of View (FOV)**| How wide is the field of view of the camera in degrees. | - **Field Of View** _number_ = `75`: The Field Of View (FOV) in degrees. (Will be translated to camera's Y axis angle in Radians.)  |
|**Set Camera Near Distance**| Set The closest distance an object will be drawn in 2D units. | - **Near** _number_ = `3.2`: The closest distance an object will be drawn in 2D units.  |
|**Set Camera Far Distance**| Set The furthest distance an object will be drawn in 2D units. | - **Far** _number_ = `32000`: The furthest distance an object will be drawn in 2D units.  |
| |**Canvas 3D**| |
|**Set Canvas Order**| Put the 3D canvas in front or behind the 2D canvas. | - **Canvas Order** _combo_: If the 3D canvas will be in front or behind the 2D canvas.  **Options**: (`3D In Front`, `3D Behind`) |
|**Set Canvas Sizing**| Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout. | - **Canvas Sizing** _combo_: The canvas size behavior.  **Options**: (`In sync with Screen`, `Use Object Size`) |
|**Set Canvas Positioning**| Keep the 3D canvas at the top-left or use the object's position. | - **Canvas Positioning** _combo_: The canvas position behavior.  **Options**: (`Top-Left`, `Use Object Position`) |
|**Set Pixels Per 3D Unit**| Set the Number of 2D pixels per 3D unit, used for 2D to 3D distances translation. | - **Pixels Per 3D Unit** _number_ = `32`: Number of 2D pixels per 3D unit  |
| |**Ambient Light**| |
|**Set The Ambient light Color**| Set the Ambient light Color. | - **Ambient light Color** _string_ = `"#ffffff"`: Ambient light color in CSS-style string  |
|**Set The Ambient Light Intensity**| Set How bright is the ambient light. | - **Ambient light Intensity** _number_ = `1.5`: How bright is the ambient light  |
|**Set The Ambient light Color From Number**| Set the Ambient light Color. | - **Ambient light Color** _string_ = `rgb(255, 255, 255)`: Ambient light color From Number  |
| |**Fog**| |
|**Set Fog Type**| Set The Fog Type. | - **Fog Type** _combo_: The Type of Fog, use None to have no fog at all.  **Options**: (`None`, `Linear`, `Exponential Squared`) |
|**Set Fog Color**| Set The Fog Color. | - **Fog Color** _string_ = `"#ffffff"`: Fog color in CSS-style string  |
|**Set Density**| Defines how fast the fog will grow dense. Only applies on Exponential Squared Fog | - **Fog Density** _number_ = `0.06`: How fast the fog will grow dense.  |
|**Set Fog Near**| Set The Fog Near Distance. Only applies for Linear Fog. | - **Fog Near Distance** _number_ = `3.2`: Distance in 2D units.  |
|**Set Fog Far**| Set The Fog Far Distance. Only applies for Linear Fog. | - **Fog Far Distance** _number_ = `300`: Distance in 2D units.  |
|**Set Fog Color From Number**| Set The Fog Color. | - **Fog Color** _number_ = `rgb(255, 255, 255)`: Fog color From Number  |
| |**Scene**| |
|**Set Scene Background Color**| Set The Scene Background Color. | - **Scene Background Color** _string_ = `"#ffffff"`: Color in CSS-style string  |
|**Set Scene Background Color From Number**| Set The Scene Background Color. | - **Scene Background Color** _number_ = `16777215`: Color using a number  |

## Expressions

| Name | Type | Description | Parameters |
|------|------|-------------|------------|
| | |**Canvas 3D**| |
|**Canvas Order**<br/><small>**Usage:** `SimpleThree.CanvasOrder`</small>|`number`| The 3D canvas in front or behind the 2D canvas. 0=3D In Front, 1=3D Behind |  |
|**Canvas Sizing**<br/><small>**Usage:** `SimpleThree.CanvasSizing`</small>|`number`| Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout. 0=In sync with Screen, 1=Use Object Size |  |
|**Canvas Positioning**<br/><small>**Usage:** `SimpleThree.CanvasPositioning`</small>|`number`| Keep the 3D canvas at the top-left or use the object's position. 0=Top-Left, 1=Use Object Position |  |
|**Hotspot X**<br/><small>**Usage:** `SimpleThree.HotspotX`</small>|`number`| The location of the hot spot in the object. |  |
|**Hotspot Y**<br/><small>**Usage:** `SimpleThree.HotspotY`</small>|`number`| The location of the hot spot in the object. |  |
|**Pixels Per 3D Unit**<br/><small>**Usage:** `SimpleThree.PixelsPer3DUnit`</small>|`number`| Number of 2D pixels per 3D unit, used for 2D to 3D distances translation |  |
| | |**Ambient Light**| |
|**Ambient light Color**<br/><small>**Usage:** `SimpleThree.AmbientLightColor`</small>|`number`| Ambient light color in RGB format |  |
|**Ambient light Intensity**<br/><small>**Usage:** `SimpleThree.AmbientLightIntensity`</small>|`number`| How bright is the light |  |
| | |**Camera**| |
|**Field Of View (FOV)**<br/><small>**Usage:** `SimpleThree.Fov`</small>|`number`| How wide is the field of view of the camera in degrees. |  |
|**Near**<br/><small>**Usage:** `SimpleThree.Near`</small>|`number`| The closest distance an object will be drawn in 2D units. |  |
|**Far**<br/><small>**Usage:** `SimpleThree.Far`</small>|`number`| The furthest distance an object will be drawn in 2D units. |  |
| | |**Fog**| |
|**Fog Type**<br/><small>**Usage:** `SimpleThree.FogType`</small>|`number`| The Fog Type. |  |
|**Fog Color**<br/><small>**Usage:** `SimpleThree.FogColor`</small>|`number`| The Fog Color. |  |
|**Density**<br/><small>**Usage:** `SimpleThree.FogDensity`</small>|`number`| How fast the fog will grow dense. Only applies on Exponential Squared Fog |  |
|**Fog Near**<br/><small>**Usage:** `SimpleThree.FogNear`</small>|`number`| The Fog Near Distance. Only applies for Linear Fog. |  |
|**Fog Far**<br/><small>**Usage:** `SimpleThree.FogFar`</small>|`number`| The Fog Far Distance. Only applies for Linear Fog. |  |
| | |**Scene**| |
|**Scene Background Color**<br/><small>**Usage:** `SimpleThree.SceneBackgroundColor`</small>|`number`| The Scene Background Color. |  |