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
|**Set Camera position from 2D coordinates**| Set the camera position using 2D coordinates. | - **Camera X** (number): The capmera X in 2D Pixels.<br />- **Camera Y** (number): The camera Y in 2D Pixels. (Will be translated to camera's Z axis.)<br />- **Camera Elevation** (number): The camera elevation in 2D Pixels. (Will be translated to camera's Y axis.) |
|**Set Camera angle from 2D angle**| Set Camera angle using 2D angle in degrees. This gets translated into the camera's Y angle in radians. | - **Angle** (number): The camera angle in degrees. (Will be translated to camera's Y axis angle in Radians.) |