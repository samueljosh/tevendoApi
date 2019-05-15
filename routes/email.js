const express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;
const async = require('async');



function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
     const sg = require('sendgrid')   ('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');
     async.parallel([
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }

          });
        }
        // return
        callback(null, true);
      }
    ], function(err, results) {
      console.log('Done');
    });
    parentCallback(null,
      {
        successfulEmails: successfulEmails,
        errorEmails: errorEmails,
      }
    );
}

router.post('/send', (req, res, next) => {
    async.parallel([
        function (callback) {
          sendEmail(
            callback,
            'YOUR_FROM_EMAIL@example.com',
            ['YOUR_TO_EMAIL1@example.com', 'YOUR_TO_EMAIL2@example.com'],
            'Subject Line',
            'Text Content',
            '<p style="font-size: 32px;">HTML Content</p>'
          );
        }
      ], function(err, results) {
        res.send({
          success: true,
          message: 'Emails sent',
          successfulEmails: results[0].successfulEmails,
          errorEmails: results[0].errorEmails,
        });
      });
});

module.exports = router;