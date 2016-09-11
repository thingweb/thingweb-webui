function loadDefinition(url, cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
           return cb(xhttp.responseText)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

var promise_dts = "";

function editorWithLib(libdef) {

    require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

    require(['vs/editor/editor.main'], function (blaaa) {
        // compiler options
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES6,
            allowNonTsExtensions: true
        });

        monaco.languages.typescript.javascriptDefaults.addExtraLib(libdef, 'wot.d.ts');

        window.woteditor = monaco.editor.create(document.getElementById('container'), {
            value: '//enter code here\n',
            language: 'javascript'
        });

        return window.woteditor;
    });
}

function loadWoTEditor() {
    return loadDefinition('wot-all.d.ts',editorWithLib)
}


