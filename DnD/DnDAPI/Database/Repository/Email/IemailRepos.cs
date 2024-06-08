using DnDApi.ViewModels;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IemailRepos
  {
    Task SendEmailAsync(MailRequestView mailRequest);
  }
}
