// *****************************************************
// Pull Issue Controller
//
// tmpl: pull/list.html
// path: /:user/:repo/pull/:number/:issue
// resolve: open, closed 
// *****************************************************

module.controller('PullIssueCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$HUB', '$RPC', 'issue', 'socket',
    function($rootScope, $scope, $state, $stateParams, $HUB, $RPC, issue, socket) {

        // get the issue
        $scope.issue = issue.value;

        // emit to parent controller (repo.pull)
        $scope.$emit('issue:set', issue.value);
        $scope.$emit('reference:set', [issue.value]);

        // switch the comparison view
        if($scope.issue.sha) {
            $scope.compComm($scope.issue.sha);
        }

        // get the comments
        $scope.comments = $HUB.call('issues', 'getComments', {
            user: $stateParams.user,
            repo: $stateParams.repo,
            number: $stateParams.issue
        });

        //
        // actions
        //

        $scope.toggle = function() {

            var state = $scope.issue.state==='open' ? 'closed' : 'open';

            $scope.toggling = $HUB.call('issues', 'edit', {
                user: $stateParams.user,
                repo: $stateParams.repo,
                number: $scope.issue.number,
                state: state
            }, function(err, issue) {
                if(!err) {
                    $scope.issue.state = issue.value.state;
                }
            });
        };

        $scope.addComment = function() {
            if($scope.comment) {
                $scope.commenting = $HUB.call('issues', 'createComment', {
                    user: $stateParams.user,
                    repo: $stateParams.repo,
                    number: $stateParams.issue,
                    body: $scope.comment
                }, function(err, comment) {
                    if(!err) {
                        $scope.comment = null;
                        $scope.comments.value.push(comment.value);
                    }
                });
            }
        };

        socket.on($stateParams.user + ':' + $stateParams.repo + ':issue-comment-' + $scope.issue.id, function(id) {
            $HUB.call('issues', 'getComment', {
                user: $stateParams.user,
                repo: $stateParams.repo,
                id: id
            }, function(err, comment) {
                if(!err && comment.value.user.id!==$rootScope.user.value.id) {
                  $scope.comments.value.push(comment.value);
                }
            });        
        });
    }
]);
