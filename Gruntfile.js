/*!
  */
module.exports = function (grunt) {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  
  // Project configuration.
  grunt.initConfig({

    themePath: 'mytheme-1/',
	bootStrapPath: '../bootstrap/',
	targetCssPath: 'myproject-1/css/',
    
    // Task configuration.	
	clean: {
      after: ['<%=bootStrapPath%>less/bak']
    },
	
    copy: {
      backup: {
		expand: true,
		flatten: true,
		src: '<%= bootStrapPath %>less/variables.less',
		dest: 'bak/less/'
	  },
	  customise: {
	    expand: true,
		flatten: true,
		src: '<%= themePath %>less/variables.less',
        dest: '<%= bootStrapPath %>less/'
	  },
	  restore: {
		expand: true,
		flatten: true,
        src: 'bak/less/variables.less',
        dest: '<%=bootStrapPath%>/less/'
	  },
	  'update-target': {
		expand: true,
		flatten: true,
		src: '<%= bootStrapPath %>dist/css/*',
		dest: '<%= targetCssPath %>'
	  }
    },
	
	shell: {
	  buildBootstrap: {
		command: 'grunt dist',
		options: {
		  stdout: true,
		  execOptions: {
			cwd: '<%=bootStrapPath%>'
		  }
		}
	  }
	}	
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  grunt.registerTask('default', ['copy:backup', 'copy:customise', 'shell:buildBootstrap', 'copy:restore', 'copy:update-target' ]);
};
