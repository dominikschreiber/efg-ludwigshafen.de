'use strict';

angular.module('md.parseMarkdownFilter', [
    'ng'
])

.filter('parseMarkdown', function($filter) {
    var lineKeywords = _.pairs({
        '# ': '<h1>',
        '## ': '<h2>',
        '### ': '<h3>',
        '> ': '<blockquote>',
        '- ': '<ul><li>',
        '* ': '<ul><li>'
    });
    
    function isDefined(line) { return line; }
    
    function parseLineContent(content) {
        return content;
    }
    
    function parseLine(line) {
        var html = _.reduce(lineKeywords, function(prev, keywordTag) {
            if (isDefined(line) && isDefined(keywordTag) && line.indexOf(keywordTag[0]) === 0) {
                return keywordTag[1] +
                    parseLineContent(line.substring(keywordTag[0].length)) +
                    createClosingTag(keywordTag[1]);
            }
            return prev;
        }, undefined);
        
        if (html !== undefined) {
            return html;
        } else {
            return '<p>' + parseLineContent(line) + '</p>';
        }
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
        return _.chain(input.split(/\n/g))
            .filter(isDefined)
            .map(parseLine)
            .value()
            .join('')
            .replace(/<\/ul><ul>/g, '')
            .replace(/<\/blockquote><blockquote>/g, '');
    }
    
    return function(input) {
        return $filter('trustHtml')(parse(input));
    };
});