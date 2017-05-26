import { View } from "backbone.marionette";
import _ from "underscore";
import Styles from "./stylesheet.scss";

class Toast extends View {

    /**
     * When the user clicks the toast, trigger an event for any parent views
     *
     * @param e {Event} The click event
     */
    onClick (e) {
        this.trigger("click:toast", e);
    }

    /**
     * Attach the HTML
     *
     * @param html {string} The current HTML (String in this case)
     * @return {Toast} This
     * @override
     */
    attachElContent(html) {
        this.$el.fadeOut(_ => {
            let className = `${Styles.toast} toast--root`;

            if (this.options.className !== undefined) {
                className += ` ${this.options.className}`;
            }

            this.$el.addClass(className);
            this.$el.html(html);
            this.$el.on("click", this.onClick.bind(this));
            this.$el.fadeIn();
        });

        return this;
    }

    /**
     * Run a quick render to inject the span tag we'll update later.
     */
    template () {
        return _.template(`<span id='message'></span>`)();
    }

    /**
     * Show the element, takes an object with a message and a timeout as the param.
     *
     * @param message {string} The message to show
     * @param timeout {Number} The time before it times out (Will default to 4500)
     */
    show ({ message, timeout }) {
        let time = timeout;

        if (time === undefined) {
            time = 4500;
        }

        this.$el.find("#message").text(message);
        this.$el.addClass(`${Styles.slideInFromLeft}`);

        window.setTimeout(e => { this.$el.removeClass(`${Styles.slideInFromLeft}`) }, time);
    }

    /**
     * When the view is about to be destroyed, kill event listeners.
     */
    onDestroy () {
        this.$el.off("click");
    }

}

export default Toast;