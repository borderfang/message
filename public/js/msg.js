var Msg = angular.module("Msg", []);
Msg.controller("msgCtrl", ["$scope", "$http", function($scope, $http) {

	$scope.messages = [];
	$scope.pages = [];
	//获取所有的留言数量；
	$http.get("/getallcounts", {

	}).success( function(res) {
		var a = Math.ceil(res/5);
		console.log(a);
		for(var i = 1; i <= a; i ++) {
			$scope.pages.push(i);
		}

	}).error( function() {
		alert("获取失败");
	})
	//显示留言；
	function getPage(p) {
		$http.get("/allmessage", {
				params: {page: p-1}
			}).success( function(res) {
				$scope.messages = res;
			}).error( function() {

		})
	}
	getPage(1)
	$scope.getMsg = getPage;
	//提交留言；
	$scope.subMsg = function() {
		$http.get("domessage", {
			params: {"content": $scope.newMsg, "act": 0, "no": 0}
		}).success( function(res) {
			$scope.messages.unshift({
				"id": res._id,
				"content": $scope.newMsg,
				"time": res.time,
				"act": 0,
				"no": 0
			});
			if($scope.messages.length > 5) {
				$scope.messages.pop();
			}
			$scope.newMsg = "";
			console.log($scope.messages);
		}).error( function() {
			alert("提交失败");
		})
	}
	//点赞；
	$scope.addStart = function(id) {
		for(var i =0; i < $scope.messages.length; i ++){
			if($scope.messages[i]._id == id){
				$scope.messages[i].act++;

				$http.get("/getstart", {
						params: {"id": id, "act": $scope.messages[i].act}
				}).success( function(res) {
					
				}).error( function() {
					alert("sorry, it is field");
				})
			}
		}
	}
	//取消赞；
	$scope.noStart = function(id) {
		for(var i =0; i < $scope.messages.length; i ++){
			if($scope.messages[i]._id == id){
				$scope.messages[i].no++;

				$http.get("/nostart", {
						params: {"id": id, "no": $scope.messages[i].no}
				}).success( function(res) {
					
				}).error( function() {
					alert("sorry, it is field");
				})
			}
		}
	}
	//删除；
	$scope.delete = function(id, message) {
		for(var i = 0; i < $scope.messages.length; i ++){
			if($scope.messages[i]._id == id){
				$http.get("/rmmsg",{
					params: {"id": id}
				}).success( function(res) {
					$scope.messages.splice($scope.messages.indexOf(message), 1);
				}).error( function() {
					alert("删除失败");
				})

			}
		}
	}
	

}])