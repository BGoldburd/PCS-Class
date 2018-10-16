'use strict';

import $ from 'jquery';

const name = $('#name');
const result = $('#result');
const theButton = $('#theButton');

theButton.click(() => {
    result.text(name.val());
});