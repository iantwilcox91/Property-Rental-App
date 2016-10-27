import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr(),
  rating: DS.attr(),
  content: DS.attr(),
  rental: DS.belongsTo('rental', { async: true }),
});

// The { async: true } property means that if the related model data isn't already loaded, an additional request should be made to Firebase in order to retrieve it.
