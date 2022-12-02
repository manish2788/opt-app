module.exports = function(grunt) {
  const ChromeLauncher = require('chrome-launcher');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      start_server: {
        command: 'node server.js',
        options: {
          stdout: false,
          async:true,
        }
      },
      serve_app: {
        command: 'node node_modules/http-server/bin/http-server',
        options: {
          stdout: false,
          async:false,
        }
      },
    }
  });

  grunt.task.registerTask('launch', function() {
    let done = this.async();
    ChromeLauncher.launch({
      startingUrl: 'http://localhost:8080'
    }).then(chrome => {
      console.log(`Chrome debugging port running on ${chrome.port}`);
    });
  });

  process.on('exit', async function () {
    await ChromeLauncher.killAll();
  });

};