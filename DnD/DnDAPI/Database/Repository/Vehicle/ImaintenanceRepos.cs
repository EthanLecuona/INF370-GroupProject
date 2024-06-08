using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface ImaintenanceRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Maintenance[]> GetAllMaintenanceAsync();
    Task<Maintenance> GetMaintenancebyID(int id);
    Task<bool> SaveChangesAsync();
  }
}
