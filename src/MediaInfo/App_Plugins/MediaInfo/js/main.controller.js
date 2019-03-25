(function () {
    'use strict';

    function MediaInfo($scope, $http, editorState) {
        var apiUrl;

        function init() {
            apiUrl = Umbraco.Sys.ServerVariables["MediaInfo"]["MediaInfoApiUrl"];
            $scope.data = [];
            $scope.getFileInfo();
        }

        $scope.getFileInfo = function () {
            $http({
                method: 'POST',
                url: apiUrl + 'GetFileInfo/',
                data: JSON.stringify({ ImageUrl: editorState.current.mediaLink }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.data = response.data;

                var latDegrees = '';
                var lngDegrees = '';

                response.data.forEach(function (dir) {
                    if (dir.Name === 'GPS') {
                        dir.Tags.forEach(function (tag) {
                            if (tag.Name === 'GPS Latitude') {
                                latDegrees = tag.Description;
                            } else if (tag.Name === 'GPS Longitude') {
                                lngDegrees = tag.Description;
                            }
                        });
                    }
                });

                $scope.point = new GeoPoint(lngDegrees, latDegrees);
                var mapUrl = 'https://www.bing.com/maps/embed?h=280&w=325&cp=' + $scope.point.getLatDec() + '~' + $scope.point.getLonDec() + '&lvl=11&typ=s&sty=r&src=SHELL&FORM=MBEDV8';
                console.log(mapUrl);
                $scope.mapUrl = mapUrl;



                //var text = '';
                //response.data.forEach(function (dir) {
                //    text += dir.Name + '\n';
                //    dir.Tags.forEach(function (tag) {
                //        text += tag.Name + ": " + tag.Description + '\n';
                //    });
                //    text += '\n';
                //});
                //$scope.data = response.data;
                //console.log(text);
            });
        };

        init();
    }

    angular.module('umbraco').controller('MediaInfo', MediaInfo);

})();