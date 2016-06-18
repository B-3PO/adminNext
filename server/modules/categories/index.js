function initTypes(dataManager) {
  dataManager.addType({
    name: 'categories',
    table: 'categories',
    attributes: {
      name: {dataType: dataManager.dataType.STRING},
      type: {dataType: dataManager.dataType.STRING},
      order: {dataType: dataManager.dataType.NUMBER}
    }
  });
}



function addRoutes(app, dataManager) {
  app.use('/api/categories', dataManager.CreateResource({
    name: 'categories',
    type: 'categories',
    relationships: {
      menuItems: {
        resource: 'menuItems',
        manyToMany: true
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
