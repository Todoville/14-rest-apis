'use strict';

var app = app || {};

(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx, next) {
    app.showOnly('.admin-view');

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      // DONE: Is the token cleared out of local storage? Do you agree or disagree with this structure?
      // It is not cleared out of local storage. There is currently no way to remove admin status from someone who has obtained it so I think this needs more code. 
      $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/admin`, {token})
        .then(res => {
          if(res) {
            localStorage.token = true;
            page('/');
          } else {
            console.error('Invalid Login.');
          }
        })
        .catch(() => page('/'));
    })
  };

  adminView.verify = function(ctx, next) {
    if(!localStorage.token) $('.admin').addClass('admin-only');
    else $('.admin').show();
    next();
  }

  module.adminView = adminView;
})(app)