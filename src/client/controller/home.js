// *****************************************************
// Home Controller
//
// tmpl: home.html
// path: /
// *****************************************************

module.controller('HomeCtrl', ['$scope', '$stateParams', '$HUB', '$RPC', function($scope, $stateParams, $HUB, $RPC) {

	// get the user
	$scope.user = $HUB.call('user', 'get');

	// get all user repos
	$scope.repos = $HUB.call('repos', 'getAll', {
		type: 'all'
	}, function(err, repos) {
		$scope.repos.value.forEach(function(repo) {

			// get ninja repo
			$RPC.call('repo', 'get', {
				user: repo.owner.login,
				repo: repo.name,
				uuid: repo.id
			}, function(err, ninja) {
				repo.ninja = ninja.value || { ninja: false };
			});
		});
	});

	//
	// Actions
	//

	$scope.add = function(repo) {
		$RPC.call('repo', 'add', {
			user: repo.owner.login,
			repo: repo.name,
			uuid: repo.id
		}, function(err, ninja) {
			if(!err) {
				repo.ninja = ninja.value;
			}
		});
	};

	$scope.rmv = function(repo) {
		$RPC.call('repo', 'rmv', {
			user: repo.owner.login,
			repo: repo.name,
			uuid: repo.id
		}, function(err, ninja) {
			if(!err) {
				repo.ninja = ninja.value;
			}
		});
	};

}]);
