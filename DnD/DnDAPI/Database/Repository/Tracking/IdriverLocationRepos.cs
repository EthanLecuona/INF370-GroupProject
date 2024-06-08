using System.Threading.Tasks;

namespace DnDApi.Database.Repository.Tracking
{
  public interface IdriverLocationRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<DriverLocation> GetDriverLocationByID(int id);
    Task<bool> SaveChangesAsync();
  }
}
