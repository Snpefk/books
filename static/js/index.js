$(document).ready(function () {
    var url = 'https://raw.githubusercontent.com/Snpefk/books/gh-pages/static/qst.xml',
        root,
        $content = $('#content'),
        $book = $('#book');

    $.get(url, function (data) {
        var xml = $.parseXML(data);
        root = xml.children[0];

        printNode(root);
        printAnswers(root.children);
    });

    function clear() {
        $content.html('');
        $book.html('');
    }

    function getAnswerColor(type) {
        switch (type) {
            case 'true':
                return 'btn-success';
            case 'false':
                return 'btn-danger';
            case 'maybe':
                return 'btn-info';
            default:
                return 'btn-default';
        }
    }

    function printNode(children) {
        // for (var i = 0; i < children.length; i++) {
        var title = children.getAttribute('title');
        $('#menu').html(title);
        // }
    }

    function printAnswers(children) {
        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            var type = children[i].getAttribute('type');
            var color = "btn " + getAnswerColor(type);
            var button = document.createElement('button');

            button.className = color + ' btn-block';
            button.innerHTML = title ? title : ' '; //проверка, если есть ли текст в блоке
            button.id = i;
            button.setAttribute('type', 'button');

            $content.append(button);
        }
    }

    function printBook(children) {
        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            var author = children[i].getAttribute('author');
            var img = document.createElement('img');
            var h3 = document.createElement('h3');
            var h2 = document.createElement('h2');

            h3.innerHTML = author;
            h2.innerHTML = title;
            img.setAttribute('src', 'static/books/' + author + ' ' + title + '.jpg');

            $book.css('display', 'block').append(img).append(h2).append(h3);
        }
    }

    $(document).on('click', 'button', function (e) {
        var id = $(this).attr('id');
        root = root.children[id];

        clear();
        if (root.children.length > 0) {
            while (root.children[0].tagName != 'answer') {
                if (root.children[0].tagName == 'node') {
                    printNode(root.children[0]);
                    root = root.children[0];
                } else if (root.children[0].tagName == 'book') {
                    printBook(root.children);
                    root = root.children[0];
                    break;
                }
            }
            printAnswers(root.children);
        }
    })
});

