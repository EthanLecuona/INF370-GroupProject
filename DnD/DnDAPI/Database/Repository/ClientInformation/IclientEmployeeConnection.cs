using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IclientEmployeeConnection
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<ClientEmployeeConnection> GetClientEmployeebyID(int id);
    Task<ClientEmployeeConnection> GetClientEmployeebyUserID(string id);
    Task<ClientEmployeeConnection[]> GetAllClientEmployeeAsync();
    public ClientEmployeeConnection GetLatestAddedID();
    Task<bool> SaveChangesAsync();
  }
}
