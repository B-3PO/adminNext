function initTypes(dataManager) {
  dataManager.addType({
    name: 'modifiers',
    table: 'modifiers',
    attributes: {
      name: {dataType: dataManager.dataType.STRING}
    }
  });

  dataManager.addType({
    name: 'modifierOptions',
    table: 'modifier_options',
    constraint: true,
    attributes: {
      name: {dataType: dataManager.dataType.STRING},
      price: {
        dataType: dataManager.dataType.CURRENCY,
        // to dollar from pennies 2 decimal
        format: function (data) {
          return parseFloat((data/100).toFixed(2));
        },

        // to pennies from dallow
        parse: function (data) {
          return parseFloat(parseFloat(data) * 100).toPrecision(12) | 0;
        }
      }
    }
  });
}



function addRoutes(app, dataManager) {
  app.use('/api/modifiers', dataManager.CreateResource({
    name: 'modifiers',
    type: 'modifiers',
    relationships: {
      modifierOptions: {
        resource: 'modifierOptions',
        oneToMany: true,
        // constraint: true
      }
    }
  }));

  app.use('/api/modifierOptions', dataManager.CreateResource({
    name: 'modifierOptions',
    type: 'modifierOptions',
  }));
}


module.exports = function(app, dataManager) {
	initTypes(dataManager);

	return {
    initRoutes: initRoutes
  };

  function initRoutes() {
    addRoutes(app, dataManager);
  }
};
