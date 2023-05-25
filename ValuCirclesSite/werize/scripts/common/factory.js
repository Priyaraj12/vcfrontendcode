(function () {
  'use strict';
  angular.module("commonFactory", [])
  .factory("vJson", function() {
    var Json = {
    "countrys" : [
        {
            'name': "Indian"
        },
        {
            'name': "NRI"
        }
     ],
    "pension": [
        {
            'name':'Yes',
            'id':1
        },
        {
            'name':'No',
            'id':0
        }
    ]
    };
    return Json;
  });
})()


