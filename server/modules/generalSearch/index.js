var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'tester',
  password: 'testTester',
  database: 'newAdminExamles'
});


var types = [
  {
    type: 'organizations',
    table: 'organizations',
    attrs: {
      organizationsuuid: 'uuid',
      organizationsname: 'name'
    }
  },
  {
    type: 'venues',
    table: 'venues',
    attrs: {
      venuesuuid: 'uuid',
      venuesname: 'name'
    }
  }
];




function get(user, term, callback) {
  var query = 'select ' + getAttrs() + ' from organizations';
  query += ' left join venues on venues.organizations_id=organizations.id';
  query += getWheres(user, term);

  getData(query, function (error, rows) {
    if (error !== undefined) {
      callback(error);
      return;
    }

    callback(undefined, formatData(rows));
  });
}



function formatData(rows) {
  var dataByType = {};

  var row = rows.pop();
  while (row !== undefined) {
    addRowByType(dataByType, formatTypeRow(row));
    row = rows.pop();
  }

  return dataByType;
}

function addRowByType(typeObj, typeRow) {
  var i;
  var length;
  var keys = Object.keys(typeRow);
  var key = keys.pop();

  while (key !== undefined) {
    if (typeObj[key] === undefined) {
      typeObj[key] = {};
    }

    if (typeObj[key][typeRow[key].uuid] === undefined) {
      typeObj[key][typeRow[key].uuid] = typeRow[key].name;
    }

    key = keys.pop();
  }
}


function formatTypeRow(row) {
  var rowObj = {};
  var keys = Object.keys(row);
  var key = keys.pop();
  var rowByType = {};
  var attrObj;

  while (key !== undefined) {
    attrObj = getAttrFromRow(key);

    if (rowByType[attrObj.type] === undefined) {
      rowByType[attrObj.type] = {};
    }

    rowByType[attrObj.type][attrObj.attr] = row[key];
    key = keys.pop();
  }

  return rowByType;
}

function getAttrFromRow(key) {
  var attrData = {};

  types.every(function (type) {
    if (type.attrs[key] !== undefined) {
      attrData.type = type.type;
      attrData.attr = type.attrs[key];
      return false;
    }
    return true;
  });

  return attrData;
}





function getData(query, callback) {
  connection.query(query, function(error, rows, fields) {
    if (error || rows[0] === undefined) {
      callback({
        status: 401,
        message: 'Could not find user'
      });
      return;
    }

    callback(undefined, rows);
  });
}





function getAttrs() {
  return types.map(function (item) {
    return Object.keys(item.attrs).map(function (key) {
      return item.table + '.' + item.attrs[key] + ' as ' + key;
    }).join(',');
  }).join(',');
}


function getWheres(user, term) {
  var isOrganizationsId = user.organization_id !== undefined && user.organization_id !== '';
  var isVenuesId = user.venue_id !== undefined && user.venue_id !== '';
  var like = formatLike(term);
  var wheres = [];


  if (isOrganizationsId === true && isVenuesId === true) {
    wheres.push('organizations.uuid = \'' + user.organization_id + '\'');
    wheres.push('venues.uuid = \'' + user.venue_id + '\'');
  } else if (isOrganizationsId === true) {
    wheres.push('organizations.uuid = \'' + user.organization_id + '\'');
    if (like !== undefined) {
      wheres.push('venues.name ' + like);
    }
  } else if (isVenuesId === true) {
    wheres.push('venues.uuid = \'' + user.venue_id + '\'');
  }

  if (wheres.length === 0) { return ''; }
  return ' where ' + wheres.join(' and ');
}

function formatLike(str) {
  if (str === undefined || str.length < 3) {
    return undefined;
  }

  return 'like \'%' + str + '%\'';
}



// contructor function to set token secrets
module.exports = {
  get: get
};
