(function(){
    //cookie functions from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    function getCookieItem(sKey) {
        if (!sKey || !hasCookieItem(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    }
    function setCookieItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
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
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    }
    function hasCookieItem(sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    //localStorage getter and setter
    function getStorageItem(key){
        return localStorage.getItem(key);
    }
    function setStorageItem(key, value){
        localStorage.setItem(key, value);
        return true
    }

    function onVolumeChange(){
        this.persistVolume.setVolume(this.volume());
    }

    videojs.plugin('persistVolume', function(options){
        var hasLocalStorage  = (function(){
            try {
                localStorage.setItem('persistVolume', 'persistVolume');
                localStorage.removeItem('persistVolume');
                return true;
            } catch(e) {
                return false;
            }
        }());
        var key = this.options().plugins.persistVolume.namespace + '-' + 'volume';
        this.persistVolume.setVolume = function(value){
            return hasLocalStorage ? setStorageItem(key, value) : setCookieItem(key, value, Infinity, '/');
        }
        this.persistVolume.getVolume = function(){
            return hasLocalStorage ? getStorageItem(key) : getCookieItem(key);
        }

        this.on("volumechange", onVolumeChange);
        var persistedVolume = this.persistVolume.getVolume();
        if(persistedVolume !== null){
            this.volume(persistedVolume);
        }
    })
})();
