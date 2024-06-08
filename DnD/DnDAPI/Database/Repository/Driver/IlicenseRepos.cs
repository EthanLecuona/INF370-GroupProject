using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IlicenseRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();
    public License GetID();
    Task<License> GetLicensebyID(int id);
    Task<License[]> GetAllLicenseAsync();
  }
}
