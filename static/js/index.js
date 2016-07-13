$(document).ready(function () {
    var url = 'https://raw.githubusercontent.com/Snpefk/books/gh-pages/static/qst.xml',
        root,
        $content = $('#content'),
        $input = $('input');

    $.get(url, function (data) {
        var xml = $.parseXML(data);
        root = xml.children[0];
        initialize(root);
    });

    function print(text) {
        $content.append('<p>' + text + '</p>');
    }

    function clear() {
        $content.html('');
    }

    function clearInput() {
        $input.val('');
    }

    function initialize(root) {
        print(root.getAttribute('title'));
        getChildren(root);
    }

    function getChildren(node) {
        var children = node.children;

        clear();
        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            var text = (i + 1) + ' - ' + title;
            print(text);
        }
    }

    $('input').keypress(function (e) {
        if (e.keyCode == 13) {
            var selectedNumber = this.value;
            root = root.children[selectedNumber - 1];
            getChildren(root);
            clearInput();

        }
    })


});

