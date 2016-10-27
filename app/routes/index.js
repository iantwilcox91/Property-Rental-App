import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      rentals: this.store.findAll('rental'),
      reviews: this.store.findAll('review')
    });

// for only one model:
// model() {
//   return this.store.findAll('rental');
// },

  },
   actions: {
    saveRental3(params) {
      var newRental = this.store.createRecord('rental', params);
      newRental.save();
      this.transitionTo('index');
    },
    // saveReview3(params) {
    //   var newReview = this.store.createRecord('review', params);
    //   newReview.save();
    //   this.transitionTo('index');
    // }
  }
});
