switch (location.host) {
    case 'www.bookstore.co.uk':
        var rows = document.querySelectorAll('.fullProductDetailDetailsTable tr');
        var title, subtitle, author = '', publisher, publication;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var name = row.querySelector('td:first-child').innerHTML.toLowerCase().trim();
            if (name.indexOf('author') == 0)
                name = 'author';
            else if (name.indexOf('publication') == 0)
                name = 'publication';
            else if (name.indexOf('publisher') == 0)
                name = 'publisher';
            window[name] = row.querySelector('td:last-child').innerHTML;
        }
        author = document.querySelector('.fullProductDetailAuthorData').innerHTML;
        author = /([\w']+)[^\w]+([\w']+)/i.exec(author);
        author = [author[1], author[2][0]].join(' ') + '. ';
        if (subtitle)
            title += ': ' + subtitle;
        title = author + title;
        publication = publication.split('/')[2];
        var pages = /(\d+)p\./.exec(format);
        pages = pages[1];
        publisher += ', ' + publication + ' — ' + pages + ' p.';
        var summary;
        try {
            summary = document.querySelector('.fullProductDetailDetailsValue:only-child').textContent;
            summary = summary.trim();
        } catch (ex) {}
        document.write(title + '<br/>');
        document.write(publisher + '<br/>' + '<br/>');
        if (summary)
            document.write(summary);
        break;
}