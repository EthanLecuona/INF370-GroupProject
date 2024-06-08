using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IclientInformationRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<ClientInformation> GetClientInformationbyID(string id);
    Task<ClientInformation[]> GetAllClientInformationAsync();
    Task<bool> SaveChangesAsync();
  }
}
