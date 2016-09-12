'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);

    //this.argument('projectname', { type: String, required: true });
    //this.log(this.projectname);
  },

  //ask for user input
  prompting: function() {
    var done = this.async();

    return this.prompt([
      {
        type: 'input',
        name: 'fedname',
        message: 'FED\'s name',
        default: 'FED'
      },
      {
        type: 'input',
        name: 'pmname',
        message: 'PM\'s name',
        default: 'PM'
      },
      {
        type: 'input',
        name: 'designername',
        message: 'Designer\'s name',
        default: 'Designer'
      },
      {
        type: 'input',
        name: 'schoolname',
        message: 'School name',
        default: 'School Name'
      },
      {
        type: 'input',
        name: 'projectname',
        message: 'Project Name (Will also be your branch name)',
        default: 'projectname'
      },
      {
        type: 'input',
        name: 'server',
        message: 'Server Number',
        default: '50'
      }
    ]).then(function(answers) {
        this.props = answers;
        this.log(answers.fedname);
        this.log(answers.schoolname);
        this.log(this.destinationRoot());
        this.log(this.sourceRoot());
        done();
    }.bind(this));
  },
  startProject: function() {
    //clone build into current directory
    this.spawnCommandSync('git', ['clone', 'https://alfredo.ramos@stash.fs4.us/scm/dpl/fs-composer-build.git','.'] );
    this.spawnCommandSync('git', ['checkout', '-b', 'clients/'+this.props.projectname]);

    //npm install
    //this.npmInstall();

    //generate .yo-rc
    this.config.save();
  },
  writing: function() {
    //copy the config files
    this.fs.copyTpl(
      this.templatePath('site-vars.js'),
      this.destinationPath('site-vars.js'), {
        fed: this.props.fedname,
        pm: this.props.pmname,
        designer: this.props.designername,
        school: this.props.schoolname,
        project: this.props.projectname,
        server: this.props.server
      }
    );
  }
  // prompting: function () {
  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the astonishing ' + chalk.red('generator-finalsite-yeoman') + ' generator!'
  //   ));
  //
  //   var prompts = [{
  //     type: 'confirm',
  //     name: 'someAnswer',
  //     message: 'Would you like to enable this option?',
  //     default: true
  //   }];
  //
  //   return this.prompt(prompts).then(function (props) {
  //     // To access props later use this.props.someAnswer;
  //     this.props = props;
  //   }.bind(this));
  // },
  //
  // writing: function () {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // },
  //
  // install: function () {
  //   this.installDependencies();
  // }
});
