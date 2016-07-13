$(document).ready(function () {
    var url = 'https://raw.githubusercontent.com/Snpefk/books/gh-pages/qst.xml';

    $.get(url, function (data) {
        var xml = $.parseXML(data);
        var root = xml.children[0];
        initialize(root);
    });

    function print(text) {
        $('body').append('<p>' + text + '</p>');
    }

    function initialize(root) {
        print(root.getAttribute('title'));
        getChildren(root);
    }
    
    function getChildren(node) {
        var children = node.children;

        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            $('body').append('<p>' + (i + 1) + " - " + title + '</p>');
        }
    }

    
});

