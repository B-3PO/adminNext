function initTypes(dataManager) {
  dataManager.addType({
    name: 'venues',
    table: 'venues',
    // constrain: true,
    attributes: {
      name: {dataType: dataManager.dataType.STRING},
      city: {dataType: dataManager.dataType.STRING},
      state: {dataType: dataManager.dataType.STRING},
      good_data_project: {dataType: dataManager.dataType.STRING},
      active: {dataType: dataManager.dataType.BOOLEAN},
      has_suites: {dataType: dataManager.dataType.BOOLEAN},
      server_station_auto_logout_timeout: {dataType: dataManager.dataType.INT},
      receipt_footer_text: {dataType: dataManager.dataType.STRING},
      signature_legalese: {dataType: dataManager.dataType.STRING},
      show_in_app: {dataType: dataManager.dataType.BOOLEAN},
      auto_fulfill_access_orders: {dataType: dataManager.dataType.BOOLEAN},
      audit_log_enabled: {dataType: dataManager.dataType.BOOLEAN},
      round_cash_to_nearest_nickel: {dataType: dataManager.dataType.BOOLEAN},
      accept_tips_for_inseat: {dataType: dataManager.dataType.BOOLEAN},
      server_station_auto_logout_enabled: {dataType: dataManager.dataType.BOOLEAN},
      allow_print_order_taker_tips_report: {dataType: dataManager.dataType.BOOLEAN},
      enable_custom_discounts: {dataType: dataManager.dataType.BOOLEAN},
      allow_manual_credit_card_entry: {dataType: dataManager.dataType.BOOLEAN},
      cash_drawer_controls_enabled: {dataType: dataManager.dataType.BOOLEAN},
      offline_credit_threshold: {dataType: dataManager.dataType.INT},
      manager_pin_for_edit_tip_required: {dataType: dataManager.dataType.BOOLEAN},
      require_pin_to_view_all_orders: {dataType: dataManager.dataType.BOOLEAN},
      manager_pin_for_void_required: {dataType: dataManager.dataType.BOOLEAN},
      require_pin_for_discount: {dataType: dataManager.dataType.BOOLEAN},
      manager_pin_for_clear_cart: {dataType: dataManager.dataType.BOOLEAN},
      manager_pin_for_standsheet: {dataType: dataManager.dataType.BOOLEAN}
    }
  });
}


function addRoutes(app, dataManager) {
  app.use('/api/venues', dataManager.CreateResource({
    name: 'venues',
    type: 'venues',
    relationships: {
      locations: {
        resource: 'locations',
        oneToMany: true,
        field: 'venues_id'
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
