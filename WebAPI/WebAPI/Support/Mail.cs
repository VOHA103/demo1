using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Services;

namespace WebAPI.Support
{
    public static class Mail
    {
        public static readonly string From = "ngocnguyencute2001@gmail.com";
        public static readonly bool emailIsSSL = false;
        public static readonly string SmtpServer = "smtp.gmail.com";
        public static readonly int Port = 587;
        public static readonly string Username = "ngocnguyencute2001@gmail.com";
        public static readonly string Password = "hcqkaugecuyzdlzx";
        public static int sendMail(string email, string content)
        {
            var title = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(title, From));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = title;
            message.Body = new TextPart("html")
            {
                Text = content
            };
            using (var client = new SmtpClient())
            {
                client.Connect(SmtpServer, Port, emailIsSSL);
                client.Authenticate(Username, Password);

                client.Send(message);
                client.Disconnect(true);
            }
            return 1;
        }
        public static int send_password(string email, string pass)
        {
            var title = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(title, From));
            message.To.Add(new MailboxAddress("test", "thanhthaile160801@gmail.com"));
            message.Subject = title;
            //        var bodyBuilder = new BodyBuilder();
            //        bodyBuilder.HtmlBody = "";
            //        bodyBuilder.TextBody = "<h1 style='color:red`>Hello</h1>";
            //        var image = builder.LinkedResources.Add(@"C:\Users\Joey\Documents\Selfies\selfie.jpg");
            //        image.ContentId = MimeUtils.GenerateMessageId();
            //        message.Body =new TextPart("html") { Text = @"
            //<h1 style='color:red`>Hello</h1>" };
            var builder = new BodyBuilder();

            // Set the plain-text version of the message text
            builder.TextBody = @"Hey Alice,

                                What are you up to this weekend? Monica is throwing one of her parties on
                                Saturday and I was hoping you could make it.

                                Will you be my +1?

                                -- Joey
                                ";

            // In order to reference selfie.jpg from the html text, we'll need to add it
            // to builder.LinkedResources and then use its Content-Id value in the img src.

            //thêm image
            //var image = builder.LinkedResources.Add(@"C:\Users\Joey\Documents\Selfies\selfie.jpg");
            //image.ContentId = MimeUtils.GenerateMessageId();

            // Set the html version of the message text
            //nếu style thì dùng 2 dấu nháy đôi để nhận đc css ví dụ style=""color:red""
            builder.HtmlBody = string.Format(@"<p style=""color:red"">Hey Alice,<br>
                                    <p>What are you up to this weekend? Monica is throwing one of her parties on
                                    Saturday and I was hoping you could make it.<br>
                                    <p>Will you be my +1?<br>
                                    <p>-- Joey<br>
                                    <center><img src=""cid:{0}""></center>");

            // We may also want to attach a calendar event for Monica's party...
            //builder.Attachments.Add(@"C:\Users\Joey\Documents\party.ics");

            // Now we just need to set the message body and we're done
            message.Body = builder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                client.Connect(SmtpServer, Port, emailIsSSL);
                client.Authenticate(Username, Password);

                client.Send(message);
                client.Disconnect(true);
            }
            return 1;
        }
        public static int send_work(string email, string work)
        {
            var title = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(title, From));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = title;
            message.Body = new TextPart("plain")
            {
                Text = work
            };
            using (var client = new SmtpClient())
            {
                client.Connect(SmtpServer, Port, emailIsSSL);
                client.Authenticate(Username, Password);

                client.Send(message);
                client.Disconnect(true);
            }
            return 1;
        }
        //public static int sendMail(string email)
        //{
        //    var title = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
        //    var message = new MimeMessage();
        //    message.From.Add(new MailboxAddress(title, _email.Value.From));
        //    message.To.Add(new MailboxAddress("", email));
        //    message.Subject = title;
        //    message.Body = new TextPart("plain")
        //    {
        //        Text = "hello"
        //    };
        //    using (var client = new SmtpClient())
        //    {
        //        client.Connect(_email.Value.SmtpServer, (int)_email.Value.Port, _email.Value.emailIsSSL);
        //        client.Authenticate(_email.Value.Username, _email.Value.Password);

        //        client.Send(message);
        //        client.Disconnect(true);
        //    }
        //    return 1;
        //}
    }
}
