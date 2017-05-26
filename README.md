# Toast component

Basic toast component for marionette

## Usage

### Instantiation
Simply pass in an initialization option object with an optional className (To provide custom styling)

```js
import Toast from "@vokke/toast";

this.toast = new Toast({
    className: "helloWorld"
});
```

### Showing
Showing the toast, you just call .show() on it

```js
this.toast.show({
    message: "Hello world",
    timeout: 4500
});
```

### Events
The only event so far is a click on the whole toast, To bind to this, use the following.

```js
this.listenTo(this.toast, "click:toast", e => {
    console.log(e);
});

// or

this.toast.on("click:toast", e => {
    console.log(e);
});
```

## TODO
* Setup the build process