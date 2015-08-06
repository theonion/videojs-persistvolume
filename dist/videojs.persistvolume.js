(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
//cookie functions from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
var
  vjs = (typeof window !== "undefined" ? window.videojs : typeof global !== "undefined" ? global.videojs : null),
  getCookieItem = function (sKey) {
    if (!sKey || !hasCookieItem(sKey)) {
      return null;
    }
    var reg_ex = new RegExp(
      "(?:^|.*;\\s*)" +
      window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
    );
    return window.unescape(document.cookie.replace(reg_ex, "$1"));
  },

  setCookieItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toGMTString();
          break;
      }
    }
    document.cookie =
      window.escape(sKey) + "=" +
      window.escape(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
  },

  hasCookieItem = function (sKey) {
    return (new RegExp(
      "(?:^|;\\s*)" +
      window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\=")
    ).test(document.cookie);
  },

  hasLocalStorage = function () {
    try {
      window.localStorage.setItem('persistVolume', 'persistVolume');
      window.localStorage.removeItem('persistVolume');
      return true;
    } catch (e) {
      return false;
    }
  },
  getStorageItem = function (key) {
    return hasLocalStorage() ? window.localStorage.getItem(key) : getCookieItem(key);
  },
  setStorageItem = function (key, value) {
    return hasLocalStorage() ? window.localStorage.setItem(key, value) : setCookieItem(key, value, Infinity, '/');
  },

  extend = function (obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  defaults = {
    namespace: ""
  },

  volumePersister = function (options) {
    var player = this;
    var settings = extend({}, defaults, options || {});

    var key = settings.namespace + '-' + 'volume';
    var muteKey = settings.namespace + '-' + 'mute';

    player.on("volumechange", function () {
      setStorageItem(key, player.volume());
      setStorageItem(muteKey, player.muted());
    });

    var persistedVolume = getStorageItem(key);
    if (persistedVolume !== null) {
      player.volume(persistedVolume);
    }

    var persistedMute = getStorageItem(muteKey);
    if (persistedMute !== null) {
      player.muted('true' === persistedMute);
    }
  };

vjs.plugin("persistvolume", volumePersister);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
