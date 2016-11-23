// ==UserScript==
// @name        navigate to exact match
// @namespace   dantetsaronis
// @include     https://eve-central.com/home/typesearch.html?search=*
// @version     1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant          GM_addStyle
// ==/UserScript==

// This first bit, outside the jQuery block, is shamelessly copied and pasted from Node.js's querystring lib.

var QueryString = {};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function charCode(c) {
  return c.charCodeAt(0);
}

// a safe fast alternative to decodeURIComponent
QueryString.unescapeBuffer = function(s, decodeSpaces) {
  var out = []; //new Buffer(s.length);
  var state = 'CHAR'; // states: CHAR, HEX0, HEX1
  var n, m, hexchar;

  for (var inIndex = 0, outIndex = 0; inIndex <= s.length; inIndex++) {
    var c = s.charCodeAt(inIndex);
    switch (state) {
      case 'CHAR':
        switch (c) {
          case charCode('%'):
            n = 0;
            m = 0;
            state = 'HEX0';
            break;
          case charCode('+'):
            if (decodeSpaces) c = charCode(' ');
            // pass thru
          default:
            out[outIndex++] = c;
            break;
        }
        break;

      case 'HEX0':
        state = 'HEX1';
        hexchar = c;
        if (charCode('0') <= c && c <= charCode('9')) {
          n = c - charCode('0');
        } else if (charCode('a') <= c && c <= charCode('f')) {
          n = c - charCode('a') + 10;
        } else if (charCode('A') <= c && c <= charCode('F')) {
          n = c - charCode('A') + 10;
        } else {
          out[outIndex++] = charCode('%');
          out[outIndex++] = c;
          state = 'CHAR';
          break;
        }
        break;

      case 'HEX1':
        state = 'CHAR';
        if (charCode('0') <= c && c <= charCode('9')) {
          m = c - charCode('0');
        } else if (charCode('a') <= c && c <= charCode('f')) {
          m = c - charCode('a') + 10;
        } else if (charCode('A') <= c && c <= charCode('F')) {
          m = c - charCode('A') + 10;
        } else {
          out[outIndex++] = charCode('%');
          out[outIndex++] = hexchar;
          out[outIndex++] = c;
          break;
        }
        out[outIndex++] = 16 * n + m;
        break;
    }
  }

  return out.slice(0, outIndex - 1);
};

QueryString.unescape = function(s, decodeSpaces) {
  var buf = QueryString.unescapeBuffer(s, decodeSpaces);
  var result = "";
  buf.forEach(function(val,idx,arr){result+=String.fromCharCode(val);});
  return result;
};

// Parse a key=val string.
QueryString.parse = QueryString.decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (!hasOwnProperty(qs, 'length') || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && options.maxKeys) {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = null;
    }

    try {
      k = kstr === null ? null : decodeURIComponent(kstr);
      v = vstr === null ? null : decodeURIComponent(vstr);
    } catch (e) {
      k = kstr === null ? null : QueryString.unescape(kstr, true);
      v = vstr === null ? null : QueryString.unescape(vstr, true);
    }

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

 
if ($) {
  var qs = window.location.search.substr(1); // strip leading question mark
  var search = QueryString.decode(qs)["search"];
  if (search !== null && search !== "" && !Array.isArray(search)) {
    var links = $('div#bodyText > p > a[href^="quicklook.html?typeid="]').filter(function(){ return $.trim($(this).text()).toLowerCase() === search.toLowerCase(); });
    if (links.length > 0)
    {
      var link = links.first();
      var href = link.attr("href");
      if (href) {
        window.location = href;
      }
    }
  }
}

