// ==UserScript==
// @name        evepraisal search input auto-focus
// @namespace   dante tsaronis
// @description Puts cursor into the evepraisal.com search bar.
// @include     http://evepraisal.com/*
// @version     1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant          GM_addStyle
// ==/UserScript==

if ($)
{
  $('textarea#raw_textarea').focus();
}
