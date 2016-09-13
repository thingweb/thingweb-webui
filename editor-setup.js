/**
 * This file is not here to stay!!!
 * This is a temporary kludge to get stuff rolling for TPAC, the editor will be a cleaner directive later on
 */

function loadDefinition(url, name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(xhttp.responseText, name ? name : url);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

var promise_dts = "";

function loadWoTEditor() {
    if (!angular.isDefined(window.monaco))
        editorSetup();
    else
        placeEditor();
}

function placeEditor() {
    var elm = document.getElementById('container');
    if (elm === null) {
        console.warn("WTF? why is my dom not there on re-activate");
    } else {
        return window.woteditor = monaco.editor.create(elm, {
            value: '//enter the script to run here\n',
            language: 'javascript'
        });
    }
}

function loadDefinitions() {
    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES6,
        allowNonTsExtensions: true
    });
    loadDefinition('wot-all.d.ts');
    placeEditor();
}

function editorSetup() {
    require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

    if (!angular.isDefined(window.monaco)) {
        require(['vs/editor/editor.main'], loadDefinitions);
    } else {
        loadDefinitions();
    }
}