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
            case 'node':
                return 'btn-default';
            case 'true':
                return 'btn-success';
            case 'false':
                return 'btn-danger';
            case 'maybe':
                return 'btn-info';
            case 'book':
                return 'btn-primary';
            default:
                return 'btn-default';
        }
    }

    function print(text, type) {
        if (type == 'node') {
            
        }
        var color = "btn " + getColor(type);
        var button = document.createElement('button');
        button.className = color+' btn-block';
        button.innerHTML = text;
        button.setAttribute('type', 'button');
        $content.append(button);
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

