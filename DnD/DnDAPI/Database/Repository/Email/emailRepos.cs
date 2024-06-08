using DnDApi.ViewModels;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.IO;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class emailRepos : IemailRepos
  {
    private readonly EmailConfig _emailConfig;
    public emailRepos(IOptions<EmailConfig> emailConfig)
    {
      _emailConfig = emailConfig.Value;
    }

    public async Task SendEmailAsync(MailRequestView mailRequest)
    {
      var email = new MimeMessage();
      email.Sender = MailboxAddress.Parse(_emailConfig.Mail);
      email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
      email.Subject = mailRequest.Subject;
      var builder = new BodyBuilder();

      builder.HtmlBody = mailRequest.Body;
      email.Body = builder.ToMessageBody();

      using var smtpServer = new SmtpClient();
      smtpServer.Connect(_emailConfig.Host, _emailConfig.Port, SecureSocketOptions.StartTls);
      smtpServer.Authenticate(_emailConfig.Mail, _emailConfig.Password);
      await smtpServer.SendAsync(email);
      smtpServer.Disconnect(true);
    }
  }
}
