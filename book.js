$(function() {

    var is_mobile = window.matchMedia("(max-width: 600px)");

    var books = $(".book");
    books.each(function(i, e) {
        var book = $(e);
        book.children().first().addClass("active");

        book.children().each(function (i, e) {
            var e = $(e);
            var c = e.children();
            if(e.hasClass("fold") && c.length < 2)
                e.append($('<div class="page extra">'));
        });

        function next_page() {
            var this_page = book.find(".active");
                n_page = this_page.next();

            if(!n_page) // We're at the end of the book.
                return;

            this_page.addClass("passed").removeClass("active");
            n_page.addClass("active");

            // If we're on the last page, hide the left-hand page of the previous
            // fold.
            // TODO: When this is an x-tag, it can be done with CSS using
            // :last-of-type
            if(n_page.hasClass("cover"))
                this_page.addClass("clip");
            
        }
        function prev_page() {
            var this_page = book.find(".active");
                previous_page = this_page.prev();

            if(!previous_page) // We're at the beginning of the book.
                return;

            this_page.removeClass("active");
            previous_page.addClass("active").removeClass("passed").removeClass("clip");

        }

        function any_page() {
            var active = book.find(".active");
            book.toggleClass("open", !active.hasClass("cover") && !is_mobile);

            book.find(".previous").removeClass("previous");
            active.prev().addClass("previous");
        }

        // The user clicked to the next page.
        book.on("click", ".fold .page:last-child, .cover:first-child", function(e) {
            next_page();
            any_page();
        });

        // The user clicked to the previous page.
        book.on("click", ".fold .page:first-child, .cover:last-child", function(e) {
            if(is_mobile && !$(this).hasClass("cover"))  // Clicks are always to the next page on mobile.
                next_page();
            else
                prev_page();
            any_page();
        });
    });
});