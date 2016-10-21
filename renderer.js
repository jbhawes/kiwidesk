// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//require("jquery-confirm");
const {ipcRenderer} = require('electron')

$(function() {
    console.log( "ready!" );
    $(".btn-black").on("click", function(){
        var val = $(this).data("btnid");
        console.log("click value: " + val);
        ipcRenderer.send('press-button', val);
    });

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
        $.confirm({
            title: 'Alert!',
            content: 'Simple alert!: ' + arg,
            theme: 'supervan',
            confirmButtonClass: 'btn-info',
            cancelButtonClass: 'btn-danger'
        });
    })
});