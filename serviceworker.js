'use strict';

importScripts('serviceworker-cache-polyfill.js');
//importScripts('babel-core/browser.js');
//importScripts('es6-module-loader/es6-module-loader-dev.src.js');
//
//importScripts('babelsberg/standalone/prototype.js');
//importScripts('babelsberg/standalone/minilively.js');
//
//    <!-- // cop.Layers -->
//importScripts('babelsberg/cop/Layers.js');
//
//    <!-- // ometa.lively -->
//importScripts('babelsberg/ometa/lib.js');
//importScripts('babelsberg/ometa/ometa-base.js');
//importScripts('babelsberg/ometa/parser.js');
//importScripts('babelsberg/ometa/ChunkParser.js');
//importScripts('babelsberg/ometa/bs-ometa-compiler.js');
//importScripts('babelsberg/ometa/bs-js-compiler.js');
//importScripts('babelsberg/ometa/bs-ometa-js-compiler.js');
//importScripts('babelsberg/ometa/bs-ometa-optimizer.js');
//importScripts('babelsberg/ometa/lk-parser-extensions.js');
//    <!-- // lively.Ometa -->
//importScripts('babelsberg/ometa/Ometa.js');
//    <!-- // lively.Interpreter -->
//importScripts('babelsberg/jsinterpreter/generated/Nodes.js');
//importScripts('babelsberg/jsinterpreter/generated/Translator.js');
//importScripts('babelsberg/jsinterpreter/LivelyJSParser.js');
//importScripts('babelsberg/jsinterpreter/Parser.js');
//importScripts('babelsberg/jsinterpreter/Meta.js');
//importScripts('babelsberg/jsinterpreter/Rewriting.js');
//importScripts('babelsberg/jsinterpreter/Interpreter.js');
//    <!-- // Babelsberg/js -->
//importScripts('babelsberg/babelsberg/core_ext.js');
//importScripts('babelsberg/babelsberg/constraintinterpreter.js');
//importScripts('babelsberg/standalone/test_harness.js');
//    <!-- // src transform -->
//importScripts('babelsberg/babelsberg/uglify.js');
//importScripts('babelsberg/babelsberg/src_transform.js');

// Loaders
importScripts('loader/default.js');
importScripts('loader/eval.js');

// Transformers
importScripts('transformer/identity.js');
importScripts('transformer/logappend.js');

console.log('Service Worker: File Start');

self.addEventListener('install', function(event) {
    console.log('Service Worker: Install');
});

self.addEventListener('fetch', function(event) {
    console.log('Service Worker: Fetch', event.request, event.request.url);

    var response = parseEvent(event)
        .then(applyLoaders)
        .then(applyTransformers);

    event.respondWith(response);
});

function parseEvent(event) {
    return new Promise(function(resolve, reject) {
        resolve(event.request);
    });
}

function applyLoaders(request) {
    console.log('Service Worker: Loader', request.url);

    var response;

    var evalScript = new EvalLoader();
    if(evalScript.match(request)) {
        response = evalScript.transform(request);
    } else {
        response = (new DefaultLoader()).transform(request);
    }

    return response;
}

function applyTransformers(response) {
    console.log('Service Worker: Transformer', response, response.url);

    var log = new LogAppend();
    if(log.match(response)) {
        return log.transform(response);
    }

    return (new Identity()).transform(response);
}

console.log('Service Worker: File End');