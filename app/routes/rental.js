import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('rental', params.rental_id);
  },
  actions: {
    update(rental, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          rental.set(key,params[key]);
        }
      });
      rental.save();
      this.transitionTo('index');
    },
    destroyRental(rental) {
      var review_deletions = rental.get('reviews').map(function(review) {
        return review.destroyRecord();
      });
      Ember.RSVP.all(review_deletions).then(function() {
        return rental.destroyRecord();
      });
      this.transitionTo('index');
    },

 // The Ember.RSVP.all(review_deletions) waits until all reviews are destroyed before proceeding to then destroy the rental.

    saveReview(params) {
      var newReview = this.store.createRecord('review', params);
      var rental = params.rental;
      rental.get('reviews').addObject(newReview);
      newReview.save().then(function() {
        return rental.save();
      });
      this.transitionTo('rental', rental);
    },
    destroyReview(review) {
      review.destroyRecord();
      this.transitionTo('index');
    }
  }
});

// In the saveReview() action, we first identify the new review object and the rental it will belong to. Then, we add the new review to the reviews attribute of our current rental using the .addObject(); method. Next, we save the new review and specify to only save the rental after the review has been successfully saved by using .then();.
