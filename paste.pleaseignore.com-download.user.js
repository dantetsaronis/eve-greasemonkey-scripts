// ==UserScript==
// @name         paste.pleaseignore.com download
// @namespace    dantetsaronis
// @version      0.0.1
// @author       Dante Tsaronis
// @match        https://paste.pleaseignore.com/index.php?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let text = document.getElementById('paste').innerText;
    let header = document.querySelector('body > div.container > div.style-box > div.header');
    let button = document.createElement('a');
    button.classList.add('block', 'btn');
    button.setAttribute('href', 'data:text/plain;charset=utf-8;base64,' + btoa(text));
    button.setAttribute('download', window.location.hostname + ' ' + new URLSearchParams(document.location.search.substring(1)).get('id') + '.txt');
    button.innerText = '📥 Download';
    header.appendChild(button);
})();
