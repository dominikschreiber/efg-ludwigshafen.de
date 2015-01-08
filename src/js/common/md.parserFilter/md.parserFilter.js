'use strict';

angular.module('md.parserFilter', [
    'ng'
])

.filter('parser', function($filter) {
    var lineKeywords = {
        '# ': '<h1>',
        '## ': '<h2>',
        '### ': '<h3>',
        '> ': '<blockquote>',
        '- ': '<ul><li>',
        '* ': '<ul><li>'
    };
    
    function isDefined(line) { return !_.isUndefined(line); }
    
    function parseLineContent(content) {
        return content;
    }
    
    function parseLine(line) {
        return _.reduce(_.pairs(lineKeywords), function(keywordTag, prev) {
            if (line.indexOf(keywordTag[0]) === 0) {
                return keywordTag[1] +
                    parseLineContent(line.substring(keywordTag[0].length)) +
                    createClosingTag(keywordTag[1]);
            }
            return prev;
        }, '');
    }
    
    function createClosingTag(openingTag) {
        return _.chain(openingTag.split('>'))
            .filter(isDefined)
            .map(function(tag) { return tag + '>'; })
            .reverse()
            .value()
            .join('')
            .replace(/</g, '</');
    }
    
    function parse(input) {
        _.chain(input.split('\n'))
            .filter(isDefined)
            .map(parseLine)
            .value()
            .join('')
            .replace('</ul><ul>', '');
    }
    
    return function(input) {
        return $filter('trustHtml')(parse(input));
    };
});