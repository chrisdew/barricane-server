var vows = require('vows')
  , assert = require('assert')
  , bdb = require('barricaneDB')
  ;

vows.describe('The First Test').addBatch({
    'Hello World': { topic: bdb.hello_world
	               , 'equals "Hello World"': function(topic) {
						 assert.equal(topic, "Hello World");
					 }
				   } 
}).export(module);
