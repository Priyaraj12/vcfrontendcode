// eslint-disable-next-line
var Ps = Ps || {};

(function() {
'use strict';

    angular.module('buillderInfo')
    .controller('builderInfoController', ['$state', '$http', '$scope', 'getcokkies','config',
    function($state, $http, $scope, getcokkies, config) {
        $scope.loader = true;  
        // $scope.show = true;
        $scope.checkemptydata = [];      
        $scope.config = {
            itemsPerPage: 5,
            fillLastPage: true
        }
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.ProjectList = [];
        $scope.numberOfPages=function(){
            return Math.ceil($scope.ProjectList.length/$scope.pageSize);                
        }
        /*$scope.builderId=getcokkies.getBuilderId();
        console.log("builderId",$scope.builderId);
        if($scope.builderId>0){
        $scope.show = true;
        }else{
        $scope.show = false;
        }*/

        //Retrive Data From Server
        $http({   
        url:config.apiUrl+'/builder/getBuilderAndProjectListUsingBuilderId?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //data:"builderId=85"
        data:$.param({'builderUserId': parseInt(getcokkies.getUserId()),'builderId': parseInt(getcokkies.getBuilderId())})
        //console.log(getcokkies.getBuilderUserId());
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            //console.log("", response);
            localStorage.setItem("BuilderInfo", response.data.BuilderInfo);
            $scope.UserBuilderInfo = JSON.parse(localStorage.getItem("BuilderInfo"));
           // console.log("userbuilder",$scope.UserBuilderInfo);
            var builderId = JSON.parse(response.data.BuilderInfo).builderId;
            document.cookie = "builderId=" + builderId + ";";
            console.log("builderId",builderId);

            $scope.ProjectList=JSON.parse(response.data.ProjectList);
            $scope.zipChange($scope.UserBuilderInfo.zip,"first");
            $scope.cityChange($scope.UserBuilderInfo.zipId);
             $scope.loader = false; 
            if($scope.ProjectList.length == 0 ){
                 $scope.loader = true; 
                $http({   
                url:config.apiUrl+'/builder/getBuilderAndProjectListUsingBuilderId?sessionId='+getcokkies.getsessionId(),
                method: "POST",
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                //data:"builderId=85"
                data:$.param({'builderUserId': parseInt(getcokkies.getUserId()),'builderId': parseInt(getcokkies.getBuilderId())})
                //console.log(getcokkies.getBuilderUserId());
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                   // console.log("", response);
                    localStorage.setItem("BuilderInfo", response.data.BuilderInfo);
                    $scope.UserBuilderInfo = JSON.parse(localStorage.getItem("BuilderInfo"));
                    console.log("userbuilder",$scope.UserBuilderInfo);
                    var builderId = JSON.parse(response.data.BuilderInfo).builderId;
                    document.cookie = "builderId=" + builderId + ";";
                    console.log("builderId",builderId);
                    $scope.ProjectList=JSON.parse(response.data.ProjectList);
                    console.log("ProjectList",$scope.ProjectList);
                    $scope.loader = false;

                     $scope.zipChange($scope.UserBuilderInfo.zip,"first");
                     $scope.cityChange($scope.UserBuilderInfo.zipId);
                    /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
                }, function errorCallback(response) {
                // called asynchronously if an error occurs

                }) 
            }
            //console.log("ProjectList",$scope.ProjectList);
            $scope.loader = false;
            /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
        }, function errorCallback(response) {
        }) 

         $scope.zipChange = function(zip,f) {
             $scope.loader = false; 
            //console.log(zip)
            if(zip.length==6 && zip !=""){
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
                    }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        }
         $scope.cityChange = function(zipId) {
            $("#City").removeAttr("multiple");
         }

        //Insert Builder In Server
        $scope.emptydataremove = function(){
            _.each($scope.checkemptydata, function(value) {
            $('#' + value).removeClass('redcolorinput');
            });
            $scope.checkemptydata = [];
        }

        $scope.addbuilders = function(builder) {
            $scope.emptydataremove();
            $scope.checkemptydata = [];
            console.log("savebuilderconsole",builder);
            $scope.emptydata={
                "builderName":builder.builderName,
                "zipId":builder.zipId,
                //"location":builder.location,
                "contactName":builder.contactName,
                "contactPhone":builder.contactPhone,
                "contacteMail":builder.contacteMail,
                "builderWebAddress":builder.builderWebAddress
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
                });
                $scope.error = true;
                $scope.error_message = "Mandatory field(s) need to be filled in (Highlighted).";
                $scope.sucess = false;
            }else if(builder.zip.length != 6){
                $scope.error=true;
                if($scope.error=true){
                    $scope.error_message="Zip should be 6 characters";
                    // $("#zip").addClass('redcolorinput')
                }           
                $scope.sucess=false;
            }else if(builder.contactPhone.length != 10){
                $scope.error=true;
                $scope.error_message="Contact number should be 10 characters";
                //$("#contactPhone").addClass('redcolorinput')
                $scope.sucess=false;
            }else if(builder.contacteMail == undefined || builder.contacteMail == ""){
                $scope.error=true;
                $scope.error_message="Invalid email Address. Example : sample@gmail.com";
                //$("#contactPhone").addClass('redcolorinput')
                $scope.sucess=false;
            }else{
                $scope.buillderInfoData={
                    "builderId":builder.builderId,
                    "builderName":window.btoa(builder.builderName),
                    "zipId":builder.zipId,
                    "zip":builder.zip,
                   // "location":builder.location,
                    "contactName":builder.contactName,
                    "contactPhone":builder.contactPhone,
                    "contacteMail": builder.contacteMail,
                    "builderWebAddress":builder.builderWebAddress
                };

                $http({
                url: config.apiUrl+'/builder/insertBuilderWithBuilderId?sessionId='+getcokkies.getsessionId(),
                 method: "POST",
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:"builderUserId="+parseInt(getcokkies.getUserId())+"&builderDetails="+JSON.stringify($scope.buillderInfoData)

                //console.log(getcokkies.getBuilderUserId());
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("save", response);
                    $scope.Residences = JSON.parse(response.data.BuilderDetails);
                    $scope.loader = false;
                    console.log("insertbuilder",$scope.Residences);
                     var builderId = $scope.Residences.builderId;
                     document.cookie = "builderId=" + builderId + ";";
                     console.log("insertbuilderId",builderId);
                    $scope.sucess = true;
                    $scope.emptydataremove();
                    //$scope.sucessMessage = "sucessfully updated!!!"; 
                    $scope.error = false;
                    // $window.alert("Saved Successfully");
                    //$window.alert("")
                    /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                })
            }
        }

        $scope.reset = function(){
            $http({   
            url:config.apiUrl+'/builder/getBuilderAndProjectListUsingBuilderId?sessionId='+getcokkies.getsessionId(),
            method: "POST",
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:$.param({'builderUserId': parseInt(getcokkies.getUserId()),'builderId': parseInt(getcokkies.getBuilderId())})
            }).then(function successCallback(response) {
                console.log("reseted");
                localStorage.setItem("BuilderInfo", response.data.BuilderInfo);
            $scope.UserBuilderInfo = JSON.parse(localStorage.getItem("BuilderInfo"));
           // console.log("userbuilder",$scope.UserBuilderInfo);
            var builderId = JSON.parse(response.data.BuilderInfo).builderId;
            document.cookie = "builderId=" + builderId + ";";
            console.log("builderId",builderId);

            $scope.ProjectList=JSON.parse(response.data.ProjectList);
            $scope.zipChange($scope.UserBuilderInfo.zip,"first");
            $scope.cityChange($scope.UserBuilderInfo.zipId);
             $scope.loader = false; 
            if($scope.ProjectList.length == 0 ){
                 $scope.loader = true; 
                $http({   
                url:config.apiUrl+'/builder/getBuilderAndProjectListUsingBuilderId?sessionId='+getcokkies.getsessionId(),
                method: "POST",
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                //data:"builderId=85"
                data:$.param({'builderUserId': parseInt(getcokkies.getUserId()),'builderId': parseInt(getcokkies.getBuilderId())})
                //console.log(getcokkies.getBuilderUserId());
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                   // console.log("", response);
                    localStorage.setItem("BuilderInfo", response.data.BuilderInfo);
                    $scope.UserBuilderInfo = JSON.parse(localStorage.getItem("BuilderInfo"));
                    console.log("userbuilder",$scope.UserBuilderInfo);
                    var builderId = JSON.parse(response.data.BuilderInfo).builderId;
                    document.cookie = "builderId=" + builderId + ";";
                    console.log("builderId",builderId);
                    $scope.ProjectList=JSON.parse(response.data.ProjectList);
                    console.log("ProjectList",$scope.ProjectList);
                    $scope.loader = false;

                     $scope.zipChange($scope.UserBuilderInfo.zip,"first");
                     $scope.cityChange($scope.UserBuilderInfo.zipId);
                    /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
                }, function errorCallback(response) {
                // called asynchronously if an error occurs

                }) 
            }
            //console.log("ProjectList",$scope.ProjectList);
            $scope.loader = false;
            }, function errorCallback(response) {
            }) 
        }

    }]);
})();