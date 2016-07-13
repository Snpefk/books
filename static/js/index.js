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

    function getColor(type) {
        switch (type) {
            case 'root':
                return '#3266CC';
            case 'node':
                return 'black';
            case 'true':
                return 'green';
            case 'false':
                return 'red';
            case 'maybe':
                return 'blue';
            case 'book':
                return 'LightSlateGrey';
            default:
                return 'black';
        }
    }

    function print(text, type) {
        var color = getColor(type);
        var attribute = "style='color:" + color + ";'";
        $content.append('<p ' + attribute + '>' + text + ' ' + '</p>');
    }

    function clear() {
        $content.html('');
    }

    function clearInput() {
        $input.val('');
    }

    function initialize(root) {
        print(root.getAttribute('title'), root.tagName);
        getChildren(root);
    }

    function getChildren(node) {
        var children = node.children;

        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            var type = children[i].tagName == 'answer' ? children[i].getAttribute('type') : children[i].tagName; // уберу
            var text = (i + 1) + ' - ' + title;
            print(text, type);
        }
    }

    $input.keypress(function (e) {
        if (e.keyCode == 13) {
            var selectedNumber = this.value;
            root = root.children[selectedNumber - 1];

            clear();
            clearInput();
            getChildren(root);
        }
    })


});

