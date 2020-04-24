# SimpleThree

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
|**Near**| _float_ | The closest distance an object will be drawn in 3D units. Default value: `0.1` |  |
|**Far**| _float_ | The furthest distance an object will be drawn in 3D units. Default value: `1000` |  |

# ACES


## Actions

| Name | Description | Parameters |
|------|-------------|------------|
| |**Camera**| |
|**Set Camera position from 2D coordinates**| Set the camera position using 2D coordinates. | - **Camera X** _number_: The capmera X in 2D Pixels. <br />- **Camera Y** _number_: The camera Y in 2D Pixels. (Will be translated to camera's Z axis.) <br />- **Camera Elevation** _number_ = `32`: The camera elevation in 2D Pixels. (Will be translated to camera's Y axis.)  |
|**Set Camera angle from 2D angle**| Set Camera angle using 2D angle in degrees. This gets translated into the camera's Y angle in radians. | - **Angle** _number_: The camera angle in degrees. (Will be translated to camera's Y axis angle in Radians.)  |
|**Set Field Of View (FOV)**| How wide is the field of view of the camera in degrees. | - **Field Of View** _number_ = `75`: The Field Of View (FOV) in degrees. (Will be translated to camera's Y axis angle in Radians.)  |
|**Set Camera Near Distance**| Set The closest distance an object will be drawn in 3D units. | - **Near** _number_ = `0.1`: The closest distance an object will be drawn in 3D units.  |
|**Set Camera Far Distance**| Set The furthest distance an object will be drawn in 3D units. | - **Far** _number_ = `1000`: The furthest distance an object will be drawn in 3D units.  |
| |**Canvas 3D**| |
|**Set Canvas Order**| Put the 3D canvas in front or behind the 2D canvas. | - **Canvas Order** _combo_: If the 3D canvas will be in front or behind the 2D canvas.  **Options**: (`3D In Front`, `3D Behind`) |
|**Set Canvas Sizing**| Automatically keep the 3D canvas size to be the same as the 2D canvas or use the object's size as set in the layout. | - **Canvas Sizing** _combo_: The canvas size behavior.  **Options**: (`In sync with Screen`, `Use Object Size`) |
|**Set Canvas Positioning**| Keep the 3D canvas at the top-left or use the object's position. | - **Canvas Positioning** _combo_: The canvas position behavior.  **Options**: (`Top-Left`, `Use Object Position`) |
|**Set Pixels Per 3D Unit**| Set the Number of 2D pixels per 3D unit, used for 2D to 3D distances translation. | - **Pixels Per 3D Unit** _number_ = `32`: Number of 2D pixels per 3D unit  |
| |**Ambient Light**| |
|**Set The Ambient light Color**| Set the Ambient light Color. | - **Ambient light Color** _string_ = `#ffffff`: Ambient light color in CSS-style string  |
|**Set The Ambient Light Intensity**| Set How bright is the ambient light. | - **Ambient light Intensity** _number_ = `1.5`: How bright is the ambient light  |