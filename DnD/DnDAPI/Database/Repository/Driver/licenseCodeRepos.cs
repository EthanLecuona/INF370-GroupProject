using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class licenseCodeRepos : IlicenseCodeRepos
  {
    private readonly AppDbContext _appDbContext;

    public licenseCodeRepos(AppDbContext appDbContext)
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

    public async Task<LicenseCode> GetLicenseCodebyID(int id)
    {
      IQueryable<LicenseCode> query = _appDbContext.LicenseCode.Where(l => l.LicenseCodeId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<LicenseCode[]> GetAllLicenseCodeAsync()
    {
      IQueryable<LicenseCode> query = _appDbContext.LicenseCode;
      return await query.ToArrayAsync();
    }
  }
}
