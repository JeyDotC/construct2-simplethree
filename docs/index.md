![SimpleThree](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/PluginIcon.png)
![SimpleThree_camera](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree_camera/master/PluginIcon.png)
![SimpleThree_wall](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree_wall/master/PluginIcon.png)

# Overview

SimpleThree is a series of add-ons for Construct 2 that will allow you to render your regular layout in 3D using ThreeJs (hence the name). It is intended mostly for Doom-like or Top-Down perspectives.

> **Note:** This is not a full-fledged 3D solution, is just a way to display regular Construct 2 objects in a 3D environment.

 ![Screen shot](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/docs/img/Screenshot.png)

# Installation

Download and install these add-ons as you'd do with any regular Construct2 add-on:

* ![SimpleThree](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/PluginIcon.png) **[SimpleThree](https://www.construct.net/en/construct-2/addons/410/simplethree)**: Creates a secondary canvas to render Three JS objects.
    * ![SimpleThree_camera](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree_camera/master/PluginIcon.png) **[SimpleThree_Camera](https://www.construct.net/en/construct-2/addons/411/simplethreecamera)**: Represents a 3D Camera.
    * ![SimpleThree_wall](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree_wall/master/PluginIcon.png) **[SimpleThree_Wall](https://www.construct.net/en/construct-2/addons/412/simplethreewall)**: Converts a tiled background in a 3D box or a plane. 
    * SimpleThree_Sprite: _Comming soon_
    
> Instructions on how to install your downloaded addons can be found [in the construct.net site](https://www.construct.net/en/construct-2/manuals/construct-2/installing/third-party-addons#internalH1Link0).

# Quick Start

> **NOTE:** This quick guide assumes you already know the basics of Construct2, like creating a project, adding object types and behaviors.

Create a standard Construct2 project, and make sure that **all the layers are transparent**.

![Set transparent layers](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/docs/img/1-Make-layer-transparent.png)

Then add a **SimpleThree** object type to the layout. Don't worry about the size or position, they will be automatically adjusted on runtime.

![Add SimpleThree instance](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/docs/img/2-Add-SimpleThree-Object.png)

Create a new **Sprite** that will be your camera, and add the **SimpleThree_Camera** behavior to it. 

![Add SimpleThree instance](https://raw.githubusercontent.com/JeyDotC/construct2-simplethree/master/docs/img/3-Add-SimpleThree_Camera-Behavior.png)

By this point you should be able to see the background color, which is black by default. You can try setting any other color at the _Scene Background Color_ property of the **SimpleThree** object.

Now, let's create a new **Tiled Background** object type and add the  



