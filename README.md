Jinx-Engine
==========
JavaScript Game Engine / Infographic Engine

Overview
========
Jinx-Engine is a scalable Game Engine build 100% in JavaScript. Used to build interactive games and info graphics for websites. No flash needed. This engine uses HTML5 canvas tags to render the display. 

[![Click here to lend your support to Jinx-Engine and make a donation at pledgie.com!](https://pledgie.com/campaigns/32611.png?skin_name=chrome)](https://pledgie.com/campaigns/32611)


Quickstart
==========


Requirements
============
 - ObjectiveJS libs - https://github.com/Patrick-W-McMahon/ObjectiveJS
 

Installation
============
Include the engine file (JinxEngine.js) along with any system components you may want to use (found in the systems folder).

Features
========

No flash
--------------
This is a full HTML5 compatable game engine. setup a canvas tag and point the engine to it and let it do its work.

Multi-Sound channel
--------------
Handles as many sound effects and music tracks as needed.

Keyboard and Mouse support
--------------
Full Keyboard and Mouse support. No heavy caluclations for identifying where the mouse is, the engine takes care of that for you. Passes the x,y of the mouse pointer to the object based on a 0,0 at top left of the canvas. Does your mouse have extra buttons don't worry it support unlimited mouse buttons.

Event System
--------------
Full Event system to send and receave events for all game objects. The event stack makes no assumptions on what your event would be letting you pass any data you need to be consumed by other game objects. You will never need to have two game objects talk directly to each other, just simply set up events and respond to events.

Object Management
--------------
Object Management is highly scalable so you can make any 2D game or info graphic you want. The only limitation is you. Try running 10,000 objects in the engine you will be happy to see it runs just fine.

Collision Detection
--------------
Objects have access to base collition Detection built right into the engine.

Scene Management
--------------
For games with many screens and states use scenes to break your game up into sections. Want a game with a start menu make a scene for the start menu and a scene for your great 2d game. Have a big game with many menus and different types of graphical states use scenes. A scene is a container that is loaded in with all the game objects and data it needs to run. When switching scenes you can pass data to the new scene or set up objects at the game engine level (outside of the scene) that will persist as long as the engine is running. 

Dynamic Pixel Ratio
--------------
Don't worry about the pixel density of the client screen the engine will handle it.

License
=======
The MIT License (MIT)
