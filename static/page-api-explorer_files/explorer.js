var app = angular.module("apiobjects", ["ngSanitize"]);

// Create the instant search filter
app.filter('searchFor', function() {
    return function(items, searchString) {
        if (!searchString) return items;

        var result = [];
        searchString = searchString.toLowerCase();

        // Using the forEach helper method to loop through the array
        angular.forEach(items, function(item) {
            if (item.label) {
                if (item.label.toLowerCase().indexOf(searchString) === 0) {
                    result.push(item);
                }
            }
        });

        return result;
    };
});

app.factory("APIObjectsService", function($http) {
    var returnObj = {};

    returnObj.populateObjectMetadata = function(scope, object) {
        $http.get("https://api-cl01.my.workfront.com/attask/api" + scope.apiversion + "/" + object.objCode + "/metadata").then(function(response) {
            const objectData = response.data.data;
            var metadata = {};
            metadata.fields = objectData.fields;
            metadata.references = objectData.references;
            metadata.collections = objectData.collections;
            metadata.search = objectData.search;
            metadata.queries = objectData.queries;
            metadata.actions = objectData.actions;

            object.metadata = metadata;
            object.flags = objectData.flags;
            object.operations = objectData.operations;

            //default to fields when it is done loading
            object.showmetadata = true;
            object.metadatakey = "fields";
            object.loadingData = false;
        });
    };

    returnObj.populateObjects = function(scope) {
        $http.get("https://api-cl01.my.workfront.com/attask/api" + scope.apiversion + "/metadata").then(function(response) {
            const responseObjects = response.data.data.objects;
            scope.objects = {};
            for (var key in responseObjects) {
                if (!responseObjects.hasOwnProperty(key)) continue;

                var object = responseObjects[key];
                scope.objects[object.objCode] = object;
            }
            scope.initalLoad = true;

            if (scope.selectedObjCode) {
                scope.searchString = scope.objects[scope.selectedObjCode].label;
                scope.getObjectMetadata(scope.selectedObjCode, true);
            }
        })
    };

    return returnObj;
});

// The controller
app.controller("APIObjectsCtrl", function($scope, $location, APIObjectsService) {
    $scope.apiversion = "/v14.0";
    $scope.initalLoad = false;

    if ($location.search()['selected']) {
        $scope.selectedObjCode = $location.search()['selected']
    }

    $scope.getObjectMetadata = function(objCode, forceOpen) {
        var object = $scope.objects[objCode];

        if (!object.metadata) {
            object.loadingData = true;
            APIObjectsService.populateObjectMetadata($scope, object);
        } else {
            object.showmetadata = !object.showmetadata || forceOpen;
        }
    };

    $scope.goToObject = function(objCode) {
        $scope.searchString = $scope.objects[objCode].label;
        $scope.getObjectMetadata(objCode, true);
    };

    $scope.updateAPIVersion = function() {
        APIObjectsService.populateObjects($scope);
    };

    $scope.showSubSection = function(object, key) {
        object.metadatakey = key;
    };

    $scope.showAttributeInfo = function(object, metadatakey, idenfitier) {
        if (!object.datavisible) object.datavisible = {};
        object.datavisible[metadatakey + idenfitier] = !object.datavisible[metadatakey + idenfitier];
    };

    var hiddenKeys = ["label"];
    $scope.displayKey = function(key) {
        return hiddenKeys.indexOf(key) === -1;
    };

    var hiddenMetadata = ["queries"];
    $scope.displayMetadata = function(metadatakey) {
        return hiddenMetadata.indexOf(metadatakey) === -1;
    };

    $scope.isBlank = function(value) {
        return value === undefined || value === null || angular.equals({}, value);
    };

    $scope.getBlankText = function(object, metadatakey) {
        return "No data available under " + metadatakey + " for a " + object.label.toLowerCase();
    };

    $scope.formatKey = function(key) {
        switch (key) {
            case "type":
            case "fieldType":
                return "Field Type";
            case "typeObjCode":
                return "Attribute Type ObjCode";
            case "possibleValues":
                return "Possible Values";
            case "enumType":
                return "Enum Type";
            case "url":
                return "URL";
            case "arguments":
                return "Arguments";
            case "resultType":
                return "Result Type";
            case "flags":
                return "Flags";
        }
    };

    $scope.getArrayValue = function(key, item, label) {
        var valueKey = "value";
        var labelKey = "label";

        if (key === "arguments") {
            valueKey = "name";
            labelKey = "type"
        }
        if (key === "flags") {
            return item;
        }

       return label ? item[labelKey] : item[valueKey];
    };

    $scope.isValueArray = function(value) {
        return angular.isArray(value)
    };

    APIObjectsService.populateObjects($scope);
});
