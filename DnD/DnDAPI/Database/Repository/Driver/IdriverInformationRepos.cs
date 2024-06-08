using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IdriverInformationRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveChangesAsync();
    Task<DriverInformation[]> GetAllDriverInformationAsync();

    Task<DriverInformation> GetInfobyID(string id);
  }
}
