function initTypes(dataManager) {
  dataManager.addType({
    name: 'menus',
    table: 'menus',
    attributes: {
      name: {dataType: dataManager.dataType.STRING},
      type: {dataType: dataManager.dataType.STRING}
    }
  });
}



function addRoutes(app, dataManager) {
  app.use('/api/menus', dataManager.CreateResource({
    name: 'menus',
    type: 'menus',
    relationships: {
      categories: {
        resource: 'categories',
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
