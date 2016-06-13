function initTypes(dataManager) {
  dataManager.addType({
    name: 'organizations',
    table: 'organizations',
    attributes: {
      name: {dataType: dataManager.dataType.STRING}
    }
  });
}



function addRoutes(app, dataManager) {
  app.use('/api/organizations', dataManager.CreateResource({
    name: 'organizations',
    type: 'organizations',
    relationships: {
      venues: {
        resource: 'venues',
        oneToMany: true,
        field: 'organizations_id'
      }
    }
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
