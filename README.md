# SimpleThree
**Type:** Plugin

Creates a secondary canvas to render Three JS objects. It provides basic settings for Ambient Light and Fog.

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
| | |**Fog**| |
|**Fog Type**<br/><small>**Usage:** `SimpleThree.FogType`</small>|`number`| The Fog Type. |  |
|**Fog Color**<br/><small>**Usage:** `SimpleThree.FogColor`</small>|`number`| The Fog Color. |  |
|**Density**<br/><small>**Usage:** `SimpleThree.FogDensity`</small>|`number`| How fast the fog will grow dense. Only applies on Exponential Squared Fog |  |
|**Fog Near**<br/><small>**Usage:** `SimpleThree.FogNear`</small>|`number`| The Fog Near Distance. Only applies for Linear Fog. |  |
|**Fog Far**<br/><small>**Usage:** `SimpleThree.FogFar`</small>|`number`| The Fog Far Distance. Only applies for Linear Fog. |  |
| | |**Scene**| |
|**Scene Background Color**<br/><small>**Usage:** `SimpleThree.SceneBackgroundColor`</small>|`number`| The Scene Background Color. |  |