function initTypes(dataManager) {
  dataManager.addType({
    name: 'locations',
    table: 'locations',
    attributes: {
      name: {dataType: dataManager.dataType.STRING},
      description: {dataType: dataManager.dataType.STRING},
      type: {dataType: dataManager.dataType.STRING}
    }
  });
}



function addRoutes(app, dataManager) {
  app.use('/locations', dataManager.CreateResource({
    name: 'locations',
    type: 'locations'
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
