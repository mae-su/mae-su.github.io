---
backgroundcolor: '#101010'
fontcolor: '#d3d3d3'
linkcolor: '#4b0533'
---

# cesiumNC docs

**welcome to the cesiumNC docs.** this is where i talk a lot about the overall development of a custom CNC machine.

let's start with the basics.

## what is this project?
my end goal is to build a toolchanging CNC machine that can mill aluminum and pick up other tools to perform other functions.

## how do you plan on doing it?
- [x] do research. lots of it.
- [ ] design a CAD model that fits the criteria for a nice, rigid machine. [currently at its fourth revision]
- [ ] build the motion system
    - [ ] x-axis
    - [ ] z-axis (rides the x-axis)
    - [ ] y-axis
- [ ] figure out a control system and electronics
- [ ] attach a spindle
- [ ] design and make a toolchanger

yeah, it's a bit of an ambitious project. this will take some time.

## what are the design constraints?
- a spindle should be able to completely clear out of the work area. if the spinde moves up and down against a column as traditional CNC mills do, the column takes up a large amount of potential build volume. the spindle being fixed to the column means that the part must be moving across both the x and y axes, severely limiting build volume and versatility of potential tools. to avoid this, the machine needs to resort to a fixed-gantry CNC router type setup. 
- machine needs to have a decently large z axis. 
- machine needs enough rigidity to withstand heavier operations such as milling aluminum without chattering or damaging itself.
- my wallet

anyways, i'm glad to have you along for the ride. i'll document here with future updates!