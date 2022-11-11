using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Services;

namespace WebAPI.Support
{
    public static class Mail
    {
        public static readonly string From= "ngocnguyencute2001@gmail.com";
        public static readonly bool emailIsSSL = false;
        public static readonly string SmtpServer = "smtp.gmail.com";
        public static readonly int Port = 587;
        public static readonly string Username = "ngocnguyencute2001@gmail.com";
        public static readonly string Password = "hcqkaugecuyzdlzx";
        public static int sendMail(string email,string content)
        {
            var title = "Trường đại học Công Nghiệp Thực Phẩm Thành phố Hồ Chí Minh";
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(title, From));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = title;
            message.Body = new TextPart("plain")
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
