// ==UserScript==
// @name        eve-central jita targeting
// @namespace   dantetsaronis
// @description filters eve-central market browser to the Jita system automatically
// @include     https://eve-central.com/home/quicklook.html?typeid=*
// @exclude     https://eve-central.com/home/quicklook.html?typeid=*&usesystem=*
// @version     1
// ==/UserScript==

window.location = window.location + "&usesystem=30000142";

