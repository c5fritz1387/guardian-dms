(function () {
    'use strict';

    var app = angular.module('myApp', ['ng-admin']);
    
    app.controller('myCtrl', function() {});


app.config(function(RestangularProvider, $httpProvider) {
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
            headers = headers || {};
            headers['Prefer'] = 'return=representation';

            if (operation === 'getList') {
                headers['Range-Unit'] = what;
                headers['Range'] = ((params._page - 1) * params._perPage) + '-' + (params._page * params._perPage - 1);
                delete params._page;
                delete params._perPage;

                if (params._sortField) {
                    params.order = params._sortField + '.' + params._sortDir.toLowerCase();
                    delete params._sortField;
                    delete params._sortDir;
                }
            }
        });

        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            switch (operation) {
                case 'get':
                    return data[0];
                case 'getList':
                    response.totalCount = response.headers('Content-Range').split('/')[1];
                    break;
            }

            return data;
        });

        // @see https://github.com/mgonto/restangular/issues/603
        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    var pattern = /\/(\d+)$/;

                    if (pattern.test(config.url)) {
                        config.params = config.params || {};
                        config.params['id'] = 'eq.' + pattern.exec(config.url)[1];
                        config.url = config.url.replace(pattern, '');
                    }

                    return config;
                },
            };
        });
    });

app.config(function (NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;

    var app = nga
        .application('Admin')
        .baseApiUrl('http://localhost:5000/');

    var user = nga.entity('users');
    var trees = nga.entity('tapping');
    //var records = nga.entity('tappingdata');

    app
        .addEntity(user)
        .addEntity(trees);
      //  .addEntity(records);

    //--user listing----//    
    user.menuView()
        .icon('<span class="glyphicon glyphicon-user"></span>');

    user.dashboardView()
        .title('Last users')
        .fields([
            nga.field('id'),
            nga.field('localemail'),
            nga.field('localpassword'),
            nga.field('createdAt'),
            nga.field('updatedAt')
        ]);

    user.listView()
        .perPage(10)
        .fields([
            nga.field('id'),
            nga.field('localemail'),
            nga.field('localpassword'),
            nga.field('createdAt'),
            nga.field('updatedAt')
        ])
        .listActions(['edit', 'show']);

    user.showView()
        .fields([
            nga.field('id'),
            nga.field('localemail'),
            nga.field('localpassword'),
            nga.field('createdAt'),
            nga.field('updatedAt')
        ]);

    user.creationView()
        .fields([
            nga.field('id'),
            nga.field('localemail'),
            nga.field('localpassword'),
            //nga.field('createdAt'),
            //nga.field('updatedAt')
        ]);

    user.editionView()
        .fields(user.creationView().fields());
	
	//---trees listing---//
	trees.menuView()
        .icon('<i class="fa fa-tree" aria-hidden="true"></i>');

    trees.dashboardView()
        .title('Trees')
        .fields([
            nga.field('id'),
            nga.field('tree_id'),
            nga.field('site_id'),
            nga.field('plot_id'),
            nga.field('comments'),
            nga.field('y_coord'),
            nga.field('x_coord'),
            nga.field('date'),
            nga.field('name')
        ]);

    trees.listView()
        .perPage(10)
        .fields([
    		 nga.field('id'),
            nga.field('tree_id'),
            nga.field('site_id'),
            nga.field('plot_id'),
            nga.field('comments'),
            nga.field('y_coord'),
            nga.field('x_coord'),
            nga.field('date'),
            nga.field('name'),
            nga.field('elevation'),
            nga.field('distance1'),
            nga.field('direction1'),
            nga.field('species1'),
            nga.field('dbh1'),
            nga.field('distance2'),
            nga.field('direction2'),
            nga.field('species2'),
            nga.field('dbh2'),
            nga.field('distance3'),
            nga.field('direction3'),
            nga.field('species3'),
            nga.field('dbh3'),
            nga.field('dbh_tree'),
            nga.field('height_tree'),
            nga.field('growth_info'),
            nga.field('height'),
            nga.field('coordinates'),
            nga.field('height_crown'),
            nga.field('width_crown'),
            nga.field('count3m'),
        ])
        .listActions(['edit', 'show']);

    trees.showView()
        .fields([
 			nga.field('id'),
            nga.field('tree_id'),
            nga.field('site_id'),
            nga.field('plot_id'),
            nga.field('comments'),
            nga.field('y_coord'),
            nga.field('x_coord'),
            nga.field('date'),
            nga.field('name'),
            nga.field('elevation'),
            nga.field('distance1'),
            nga.field('direction1'),
            nga.field('species1'),
            nga.field('dbh1'),
            nga.field('distance2'),
            nga.field('direction2'),
            nga.field('species2'),
            nga.field('dbh2'),
            nga.field('distance3'),
            nga.field('direction3'),
            nga.field('species3'),
            nga.field('dbh3'),
            nga.field('dbh_tree'),
            nga.field('height_tree'),
            nga.field('growth_info'),
            nga.field('height'),
            nga.field('coordinates'),
            nga.field('height_crown'),
            nga.field('width_crown'),
            nga.field('count3m'),
        ]);

    trees.creationView()
        .fields([
 			nga.field('id'),
            nga.field('tree_id'),
            nga.field('site_id'),
            nga.field('plot_id'),
            nga.field('comments'),
            nga.field('y_coord'),
            nga.field('x_coord'),
            nga.field('date'),
            nga.field('name'),
            nga.field('elevation'),
            nga.field('distance1'),
            nga.field('direction1'),
            nga.field('species1'),
            nga.field('dbh1'),
            nga.field('distance2'),
            nga.field('direction2'),
            nga.field('species2'),
            nga.field('dbh2'),
            nga.field('distance3'),
            nga.field('direction3'),
            nga.field('species3'),
            nga.field('dbh3'),
            nga.field('dbh_tree'),
            nga.field('height_tree'),
            nga.field('growth_info'),
            nga.field('height'),
            nga.field('coordinates'),
            nga.field('height_crown'),
            nga.field('width_crown'),
            nga.field('count3m'),
        ]);

    	trees.editionView()
        .fields(trees.creationView().fields());
	nga.configure(app);
});

}());