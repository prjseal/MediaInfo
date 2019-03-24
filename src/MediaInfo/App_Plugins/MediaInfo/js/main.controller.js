(function () {
    'use strict';

    function MediaInfo($scope, $http, editorState) {
        var apiUrl;

        function init() {
            apiUrl = Umbraco.Sys.ServerVariables["MediaInfo"]["MediaInfoApiUrl"];
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
                var text = '';
                response.data.forEach(function (dir) {
                    text += dir.Name + '\n';
                    dir.Tags.forEach(function (tag) {
                        text += tag.Name + ": " + tag.Description + '\n';
                    });
                    text += '\n';
                });
                $scope.text = text;
                console.log(text);
            });
        };

        init();
    }

    angular.module('umbraco').controller('MediaInfo', MediaInfo);

})();