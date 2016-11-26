/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.createHeader = createHeader;
        vm.createHtml = createHtml;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;
        vm.createTextInput = createTextInput;

        function createHeader() {
            var header = { "type": "HEADING", "size": 4, "text": "This is a new HEADER Widget"};
            WidgetService
                .createWidget(vm.pageId, header)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widget._id);
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function createHtml() {
            var html = { "type": "HTML", "text": "<p>This is a new HTML Widget</p>"};
            WidgetService
                .createWidget(vm.pageId, html)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widget._id);
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function createImage() {
            var image = { "type": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name":"", "text":""};
            WidgetService
                .createWidget(vm.pageId, image)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widget._id);
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function createYoutube() {
            var youtube = { "type": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService
                .createWidget(vm.pageId, youtube)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widget._id);
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function createTextInput() {
            var textInput = { "type": "INPUT", "text": "This is a new INPUT Widget", "rows": 1,
                "placeholder" : "Some text input", "formatted" : true};
            WidgetService
                .createWidget(vm.pageId, textInput)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widget._id);
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateHTML = updateHTML;
        vm.updateImage = updateImage;
        vm.deleteImage = deleteImage;
        vm.updateYoutube = updateYoutube;
        vm.deleteYoutube = deleteYoutube;
        vm.updateHeading = updateHeading;
        vm.deleteHeading = deleteHeading;
        vm.deleteHTML = deleteHTML;
        vm.updateInput = updateInput;
        vm.deleteInput = deleteInput;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    if (widget != '0') {
                        vm.widget = widget;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function updateHTML(text) {
            if (text === undefined ||
                text === "" ||
                text === null) {
                vm.error = "Text field cannot be empty";
            } else {
                vm.widget.text = text;
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function (successMsgFromServer) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });

            }
        }

        function updateImage(name, text, url, width) {
            if (url === undefined ||
                url === "" ||
                url === null) {
                vm.error = "URL field cannot be empty";
            } else {
                vm.widget.name = name;
                vm.widget.text = text;
                vm.widget.url = url;
                vm.widget.width = width;
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function (successMsgFromServer) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            }
        }

        function deleteImage(localWidgetId) {
            WidgetService
                .deleteWidget(localWidgetId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function updateYoutube(name, text, url, width) {
            if (url === undefined ||
                url === "" ||
                url === null) {
                vm.error = "URL field cannot be empty";
            } else {
                vm.widget.name = name;
                vm.widget.text = text;
                vm.widget.url = url;
                vm.widget.width = width;
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function (successMsgFromServer) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            }
        }

        function deleteYoutube(localWidgetId) {
            WidgetService
                .deleteWidget(localWidgetId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function updateHeading(name, text, size) {
            if (text === undefined ||
                text === "" ||
                text === null) {
                vm.error = "Text field cannot be empty";
            } else {
                vm.widget.name = name;
                vm.widget.text = text;
                vm.widget.size = size;
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .success(function (successMsgFromServer) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            }
        }

        function deleteHeading(localWidgetId) {
            WidgetService
                .deleteWidget(localWidgetId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function deleteHTML(localWidgetId) {
            WidgetService
                .deleteWidget(localWidgetId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }

        function updateInput(text, rows, placeholder, formatted) {
            vm.widget.text = text;
            vm.widget.rows = rows;
            vm.widget.placeholder = placeholder;
            vm.widget.formatted = formatted;
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (successMsgFromServer) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

        }

        function deleteInput(localWidgetId) {
            WidgetService
                .deleteWidget(localWidgetId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
    }
})();