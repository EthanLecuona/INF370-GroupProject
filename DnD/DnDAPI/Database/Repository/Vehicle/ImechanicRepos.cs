using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface ImechanicRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Mechanic[]> GetAllMechanicAsync();
    Task<Mechanic> GetMechanicbyID(int id);
    Task<Mechanic> GetMechanicbyName(string id);
    Task<bool> SaveChangesAsync();
  }
}
