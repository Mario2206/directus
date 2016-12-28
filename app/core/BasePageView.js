define([
  'app',
  'backbone',
  'underscore',
  'core/baseHeaderView'
],
function(app, Backbone, _, BaseHeaderView) {

  return Backbone.Layout.extend({

    template: 'basePage',

    chooseView: function(viewSet, viewName) {
      return _.isUndefined(viewName) ? viewSet : viewSet[viewName];
    },

    leftToolbar: function() {
      return [];
    },

    rightToolbar: function() {
      return [];
    },

    leftSecondaryToolbar: function() {
      return [];
    },

    rightSecondaryToolbar: function() {
      return [];
    },

    headerOptions: {

    },

    initToolbar: function() {
      this.headerOptions.leftToolbar = this.leftToolbar();
      this.headerOptions.rightToolbar = this.rightToolbar();
      this.headerOptions.leftSecondaryToolbar = this.leftSecondaryToolbar();
      this.headerOptions.rightSecondaryToolbar = this.rightSecondaryToolbar();

      this.headerView = new BaseHeaderView({headerOptions: this.headerOptions});
      app.router.v.main.setView('#mainHeaderContent', this.headerView);
    },

    reRender: function() {
      this.initToolbar();
      this.headerView.render();
    },

    beforeRender: function() {
      this.initToolbar();
      // render the header manually
      // this view is part of the main view and is not a child of this view
      this.headerView.render();
    },
    fetchHolding: [],
    //Only fetch if we are not waiting on any widgets to get preference data
    tryFetch: function() {
      if(this.fetchHolding.length === 0) {
        var options = this.collection.options ? this.collection.options : {};
        this.collection.fetch(options);
      }
    },

    addHolding: function(cid) {
      this.fetchHolding.push(cid);
    },

    //Remove a cid from holding and try fetch
    removeHolding: function(cid) {
      this.fetchHolding.splice(this.fetchHolding.indexOf(cid), 1);
      this.tryFetch();
    }

  });
});
