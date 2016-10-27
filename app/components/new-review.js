import Ember from 'ember';

export default Ember.Component.extend({
  addNewReview: false,
  actions: {
    reviewFormShow() {
      this.set('addNewReview', true);
    },

    saveReview1() {
     var params = {
       author: this.get('author'),
       rating: this.get('rating'),
       content: this.get('content'),
       rental: this.get('rental')
     };
     this.set('addNewReview', false);
     this.sendAction('saveReview', params);
   }
  }
});
// We can gather the rental because we provided the new-review component access to the current rental object when we said rental=model in the line {{new-review saveReview="saveReview" rental=model}} in app/templates/rental.hbs.
