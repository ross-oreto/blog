'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');
var chalk = require('chalk');
var swig = require('swig');
var moment = require('moment');
var spawn = require('hexo-util/lib/spawn');
var parseConfig = require('./parse_config');

var swigHelpers = {
    now: function(format) {
        return moment().format(format);
    }
};

module.exports = function(args) {
    var baseDir = this.base_dir;
    var deployDir = pathFn.join(baseDir);
    var sourceDir = pathFn.join(baseDir, 'source');
    var publicDir = this.public_dir;
    var log = this.log;
    var message = commitMessage(args);
    var verbose = !args.silent;

    if (!args.repo && !args.repository) {
        var help = '';

        help += 'You have to configure the deployment settings in _config.yml first!\n\n';
        help += 'Example:\n';
        help += '  deploy:\n';
        help += '    type: git\n';
        help += '    repo: <repository url>\n';
        help += '    branch: [branch]\n';
        help += '    message: [message]\n\n';
        help += 'For more help, you can check the docs: ' + chalk.underline('http://hexo.io/docs/deployment.html');

        console.log(help);
        return;
    }

    function git() {
        var len = arguments.length;
        var args = new Array(len);

        for (var i = 0; i < len; i++) {
            args[i] = arguments[i];
        }
        return spawn('git', args, {
            cwd: deployDir,
            verbose: verbose
        });
    }

    function setup() {
        var userName = args.name || args.user || args.userName || '';
        var userEmail = args.email || args.userEmail || '';

        // Create a placeholder for the first commit
        return fs.writeFile(pathFn.join(deployDir, 'placeholder'), '').then(function() {
            return git('init');
        }).then(function() {
            return userName && git('config', 'user.name', userName);
        }).then(function() {
            return userEmail && git('config', 'user.email', userEmail);
        }).then(function() {
            return git('add', '-A');
        }).then(function() {
            return git('commit', '-m', 'First commit');
        });
    }

    function push(repo) {
        return git('add', '-A').then(function() {
            return git('commit', '-m', message).catch(function() {
                // Do nothing. It's OK if nothing to commit.
            });
        }).then(function() {
            return git('push', '-u', repo.url, 'HEAD:' + repo.branch, '--force');
        });
    }

    function pushBack(repo) {
        return git('add', '-A').then(function() {
            return git('commit', '-m', message).catch(function() {
                // Do nothing. It's OK if nothing to commit.
            });
        }).then(function() {
            return git('push', 'HEAD:' + repo.branch, '--force');
        });
    }

    var checkoutDir = pathFn.join(baseDir, '.deploy_gitback');
    var blogRepo = "https://ross-oreto:" + process.env.GITHUB_PASSWORD + "@github.com/ross-oreto/blog";
    return fs.exists(checkoutDir).then(function(exist) {
        if (!exist) {
            return git('checkout', blogRepo, checkoutDir).then(function () {
                deployDir = checkoutDir;
                var userName = args.name || args.user || args.userName || '';
                var userEmail = args.email || args.userEmail || '';
                git('config', 'user.name', userName);
                return git('config', 'user.email', userEmail);
            });
        } else deployDir = checkoutDir;
    }).then(function () {
        return fs.copyDir(sourceDir, pathFn.join(deployDir, 'source'));
    }).then(function () {
        return pushBack({url: blogRepo, branch: 'master'});
    }).then(function () {
        deployDir = pathFn.join(baseDir, '.deploy_git');
        return fs.exists(deployDir).then(function(exist) {
            if (exist) return;

            log.info('Setting up Git deployment...');
            return setup();
        }).then(function() {
            log.info('Clearing .deploy_git folder...');
            return fs.emptyDir(deployDir);
        }).then(function() {
            log.info('Copying files from public folder...');
            return fs.copyDir(publicDir, deployDir);
        }).then(function() {
            return parseConfig(args);
        }).each(function(repo) {
            return push(repo);
        });
    });
};

function commitMessage(args) {
    var message = args.m || args.msg || args.message || 'Site updated: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}';
    return swig.compile(message)(swigHelpers);
}
