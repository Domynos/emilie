angular.module('cymit.homectrl',['ngResource'])
.factory('FeedLoader', function ($resource) {
    return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
    });
})
.service('FeedList', function ($rootScope, FeedLoader) {
    this.freeLoader = function (data) {
        var feed = data.responseData.feed;
        $rootScope.feeds.push(feed);

        console.log("paf ", $rootScope.feeds);
    };
    this.get = function() {
        $rootScope.feeds = [];
        var feedSources = [
            {title: 'Slashdot', url: 'http://rss.slashdot.org/Slashdot/slashdot'},
            {title: 'Tweakers', url: 'http://feeds.feedburner.com/tweakers/mixed'},
            {title: 'Wired', url: 'http://feeds.wired.com/wired/index'},
        ];
        if ($rootScope.feeds.length === 0) {
            for (var i=0; i<feedSources.length; i++) {
                FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, this.freeLoader);
            }
        }
        return $rootScope.feeds;
    };
})
.controller('HomeCtrl', function($scope, FeedList, $http){
    $scope.posts = [];

    $scope.postSlugs = [
        'adieu-michel-galabru',
        'revue-de-tweets-de-la-semaine-du-8-au-14-fevrier',
        'continuer-a-vivre',
        'beaujolais-nouveau-decryptage-dune-oenologue-de-ce-vin-de-copains',
        'le-sida-toujours-present',
        '13-cadeaux-de-noel-a-petit-prix',
        'le-projet-ambitieux-de-jean-louis-borloo',
        'reportage-le-rallye-paris-tour-eiffel-une-randonnee-touristique-dans-la-capitale',
        'portrait-de-michel-bras-chef-le-plus-influent-du-monde',
        'les-conseils-de-la-redac-pour-affronter-le-lundi',
        'gueule-de-parisienne-portrait-de-stephanie-pfeiffer'
    ];

    $scope.postSlugs.forEach(function (postSlug) {
        $http.get('https://public-api.wordpress.com/rest/v1.1/sites/treizhebdo.wordpress.com/posts/slug:' + postSlug)
        .success(function(data, status, headers, config) {
             $scope.posts.push(data);
        })
        .error(function(error, status, headers, config) {
             console.log(status);
             console.log("Error occured");
        });
    });



//    $scope.feeds = FeedList.get();
//    $scope.$on('FeedList', function (event, data) {
//        $scope.feeds = data;
//    });
});