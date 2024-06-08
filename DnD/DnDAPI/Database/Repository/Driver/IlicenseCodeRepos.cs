using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IlicenseCodeRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();

    Task<LicenseCode> GetLicenseCodebyID(int id);
    Task<LicenseCode[]> GetAllLicenseCodeAsync();
  }
}
