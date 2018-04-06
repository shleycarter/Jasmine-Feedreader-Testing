/*jshint esversion: 6 */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    /* NEW TEST SUITE named "RSS Feeds" */

    describe('RSS Feeds', function () {

        /* This test ensures that there are feeds to be populated in the reader app*/

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. */

        it('URLs are defined', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.*/

        it('Names are defined', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* NEW TEST SUITE named "The menu" */

    describe('The Menu', function () {


        /* This test ensures the menu element is
         * hidden by default. */

        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. This test has
         * two expectations: does the menu display when
         * clicked and does it hide when clicked again. */

        it('changes visibility on click', function () {
            var menu = $('.menu-icon-link');

            menu.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);


            menu.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        });
    });

    /* NEW TEST SUITE named "Initial Entries" */

    describe('Initial Entries', function () {

        /* This test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */
        
         beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it('has at least one entry in the feed', function () {
            var entry = $('.entry');

            expect(entry.length).toBeGreaterThan(0);
        });
    });

    /* NEW TEST SUITE named "New Feed Selection" */

    describe('New Feed Selection', function () {
        var feedContent_1;
        var feedContent_2;

        beforeEach(function (done) {
            loadFeed(1, function () {
                feedContent_1 = $('.feed').html();
                done();
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes. */

        it('changes feed content when loading new feed', function (done) {
            loadFeed(2, function () {
                expect($('.feed').html()).not.toEqual(feedContent_1);
                done();
            });
        });
    });
}());