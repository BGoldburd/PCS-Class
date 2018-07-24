
var pcs = (function () {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    function getCss(elem, property) {
        return elem.style[property];
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function wrap (id) {
        const elem = get(id);
        const elemData = {};

        return {
            /*setCss: function (property, value) {
                setCss(elem, property, value)
                //elem.style[property] = value;
                return this;
            },
            getCss: function (property) {
                getCss(elem, property);
            },*/
            css: function (property, value) {
                if (arguments.length < 2) {
                    return getCss(elem, property);
                }
                setCss(elem, property, value);
                return this;
            },
            hide: function () {
                setCss(elem, 'display', 'none');
            },
            show: function () {
                setCss(elem, 'display', 'block');
            },
            click: function (callback) {
                elem.addEventListener('click', callback);
                return this;
            },
            changeColors: function (miliseconds) {
                miliseconds = miliseconds || 500;
                setCss(elem, 'color', getRandomColor());
                setInterval(function(){
                    setCss(elem, 'color', getRandomColor());
                }, miliseconds);
            },
            data: function (key, value) {
                if (arguments.length < 2) {
                    return elemData[key];
                }
                elemData[key] = value;
            },
            viewData: function () {
                return elemData;
            }
        };
    }
    
    return wrap;
}());