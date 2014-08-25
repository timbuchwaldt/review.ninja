require('trace.ninja');

var http = require('http');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');

// unit test
var assert = require('assert');
var sinon = require('sinon');

// config
global.config = require('../../../config');

// models
var User = require('../../../server/documents/user').User;
var Repo = require('../../../server/documents/repo').Repo;
var Star = require('../../../server/documents/star').Star;
var Settings = require('../../../server/documents/settings').Settings;

//services
var github = require('../../../server/services/github');
var notification = require('../../../server/services/notification');
var status = require('../../../server/services/status');

// webhook
var PullRequest = require('../../../server/webhooks/pull_request');

describe('pull_request:opened', function(){

    before(function(){
        global.config = {
            server: {
                http: {
                    host: 'host',
                    port:8000
                }
            }
        };
    });


    it('should send notification', function(done){

      stub_github_status_api = sinon.stub(status, 'update', function(args,done){
        done();
      });

      stub_repo_with=  sinon.stub(Repo,'with', function(args,done){
          var err = null;
          var repo = {
              ninja:true,
              token:'token'
          };
      });

    var req = 
        {
            args:{
                
  'action': 'opened',
  'number': 48,
  'pull_request': {
    'url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48',
    'id': 18905849,
    'html_url': 'https://github.com/baxterthehacker/public-repo/pull/48',
    'diff_url': 'https://github.com/baxterthehacker/public-repo/pull/48.diff',
    'patch_url': 'https://github.com/baxterthehacker/public-repo/pull/48.patch',
    'issue_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/48',
    'number': 48,
    'state': 'open',
    'title': 'Update the README with new information',
    'user': {
      'login': 'baxterthehacker',
      'id': 6752317,
      'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
      'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
      'url': 'https://api.github.com/users/baxterthehacker',
      'html_url': 'https://github.com/baxterthehacker',
      'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
      'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
      'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
      'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
      'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
      'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
      'type': 'User',
      'site_admin': false
    },
    'body': 'This is a pretty simple change that we need to pull into master.',
    'created_at': '2014-07-25T16:37:42Z',
    'updated_at': '2014-07-25T16:37:42Z',
    'closed_at': null,
    'merged_at': null,
    'merge_commit_sha': null,
    'assignee': null,
    'milestone': null,
    'commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48/commits',
    'review_comments_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48/comments',
    'review_comment_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/comments/{number}',
    'comments_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/48/comments',
    'statuses_url': 'https://api.github.com/repos/baxterthehacker/public-repo/statuses/05c588ba8cd510ecbe112d020f215facb17817a6',
    'head': {
      'label': 'baxterthehacker:changes',
      'ref': 'changes',
      'sha': '05c588ba8cd510ecbe112d020f215facb17817a6',
      'user': {
        'login': 'baxterthehacker',
        'id': 6752317,
        'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
        'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
        'url': 'https://api.github.com/users/baxterthehacker',
        'html_url': 'https://github.com/baxterthehacker',
        'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
        'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
        'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
        'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
        'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
        'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
        'type': 'User',
        'site_admin': false
      },
      'repo': {
        'id': 20000106,
        'name': 'public-repo',
        'full_name': 'baxterthehacker/public-repo',
        'owner': {
          'login': 'baxterthehacker',
          'id': 6752317,
          'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
          'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
          'url': 'https://api.github.com/users/baxterthehacker',
          'html_url': 'https://github.com/baxterthehacker',
          'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
          'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
          'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
          'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
          'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
          'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
          'type': 'User',
          'site_admin': false
        },
        'private': false,
        'html_url': 'https://github.com/baxterthehacker/public-repo',
        'description': '',
        'fork': false,
        'url': 'https://api.github.com/repos/baxterthehacker/public-repo',
        'forks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/forks',
        'keys_url': 'https://api.github.com/repos/baxterthehacker/public-repo/keys{/key_id}',
        'collaborators_url': 'https://api.github.com/repos/baxterthehacker/public-repo/collaborators{/collaborator}',
        'teams_url': 'https://api.github.com/repos/baxterthehacker/public-repo/teams',
        'hooks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/hooks',
        'issue_events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/events{/number}',
        'events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/events',
        'assignees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/assignees{/user}',
        'branches_url': 'https://api.github.com/repos/baxterthehacker/public-repo/branches{/branch}',
        'tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/tags',
        'blobs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/blobs{/sha}',
        'git_tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/tags{/sha}',
        'git_refs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/refs{/sha}',
        'trees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/trees{/sha}',
        'statuses_url': 'https://api.github.com/repos/baxterthehacker/public-repo/statuses/{sha}',
        'languages_url': 'https://api.github.com/repos/baxterthehacker/public-repo/languages',
        'stargazers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/stargazers',
        'contributors_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contributors',
        'subscribers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscribers',
        'subscription_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscription',
        'commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/commits{/sha}',
        'git_commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/commits{/sha}',
        'comments_url': 'https://api.github.com/repos/baxterthehacker/public-repo/comments{/number}',
        'issue_comment_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/comments/{number}',
        'contents_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contents/{+path}',
        'compare_url': 'https://api.github.com/repos/baxterthehacker/public-repo/compare/{base}...{head}',
        'merges_url': 'https://api.github.com/repos/baxterthehacker/public-repo/merges',
        'archive_url': 'https://api.github.com/repos/baxterthehacker/public-repo/{archive_format}{/ref}',
        'downloads_url': 'https://api.github.com/repos/baxterthehacker/public-repo/downloads',
        'issues_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues{/number}',
        'pulls_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls{/number}',
        'milestones_url': 'https://api.github.com/repos/baxterthehacker/public-repo/milestones{/number}',
        'notifications_url': 'https://api.github.com/repos/baxterthehacker/public-repo/notifications{?since,all,participating}',
        'labels_url': 'https://api.github.com/repos/baxterthehacker/public-repo/labels{/name}',
        'releases_url': 'https://api.github.com/repos/baxterthehacker/public-repo/releases{/id}',
        'created_at': '2014-05-20T22:39:43Z',
        'updated_at': '2014-07-01T17:21:25Z',
        'pushed_at': '2014-07-25T16:37:42Z',
        'git_url': 'git://github.com/baxterthehacker/public-repo.git',
        'ssh_url': 'git@github.com:baxterthehacker/public-repo.git',
        'clone_url': 'https://github.com/baxterthehacker/public-repo.git',
        'svn_url': 'https://github.com/baxterthehacker/public-repo',
        'homepage': null,
        'size': 612,
        'stargazers_count': 0,
        'watchers_count': 0,
        'language': null,
        'has_issues': true,
        'has_downloads': true,
        'has_wiki': true,
        'forks_count': 0,
        'mirror_url': null,
        'open_issues_count': 25,
        'forks': 0,
        'open_issues': 25,
        'watchers': 0,
        'default_branch': 'master'
      }
    },
    'base': {
      'label': 'baxterthehacker:master',
      'ref': 'master',
      'sha': '69a8b72e2d3d955075d47f03d902929dcaf74033',
      'user': {
        'login': 'baxterthehacker',
        'id': 6752317,
        'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
        'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
        'url': 'https://api.github.com/users/baxterthehacker',
        'html_url': 'https://github.com/baxterthehacker',
        'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
        'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
        'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
        'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
        'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
        'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
        'type': 'User',
        'site_admin': false
      },
      'repo': {
        'id': 20000106,
        'name': 'public-repo',
        'full_name': 'baxterthehacker/public-repo',
        'owner': {
          'login': 'baxterthehacker',
          'id': 6752317,
          'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
          'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
          'url': 'https://api.github.com/users/baxterthehacker',
          'html_url': 'https://github.com/baxterthehacker',
          'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
          'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
          'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
          'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
          'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
          'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
          'type': 'User',
          'site_admin': false
        },
        'private': false,
        'html_url': 'https://github.com/baxterthehacker/public-repo',
        'description': '',
        'fork': false,
        'url': 'https://api.github.com/repos/baxterthehacker/public-repo',
        'forks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/forks',
        'keys_url': 'https://api.github.com/repos/baxterthehacker/public-repo/keys{/key_id}',
        'collaborators_url': 'https://api.github.com/repos/baxterthehacker/public-repo/collaborators{/collaborator}',
        'teams_url': 'https://api.github.com/repos/baxterthehacker/public-repo/teams',
        'hooks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/hooks',
        'issue_events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/events{/number}',
        'events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/events',
        'assignees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/assignees{/user}',
        'branches_url': 'https://api.github.com/repos/baxterthehacker/public-repo/branches{/branch}',
        'tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/tags',
        'blobs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/blobs{/sha}',
        'git_tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/tags{/sha}',
        'git_refs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/refs{/sha}',
        'trees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/trees{/sha}',
        'statuses_url': 'https://api.github.com/repos/baxterthehacker/public-repo/statuses/{sha}',
        'languages_url': 'https://api.github.com/repos/baxterthehacker/public-repo/languages',
        'stargazers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/stargazers',
        'contributors_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contributors',
        'subscribers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscribers',
        'subscription_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscription',
        'commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/commits{/sha}',
        'git_commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/commits{/sha}',
        'comments_url': 'https://api.github.com/repos/baxterthehacker/public-repo/comments{/number}',
        'issue_comment_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/comments/{number}',
        'contents_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contents/{+path}',
        'compare_url': 'https://api.github.com/repos/baxterthehacker/public-repo/compare/{base}...{head}',
        'merges_url': 'https://api.github.com/repos/baxterthehacker/public-repo/merges',
        'archive_url': 'https://api.github.com/repos/baxterthehacker/public-repo/{archive_format}{/ref}',
        'downloads_url': 'https://api.github.com/repos/baxterthehacker/public-repo/downloads',
        'issues_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues{/number}',
        'pulls_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls{/number}',
        'milestones_url': 'https://api.github.com/repos/baxterthehacker/public-repo/milestones{/number}',
        'notifications_url': 'https://api.github.com/repos/baxterthehacker/public-repo/notifications{?since,all,participating}',
        'labels_url': 'https://api.github.com/repos/baxterthehacker/public-repo/labels{/name}',
        'releases_url': 'https://api.github.com/repos/baxterthehacker/public-repo/releases{/id}',
        'created_at': '2014-05-20T22:39:43Z',
        'updated_at': '2014-07-01T17:21:25Z',
        'pushed_at': '2014-07-25T16:37:42Z',
        'git_url': 'git://github.com/baxterthehacker/public-repo.git',
        'ssh_url': 'git@github.com:baxterthehacker/public-repo.git',
        'clone_url': 'https://github.com/baxterthehacker/public-repo.git',
        'svn_url': 'https://github.com/baxterthehacker/public-repo',
        'homepage': null,
        'size': 612,
        'stargazers_count': 0,
        'watchers_count': 0,
        'language': null,
        'has_issues': true,
        'has_downloads': true,
        'has_wiki': true,
        'forks_count': 0,
        'mirror_url': null,
        'open_issues_count': 25,
        'forks': 0,
        'open_issues': 25,
        'watchers': 0,
        'default_branch': 'master'
      }
    },
    '_links': {
      'self': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48'
      },
      'html': {
        'href': 'https://github.com/baxterthehacker/public-repo/pull/48'
      },
      'issue': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/48'
      },
      'comments': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/48/comments'
      },
      'review_comments': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48/comments'
      },
      'review_comment': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/comments/{number}'
      },
      'commits': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls/48/commits'
      },
      'statuses': {
        'href': 'https://api.github.com/repos/baxterthehacker/public-repo/statuses/05c588ba8cd510ecbe112d020f215facb17817a6'
      }
    },
    'merged': false,
    'mergeable': null,
    'mergeable_state': 'unknown',
    'merged_by': null,
    'comments': 0,
    'review_comments': 1,
    'commits': 1,
    'additions': 2,
    'deletions': 0,
    'changed_files': 1
  },
  'repository': {
    'id': 20000106,
    'name': 'public-repo',
    'full_name': 'baxterthehacker/public-repo',
    'owner': {
      'login': 'baxterthehacker',
      'id': 6752317,
      'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
      'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
      'url': 'https://api.github.com/users/baxterthehacker',
      'html_url': 'https://github.com/baxterthehacker',
      'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
      'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
      'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
      'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
      'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
      'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
      'type': 'User',
      'site_admin': false
    },
    'private': false,
    'html_url': 'https://github.com/baxterthehacker/public-repo',
    'description': '',
    'fork': false,
    'url': 'https://api.github.com/repos/baxterthehacker/public-repo',
    'forks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/forks',
    'keys_url': 'https://api.github.com/repos/baxterthehacker/public-repo/keys{/key_id}',
    'collaborators_url': 'https://api.github.com/repos/baxterthehacker/public-repo/collaborators{/collaborator}',
    'teams_url': 'https://api.github.com/repos/baxterthehacker/public-repo/teams',
    'hooks_url': 'https://api.github.com/repos/baxterthehacker/public-repo/hooks',
    'issue_events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/events{/number}',
    'events_url': 'https://api.github.com/repos/baxterthehacker/public-repo/events',
    'assignees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/assignees{/user}',
    'branches_url': 'https://api.github.com/repos/baxterthehacker/public-repo/branches{/branch}',
    'tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/tags',
    'blobs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/blobs{/sha}',
    'git_tags_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/tags{/sha}',
    'git_refs_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/refs{/sha}',
    'trees_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/trees{/sha}',
    'statuses_url': 'https://api.github.com/repos/baxterthehacker/public-repo/statuses/{sha}',
    'languages_url': 'https://api.github.com/repos/baxterthehacker/public-repo/languages',
    'stargazers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/stargazers',
    'contributors_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contributors',
    'subscribers_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscribers',
    'subscription_url': 'https://api.github.com/repos/baxterthehacker/public-repo/subscription',
    'commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/commits{/sha}',
    'git_commits_url': 'https://api.github.com/repos/baxterthehacker/public-repo/git/commits{/sha}',
    'comments_url': 'https://api.github.com/repos/baxterthehacker/public-repo/comments{/number}',
    'issue_comment_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues/comments/{number}',
    'contents_url': 'https://api.github.com/repos/baxterthehacker/public-repo/contents/{+path}',
    'compare_url': 'https://api.github.com/repos/baxterthehacker/public-repo/compare/{base}...{head}',
    'merges_url': 'https://api.github.com/repos/baxterthehacker/public-repo/merges',
    'archive_url': 'https://api.github.com/repos/baxterthehacker/public-repo/{archive_format}{/ref}',
    'downloads_url': 'https://api.github.com/repos/baxterthehacker/public-repo/downloads',
    'issues_url': 'https://api.github.com/repos/baxterthehacker/public-repo/issues{/number}',
    'pulls_url': 'https://api.github.com/repos/baxterthehacker/public-repo/pulls{/number}',
    'milestones_url': 'https://api.github.com/repos/baxterthehacker/public-repo/milestones{/number}',
    'notifications_url': 'https://api.github.com/repos/baxterthehacker/public-repo/notifications{?since,all,participating}',
    'labels_url': 'https://api.github.com/repos/baxterthehacker/public-repo/labels{/name}',
    'releases_url': 'https://api.github.com/repos/baxterthehacker/public-repo/releases{/id}',
    'created_at': '2014-05-20T22:39:43Z',
    'updated_at': '2014-07-25T16:37:43Z',
    'pushed_at': '2014-07-25T16:37:42Z',
    'git_url': 'git://github.com/baxterthehacker/public-repo.git',
    'ssh_url': 'git@github.com:baxterthehacker/public-repo.git',
    'clone_url': 'https://github.com/baxterthehacker/public-repo.git',
    'svn_url': 'https://github.com/baxterthehacker/public-repo',
    'homepage': null,
    'size': 612,
    'stargazers_count': 0,
    'watchers_count': 0,
    'language': null,
    'has_issues': true,
    'has_downloads': true,
    'has_wiki': true,
    'forks_count': 1,
    'mirror_url': null,
    'open_issues_count': 25,
    'forks': 1,
    'open_issues': 25,
    'watchers': 0,
    'default_branch': 'master'
  },
  'sender': {
    'login': 'baxterthehacker',
    'id': 6752317,
    'avatar_url': 'https://avatars.githubusercontent.com/u/6752317?',
    'gravatar_id': '258ae60b5512c8402b93673b7478d9c6',
    'url': 'https://api.github.com/users/baxterthehacker',
    'html_url': 'https://github.com/baxterthehacker',
    'followers_url': 'https://api.github.com/users/baxterthehacker/followers',
    'following_url': 'https://api.github.com/users/baxterthehacker/following{/other_user}',
    'gists_url': 'https://api.github.com/users/baxterthehacker/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/baxterthehacker/subscriptions',
    'organizations_url': 'https://api.github.com/users/baxterthehacker/orgs',
    'repos_url': 'https://api.github.com/users/baxterthehacker/repos',
    'events_url': 'https://api.github.com/users/baxterthehacker/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/baxterthehacker/received_events',
    'type': 'User',
    'site_admin': false
  }
}

    };
      var res= {
          end: function(){
              done();
          }
      };

      var pull_request = new PullRequest(req,res);

    });

});
