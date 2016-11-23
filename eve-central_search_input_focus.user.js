// ==UserScript==
// @name        eve-central search input focus
// @namespace   dante
// @include     https://eve-central.com/*
// @include     http://eve-central.com/*
// @version     1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant          GM_addStyle
// ==/UserScript==

if ($)
{
  $('input[name="search"]').focus();
}

