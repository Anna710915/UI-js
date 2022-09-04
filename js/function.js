"use strict"

export const fn = {
    debounce : function (callback, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout( callback, delay );
        }
    },
}