# Clean Architecture Flutter

This VSCode extension creates the boilerplate code for implementig my version of the Reso Coder clean architecture proposal for Flutter projects.

You can check the original version through this tutorial:
https://resocoder.com/2019/08/27/flutter-tdd-clean-architecture-course-1-explanation-project-structure/

## Folder Structure

The folder structure is the folowing:
* <b>/core:</b> everithing on which every feature depends (es: basic interfaces, modules, interceptors..)
* <b>/shared:</b> something used in two or more features (es: shared widgets, shared features like user retrieving..)
* <b>/features:</b> every feature in the project goes here


## Commands
* <b>Generate Core:</b> generate the boilerplate for the core and shared feature. Every feature depends on the core folder
* <b>New Feature:</b> generate the boilerplate code for a new feature. 
* <b>Expand Feature:</b> add to an existing feature the boilerplate code for a new functionality (es: for a feature are needed more api calls)

## How to use the commands

* For <b>Generate Code</b> and <b>New Feature</b>: select lib folder
* For <b>Expand Feature:</b> select the feature you want to expand
