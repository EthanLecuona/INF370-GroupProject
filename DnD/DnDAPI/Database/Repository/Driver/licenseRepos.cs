using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class licenseRepos : IlicenseRepos
  {
    private readonly AppDbContext _appDbContext;

    public licenseRepos(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public void Add<T>(T entity) where T : class
    {
      _appDbContext.Add(entity);
    }
    public void Delete<T>(T entity) where T : class
    {
      _appDbContext.Remove(entity);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<License> GetLicensebyID(int id)
    {
      IQueryable<License> query = _appDbContext.License.Where(l => l.LicenseId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<License[]> GetAllLicenseAsync()
    {
      IQueryable<License> query = _appDbContext.License;
      return await query.ToArrayAsync();
    }

    public License GetID()
    {
      var lastestID = _appDbContext.License.Max(l => l.LicenseId);
      return _appDbContext.License.Find(lastestID);
    }
  }
}
