videojs-persistvolume
========================

A plugin for Video.js that saves user's volume setting using [localStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage), but falls back to cookies if necessary.

###Usage
Include the plugin:

```html
<script src="videojs.persistvolume.js"></script>
```

Add `persistvolume` to the `plugins` object with one option, `namespace`.

    plugins: {
	    persistvolume: {
		    namespace: 'So-Viral-So-Hot'
	    }
    }

