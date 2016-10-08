$(document).ready(function () {
    var url = 'https://raw.githubusercontent.com/Snpefk/books/gh-pages/static/qst.xml',
        root,
        $content = $('#content'),
        $book = $('#book');

    function initialize() {
        $.get(url, function (data) {
            var xml = $.parseXML(data);
            root = xml.children[0];
            clear();

            printNode(root);
            printAnswers(root.children);
            changeBackground(root.getAttribute('title'))
        });
    }

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

    function normalizeString(string) {
        return string.replace(/([<>:"/\|?*]+)/ig, '').toLowerCase();
    }

    function changeBackground(title) {
        // var url = 'url("http://localhost:63342/books/static/background/' + normalizeString(title) + '.jpg")';
        //
        // $('body')
        //     .css({"background-image": url})
        //     .animate({'opacity': 1});
        // console.log(url);
    }

    function printNode(children) {
        var title = children.getAttribute('title');
        $('#menu').html(title);
    }

    function printAnswers(children) {
        for (var i = 0; i < children.length; ++i) {
            var title = children[i].getAttribute('title');
            var type = children[i].getAttribute('type');
            var color = "btn " + getAnswerColor(type);
            var button = document.createElement('button');

            if (title == null) title = type == 'true' ? 'Да' : 'Нет';

            button.className = color + ' btn-block';
            button.innerHTML = title;
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
            var buttonRefresh = document.createElement('a');
            var updateSpan = document.createElement('span');

            h3.innerHTML = author;
            h2.innerHTML = title;
            img.setAttribute('src', 'https://raw.githubusercontent.com/snpefk/books/gh-pages/static/books/' + normalizeString(author) + ' ' + normalizeString(title) + '.jpg');

            updateSpan.className = 'glyphicon glyphicon-refresh';

            buttonRefresh.innerHTML = 'Заново ';
            buttonRefresh.className = 'btn btn-primary';
            buttonRefresh.onclick = initialize;
            // buttonRefresh.setAttribute('type', 'button');
            buttonRefresh.appendChild(updateSpan);

            $book.css('display', 'block').append(img).append(h2).append(h3).append(buttonRefresh);
        }
    }

    $(document).on('click', 'button', function (e) {
        var id = $(this).attr('id');
        root = root.children[id];

        // if (root.children[0].tagName != 'book' && root.getAttribute('background')) changeBackground(root.getAttribute('title'));
        if (root.children[0].tagName != 'book') changeBackground(root.getAttribute('title'));

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
    });

    initialize();
});

