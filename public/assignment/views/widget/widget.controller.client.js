/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    var idGen = 900;

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        var widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        if(widgets != null){
            vm.widgets = widgets;
        }

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

        function createHeader() {
            idGen = idGen + 1;
            var newId = idGen.toString();
            var header = { "_id": newId, "widgetType": "HEADING", "pageId": vm.pageId, "size": 4, "text": "This is a new HEADER Widget"};
            WidgetService.createWidget(vm.pageId, header);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createHtml() {
            idGen = idGen + 1;
            var newId = idGen.toString();
            var html = { "_id": newId, "widgetType": "HTML", "pageId": vm.pageId, "text": "<p>This is a new HTML Widget</p>"};
            WidgetService.createWidget(vm.pageId, html);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createImage() {
            idGen = idGen + 1;
            var newId = idGen.toString();
            var image = { "_id": newId, "widgetType": "IMAGE", "pageId": vm.pageId, "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name":"", "text":""};
            WidgetService.createWidget(vm.pageId, image);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createYoutube() {
            idGen = idGen + 1;
            var newId = idGen.toString();
            var youtube = { "_id": newId, "widgetType": "YOUTUBE", "pageId": vm.pageId, "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService.createWidget(vm.pageId, youtube);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        var widget = WidgetService.findWidgetById(vm.widgetId);
        if(widget != null){
            vm.widget = widget;
        }

        vm.updateHTML = updateHTML;
        vm.updateImage = updateImage;
        vm.deleteImage = deleteImage;
        vm.updateYoutube = updateYoutube;
        vm.deleteYoutube = deleteYoutube;
        vm.updateHeading = updateHeading;
        vm.deleteHeading = deleteHeading;
        vm.deleteHTML = deleteHTML;

        function updateHTML(text) {
            if (text === undefined ||
                text === "" ||
                text === null) {
                vm.error = "Text field cannot be empty";
            } else {
                vm.widget.text = text;
                WidgetService.updateWidget(vm.widgetId, vm.widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
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
                widget.width = width;
                WidgetService.updateWidget(vm.widgetId, vm.widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }

        function deleteImage(localWidgetId) {
            WidgetService.deleteWidget(localWidgetId);
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
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
                widget.width = width;
                WidgetService.updateWidget(vm.widgetId, vm.widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }

        function deleteYoutube(localWidgetId) {
            WidgetService.deleteWidget(localWidgetId);
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
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
                WidgetService.updateWidget(vm.widgetId, vm.widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }

        function deleteHeading(localWidgetId) {
            WidgetService.deleteWidget(localWidgetId);
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }

        function deleteHTML(localWidgetId) {
            WidgetService.deleteWidget(localWidgetId);
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/");
        }
    }
})();