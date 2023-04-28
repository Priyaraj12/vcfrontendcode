var Ps = Ps || {};

(function() {
'use strict';

angular.module('addBuilderProject')
.controller('addBuilderProjectController', ['$state', '$http', '$scope', 'getcokkies','config',
function($state, $http, $scope, getcokkies, config) {
    $scope.loader = true;     
    $scope.UserLoan = [];
    $scope.specDatas = [];
    $scope.reRaCompliances = [
    { 'name':"Yes" },
    { 'name':"No"},
    { 'name':"Dont_Know"},  
    ];

//$scope.addProject = $scope.reRaCompliances[0].name;
    $scope.availabilitys = [
    { "value": 0,'name':"Yes" },
    { "value": 1,'name':"No"},     
    ];

    //get list of bhk
    $http({
        url: config.apiUrl+'/builder/getListOFAssetSpec?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserId())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.specType = JSON.parse(response.data.Result);
        $scope.loader = false;
        //console.log($scope.specType);

        /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    //Insert Project In Server
     $scope.emptydataremove = function(){
        _.each($scope.checkemptydata, function(value) {
            $('#' + value).removeClass('redcolorinput');
        });
         
        $scope.checkemptydata = [];
        
    }
   
    $scope.saveProject = function(Project,spec) {
       $scope.emptydataremove();
       $scope.emptyprice = [];
        $scope.checkemptydata = [];
        for (var k = 0; k < spec.length;k++) {
                  if(spec[k].minPrice == undefined || spec[k].minPrice == null || spec[k].minPrice == ""){
                      $scope.emptyprice.push(k);
                            }
                  if(spec[k].maxPrice == undefined || spec[k].maxPrice == null || spec[k].maxPrice == ""){
                      $scope.emptyprice.push(k);
                            }
                        }
        console.log(Project,spec,$scope.addProject);
         $scope.emptydata={
            "projectName":Project.projectName,
            "projectZip":Project.projectZip,
            "zipId":Project.zipId,
            "numberOfFloors" :Project.numberOfFloors,
            "numberOfUnits" :Project.numberOfUnits,
            "numberOfBlocks" :Project.numberOfBlocks,
            "reRaCompliance":Project.reRaCompliance,
           // "projectComplianceScore" :Project.projectWebSite,
            "builderId" :getcokkies.getBuilderId()
            //"builderName" :Project.builderContactPerson,
            
         };
         
                    _.every(_.keys($scope.emptydata), function(currentKey) {
                       // console.log(currentKey);
                    if ($scope.emptydata[currentKey] == '' || $scope.emptydata[currentKey] == null) {
                    $scope.checkemptydata.push(currentKey);
                    }
                    return $scope.checkemptydata;
                    });
                    console.log($scope.checkemptydata);
                    if($scope.checkemptydata.length >= 1){
                        _.each($scope.checkemptydata, function(value) {
                            $('#' + value).addClass('redcolorinput');
                        })
                         $scope.sucess= false;
                    }else if(Project.projectZip.length != 6){
                        $scope.error=true;
                        if($scope.error=true){
                        $scope.error_message="Zip should be 6 characters";
           // $("#zip").addClass('redcolorinput')
        }           
            $scope.sucess=false;
       }
       else if($scope.emptyprice.length > 0){
                            _.each($scope.emptyprice, function(value) {
                                $('#minPrice' + value).addClass('redcolorinput');
                               // $('#maxPrice' + value).addClass('redcolorinput');
                            });
                            $scope.sucess= false;
                             $scope.sucessMessage="";
                            $scope.error = true;
                            $scope.error_message = "Mandatory field(s) need to be filled in (Highlighted).";
                           
                        }
       /* else if(spec.length > 1){
                            for (var i = 0; i < spec.length;i++) {
                                if(spec[i].minPrice == undefined){
                                    $('#projectSpec' + i).addClass('redcolorinput');
                                }
                            }
                        }
                        else if(spec.length > 1){
                            for (var i = 0; i < spec.length;i++) {
                                if(spec[i].maxPrice == undefined){
                                    $('#projectSpec' + i).addClass('redcolorinput');
                                }
                            }
                        }*/
                    else{
                      $scope.error = false;
                       $scope.projectData={
            "builderProjectId":Project.builderProjectId ? Project.builderProjectId : 0,
            "projectName":Project.projectName,
            "projectZip":Project. projectZip,
            "zipId":Project. zipId,
            //"projectComplianceScore" :Project.projectWebSite,
            "builderId" :getcokkies.getBuilderId(),
            "builderName" :Project.builderContactPerson,
            "numberOfFloors" :Project.numberOfFloors,
            "numberOfUnits" :Project.numberOfUnits,
            "numberOfBlocks" :Project.numberOfBlocks,
            "reRaCompliance":Project.reRaCompliance
        };
        $http({
            url: config.apiUrl+'/builder/insertProjectWithSpec?sessionId='+getcokkies.getsessionId(),
            method: "POST",
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:"projectDetails="+JSON.stringify($scope.projectData)
            +"&specDetails="+JSON.stringify(spec, function(key, val) {
                                    if (key == '$$hashKey') {
                                        return undefined;
                                    }
                                    else if(key == 'minPrice'){
                                        console.log(val.length);
                                        return parseInt(val.length > 3 ? val.replace(/,/g, '') : val);
                                    }
                                    else if(key == 'maxPrice'){
                                        console.log(val.length);
                                        return parseInt(val.length > 3 ? val.replace(/,/g, '') : val);
                                    }
                                    return val;
                                })

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("save", response.data.Result);           
            //$state.transitionTo('index.builderInfo');
            $scope.addProject =JSON.parse(response.data.ProjectWithSpec);

            console.log("ggggg",$scope.addProject);
                         if ($scope.checkemptydata.length >= 1) {
                            _.each($scope.checkemptydata, function(value) {
                                $('#' + value).removeClass('redcolorinput');
                            })
                        }
            $scope.checkemptydata = [];
            $scope.emptyprice=[];
            $scope.sucess = true;
                 $scope.emptydataremove();
                 $scope.error = false;
                 $scope.loader = false;
           
            //$scope.sucessMessage = "sucessfully updated!!!"; 
           
            /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
        })
                    }

       
    }

    //Retrive Project Edit Data From Server
    if(parseInt(getcokkies.getBuilderProjectIdFromUrl())){
        $http({
            url: config.apiUrl+'/builder/retrieveProjectWithSpec?sessionId='+getcokkies.getsessionId(),
            method: "POST",
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param({'projectId': parseInt(getcokkies.getBuilderProjectIdFromUrl())})
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            // console.log("save", response);
            $scope.totaldata = JSON.parse(response.data.Result);
            $scope.loader = false;
            //console.log("totaldata",$scope.totaldata);
            localStorage.setItem("UserProjectInfo", response.data.Result);
            // $scope.UserLoan = JSON.parse(localStorage.getItem("UserProjectInfo"));
            $scope.addProject = JSON.parse(localStorage.getItem("UserProjectInfo"));
            //console.log("spec",$scope.addProject);
             $scope.zipChange($scope.addProject.projectZip,"first");
            //console.log("userbuilder",$scope.addProject);
            //$scope.reRaCompliance = ["Yes", "No", "Dont_Know"];
            //$scope.projectName = $scope.totaldata ;
            /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
            if ($scope.addProject.builderProjectSpecDTO.length > 0) {
              for (var i = 0; i < $scope.addProject.builderProjectSpecDTO.length; i++) {
                var specData = {
                  "builderProjectSpecId": $scope.addProject.builderProjectSpecDTO.length >= 0 ? $scope.addProject.builderProjectSpecDTO[i].builderProjectSpecId : 0,
                  "activeStatus": "",
                  "createdBy": "",
                  "createdOn": "",
                  "availability": $scope.addProject.builderProjectSpecDTO[i].availability,
                  "updatedBy": "",
                  "updatedOn": "",
                  "builderProjectId" : "",
                  "minPrice": $scope.addProject.builderProjectSpecDTO[i].minPrice.toLocaleString(),
                  "maxPrice": $scope.addProject.builderProjectSpecDTO[i].maxPrice.toLocaleString(),
                  "specId": $scope.addProject.builderProjectSpecDTO[i].specId
                };
              $scope.specDatas.push(specData);
              }
            }
         }, function errorCallback(response) {
            // called asynchronously if an error occurs
         })  
    }else{
        $scope.addProject={
            "builderProjectId": 0,
            "projectName":"",
            "projectZip":"",
            "builderId" :"",
            "builderName" :"",
            "numberOfFloors" :"",
            "numberOfUnits" :"",
            "numberOfBlocks" :"",
            "reRaCompliance":$scope.reRaCompliances[0].name
        }; 
        $scope.loader = false;
    }

     $scope.zipChange = function(zip,f) {
        //console.log(zip)
        if(zip.length==6 && zip!=""){
            $http({
                url: config.apiUrl + '/user/getZipInfo?sessionId=' + getcokkies.getsessionId(),
                method: "POST",
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({
                'sessionId': parseInt(getcokkies.getsessionId()),
                'zipCode': zip
                })
                }).then(function successCallback(response) {
                    $scope.citys = JSON.parse(response.data.Result);
                    if(f=="first"){
                        $("#City").removeAttr("multiple");
                    }
                    else{
                        $("#City").attr("multiple", "yes");
                    }
                // $scope.zipIdChange($scope.Assets.ZipId,"first");
                // console.log($scope.Assets.ZipId);
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }
    $scope.cityChange = function(zipId) {
        $("#City").removeAttr("multiple");
     }


 $scope.numericOnly = function(event,val) {
                        // skip for arrow keys
                        if (event.which >= 37 && event.which <= 40) {
                            event.preventDefault();
                        }
                        var $this = $(this);
                        var num = val.replace(/,/gi, "").split("")
                                .reverse().join("");

                        var num2 = RemoveRougeChar(num.replace(/[^0-9]+/g, '')
                                .replace(/(.{3})/g, "$1,").split("").reverse()
                                .join(""));
                       // console.log(num2);
                        return num2;
      };
    function RemoveRougeChar(convertString) {

                    if (convertString.substring(0, 1) == ",") {

                        return convertString.substring(1, convertString.length)

                    }
                         return convertString;

                }


    $scope.addSpec = function() {
        if ($scope.UserLoan.length == 0) {
          var specData = {
              "builderProjectSpecId": $scope.UserLoan.length >= 0 ? 0 : 0,
              "activeStatus": "",
              "createdBy": "",
              "createdOn": "",
              "availability": 0,
              "updatedBy": "",
              "updatedOn": "",
              "builderProjectId" : "",                         
              "minPrice": 0,
              "maxPrice": 0,
              "specId": 1
          };
          $scope.specDatas.push(specData);
        } else {
          var specData = {
              "builderProjectSpecId": 0,
              "activeStatus": "",
              "createdBy": "",
              "createdOn": "",
              "availability": 0,
              "updatedBy": "",
              "updatedOn": "",
              "builderProjectId" : "",                            
              "minPrice": 0,
              "maxPrice": 0,
              "specId": 1
          };
          $scope.specDatas.push(specData);
          }
    }

    $scope.removeLoan = function(remmoveobject) {
    $scope.specDatas = _.without($scope.specDatas, remmoveobject);
  }
}]);
})();