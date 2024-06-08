using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class MaintenanceRepos : ImaintenanceRepos
  {
    private readonly AppDbContext _appDbContext;

    public MaintenanceRepos(AppDbContext appDbContext)
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

    public async Task<Maintenance[]> GetAllMaintenanceAsync()
    {
      IQueryable<Maintenance> query = _appDbContext.Maintenance;
      return await query.ToArrayAsync();
    }
    public async Task<Maintenance> GetMaintenancebyID(int id)
    {
      IQueryable<Maintenance> query = _appDbContext.Maintenance.Where(l => l.MaintenanceId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
