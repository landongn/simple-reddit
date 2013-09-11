var App = Ember.Application.create({
	// LOG_TRANSITIONS: true,
 //    LOG_VIEW_LOOKUPS: true,
 //    LOG_ACTIVE_GENERATION: true
});

App.Router.map(function() {
	this.resource('posts', { path: ':reddit_id' }, function() {
		this.resource('post', { path: ':post_id' });
	});
});

App.PostsRoute = Ember.Route.extend({

});

App.PostRoute = Ember.Route.extend({

});
