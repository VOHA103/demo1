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
            var builder = new BodyBuilder();

            builder.HtmlBody = string.Format(@"
           <div style="" width: 100%; height: 600px; margin-top: 10px; text-align: center;"">
                <div  style=""height:30px; width: 100%;background-color:white;   margin-top: 12px;width: 100%; margin-bottom: 100px"">
                    <table  style="" border-collapse: collapse; border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; border: 0px solid white;width: 100%; margin: 2xp 3px 2px 3px;  margin-top: 30px;top: 12px; "" >
                        <thead style=""  font-weight: 100;font-size: 23px; text-align: left;  font-weight: 1px;"">

                            <tr style = ""border: 0px solid white; text-align: center;  height: 100px;"" >

                                <th style = "" border-top: 0px solid #ccc; border-bottom: 0.001px solid #ccc; border: 0px solid white;width:200px ;  padding: 10px; padding-left: 30px; border-right: 0px solid #ccc; "">
                                        <img  style = ""width:150px;height: 150px; ""
                                          src=""cid:{0}""</th>
                                <td style = "" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid white;font-size: 50px; font-weight: 50px;color: blue; font-family: Verdana, Geneva, Tahoma;"" >
                                        Trường Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh
                                </td>
                            </tr>

                        </thead>
                    </table>
                </div>
                <div style=""margin: 200px 0 12px 0;margin-top: 300px;"">
                    <div style = ""text-align: left; margin-left:50px;margin-top: 100px;"" >
                        <div style=""font-size: 20px; font-weight: bold;margin-bottom: 30px;  margin-top: 100px; "" ><label>Thông tin mật khẩu</label></div>
        
                        <div style=""font-size: 15px; "">
                            <label>Mật khẩu mới:</label>
                            <label style = ""font-size:30px;font-weight: bold;"" > 1234 </label >
                        </div >
                    </div >
                </div >
                <div style="" margin-top: 90px; height:200px; width: 100%;background-color: rgb(11, 22, 35) ; border: 2px solid rgb(5, 28, 131);"">
                    <div
                        style = "" height: 20px;font-size: 20px; margin-bottom: 5px; font-weight: bold;color: white;"" >
                        THÔNG TIN LIÊN HỆ</div>
                    <div style = ""display: flex;"" >
                        <div >
                            <table  style="" border-collapse: collapse; border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; margin-left:100px; width: 100%; margin-top: 12px;width: 100%; margin-bottom: 100px; "">
                                <thead style="" font-weight: 100; font-size: 23px;text-align: left; font-weight: 1px;"">
                                    <tr style="" height: 20px; font-size: 12px;  font-weight: bold;  color: white;  border: 0px solid #ccc;"">
                                        <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Đơn vị</th>
                                        <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;""> Trường Đại học Công nghiệp Thực phẩm TP.Hồ Chí Minh</td>
                                    </tr>
                                    <tr style=""height: 20px; font-size: 12px; font-weight: bold;color: white;"">
                                        <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Địa chỉ</th>
                                        <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh</td>
                                    </tr>
                                    <tr style=""  height: 20px; font-size: 12px;font-weight: bold; color: white; "">
                                        <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Điện thoại</th>
                                        <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;""> 096 205 10 80</td>
                                    </tr>
                                    <tr style="" height: 20px;font-size: 12px; font-weight: bold; color: white;"">
                                        <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Email</th>
                                        <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">infor @hufi.edu.vn</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div style = ""margin-left: 300px;margin-top: 10px;"" >
                            <iframe style=""width: 550px; height: 160px; border: 0; allowfullscreen: rgb(241, 243, 249); loading: lazy; referrerpolicy: no - referrer - when - downgrade;""
                                src = ""https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.062476657444!2d106.6266730146227!3d10.806526992301109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be2853ce7cd%3A0x4111b3b3c2aca14a!2zMTQwIEzDqiBUcuG7jW5nIFThuqVuLCBTxqFuIEvhu7MsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1668411386001!5m2!1sen!2s"" >
                                </iframe >
                         </div >
                    </div >
                </div >
            </div >
");
            var image = builder.LinkedResources.Add(@"../Resources/Images/logo_hufi.jfif");
            image.ContentId = MimeUtils.GenerateMessageId();
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

            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(@" 
                  <div style="" width: 100%; height: 600px; margin-top: 10px; text-align: center;"">
                    <div  style=""border-collapse: collapse; height:30px; width: 100%;background-color:white;   margin-top: 1px;width: 100%; margin-bottom: 100px"">
                        <table  style="" border-collapse: collapse; border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; border: 0px solid white;width: 100%; margin: 2xp 3px 2px 3px;  margin-top: 10px;top: 12px; "" >
                            <thead style=""  font-weight: 100;font-size: 23px; text-align: left;  font-weight: 1px;"">

                                <tr style = ""border: 0px solid white; text-align: center;  height: 100px;"" >

                                    <th style = ""border-collapse: collapse; border-top: 0px solid #ccc; border-bottom: 0.001px solid #ccc; border: 0px solid white;width:200px ;  padding: 10px; padding-left: 30px; border-right: 0px solid #ccc; "">
                                            <img  style = ""width:150px;height: 150px; ""
                                           src=""cid:{0}""</th>
                                    <td style = ""border-collapse: collapse; border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid white;font-size: 50px; font-weight: 50px;color: blue; font-family: Verdana, Geneva, Tahoma;"" >
                                            Trường Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh
                                    </td>
                                </tr>

                            </thead>
                        </table>
                    </div>
                    <div class="""" style=""margin: 150px 0 12px 0;"">
                        <di><label style=""width: 100%; margin: 2xp 3px 2px 3px;  font-size: 30px;font-weight: bold; color: rgb(4, 4, 75); max-width: max-content;"">THÔNG TIN CÔNG VIỆC GIẢNG VIÊN</label></di>
                        <table  style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; border: 1px solid #ccc; margin-top: 30px; top: 12px; width: 100%; margin: 2xp 3px 2px 3px; border-collapse: collapse;"" >
                            <thead style=""font-weight: 100; font-size: 23px;text-align: left;"">

                                <tr>
                                    <th style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; width:200px ;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;"">Tên công việc</th>
                                    <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;""></td>
                                </tr>

                                <tr>

                                    <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; width:200px ;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;"">Ngày bắt đầu</th>
                                    <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;""></td>
                                </tr>

                                <tr>

                                    <th style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; width:200px ;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;"">Giờ bắt đầu </th>
                                    <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;""></td>
                                </tr>
                                <tr>
                                    <th style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; width:200px ;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;"">Số giờ</th>
                                    <td style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;""> </td>
                                </tr>
                                <tr>

                                    <th style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; width: 200px;padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;"">Ghi chú</th>
                                    <td style=""border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;""></td>

                                </tr>
                            </thead>
                        </table>

                    </div>

                    <div style=""border-collapse: collapse; margin-top: 20px; height:200px; width: 100%;background-color: rgb(11, 22, 35) ; border: 2px solid rgb(5, 28, 131);"">
                        <div
                            style = "" height: 20px;font-size: 20px; margin-bottom: 5px; font-weight: bold;color: white;"" >
                            THÔNG TIN LIÊN HỆ</div>
                        <div style = ""display: flex;"" >
                            <div >
                                <table  style=""border-collapse: collapse; border-collapse: collapse; border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; margin-left:100px; width: 100%; margin-top: 12px;width: 100%; margin-bottom: 100px; "">
                                    <thead style="" font-weight: 100; font-size: 23px;text-align: left; font-weight: 1px;"">
                                        <tr style="" height: 20px; font-size: 12px;  font-weight: bold;  color: white;  border: 0px solid #ccc;"">
                                            <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Đơn vị</th>
                                            <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;""> Trường Đại học Công nghiệp Thực phẩm TP.Hồ Chí Minh</td>
                                        </tr>
                                        <tr style=""height: 20px; font-size: 12px; font-weight: bold;color: white;"">
                                            <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Địa chỉ</th>
                                            <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh</td>
                                        </tr>
                                        <tr style=""  height: 20px; font-size: 12px;font-weight: bold; color: white; "">
                                            <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Điện thoại</th>
                                            <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;""> 096 205 10 80</td>
                                        </tr>
                                        <tr style="" height: 20px;font-size: 12px; font-weight: bold; color: white;"">
                                            <th style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">Email</th>
                                            <td style="" border-top: 0.001px solid #ccc; border-bottom: 0.001px solid #ccc; padding: 10px; padding-left: 30px; border-right: 0.001px solid #ccc;  border: 0px solid #ccc;"">infor @hufi.edu.vn</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div style = ""margin-left: 300px;margin-top: 10px;border-collapse: collapse;"" >
                                <iframe style=""width: 550px; height: 160px; border: 0; allowfullscreen: rgb(241, 243, 249); loading: lazy; referrerpolicy: no - referrer - when - downgrade;""
                                    src = ""https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.062476657444!2d106.6266730146227!3d10.806526992301109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be2853ce7cd%3A0x4111b3b3c2aca14a!2zMTQwIEzDqiBUcuG7jW5nIFThuqVuLCBTxqFuIEvhu7MsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1668411386001!5m2!1sen!2s"" >
                                </iframe >
                             </div >
                        </div >
                    </div >
                </div >
");

            var image = builder.LinkedResources.Add(@"../Resources/Images/logo_hufi.jfif");

            image.ContentId = MimeUtils.GenerateMessageId();

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
