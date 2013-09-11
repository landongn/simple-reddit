var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_ACTIVE_GENERATION: true
});

App.Router.map(function() {
	this.resource('posts', { path: ':reddit_id' }, function() {
		this.resource('post', { path: ':post_id' });
	});
});

App.PostsRoute = Ember.Route.extend({
	data: null,
	subreddit: null,
	model: function(params) {
		if (!this.data || this.subreddit !== params.reddit_id) {
			this.subreddit = params.reddit_id;
			this.data = Ember.$.getJSON('http://www.reddit.com/r/' + this.subreddit + '/.json?jsonp=?').then(function(response) {
				var posts = Em.A();
				response.data.children.forEach(function (post) {
					posts.push(post.data);
				});
				console.log(posts);
				return posts;
			});
		}
		return this.data;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		var parent = this.modelFor('posts'),
			post = parent.findBy('id', params.post_id);
		return post;
	}
});
