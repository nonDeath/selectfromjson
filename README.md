# selectfromjson

## Basic HTML select

```HTML
<select name="my_select1" id="my_select1" class="any_decoration" data-url="resouce-uri" data-autoload="true" data-value="id" data-text="nombre">
 </select>
```
*Options*

- url: the url from the resorce to load the json.
- autoload: true if the select are filled on page load.
- value: key of json data to be used for fill the option's value in the select.
- value: key of json data to be used for fill the option's text in the select.
- parent: jquery selector of the select parent to be binded on change it.

## Basic js init

```js
$("#my_select1").jsonselect({
    events: {
        success: function() { console.log('success fired!') }
    }
});
```

*Options*

- selected: unused in this version.
- empty_text: Enpty text to show, by default is 'Select an option'.

*Events*

- succes: closure to manage the succes event that exposes the plugin. Only fired when the ajax request is successful.
