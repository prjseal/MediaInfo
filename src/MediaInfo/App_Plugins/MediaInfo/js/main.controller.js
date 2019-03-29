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
                $scope.data = response.data;

                var latDegrees = '';
                var latRef = '';
                var lngDegrees = '';
                var lngRef = '';

                response.data.forEach(function (dir) {
                    if (dir.Name === 'GPS') {
                        dir.Tags.forEach(function (tag) {
                            if (tag.Name === 'GPS Latitude') {
                                latDegrees = tag.Description.replace(/ /g, '');
                            } else if (tag.Name === 'GPS Longitude') {
                                lngDegrees = tag.Description.replace(/ /g, '');
                            } else if (tag.Name === 'GPS Latitude Ref') {
                                latRef = tag.Description;
                            } else if (tag.Name === 'GPS Longitude Ref') {
                                lngRef = tag.Description;
                            }
                        });
                    }
                });

                if (latDegrees != '' && lngDegrees != '' && latRef != '' && lngRef != '') {
                    var mapUrl = 'https://www.google.com/maps/place/' + latDegrees + latRef + '+' + lngDegrees + lngRef;
                    $scope.mapUrl = mapUrl;
                }
            });
        };

        init();
    }

    angular.module('umbraco').controller('MediaInfo', MediaInfo);

})();