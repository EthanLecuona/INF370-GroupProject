using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class mechanicRepos : ImechanicRepos
  {
    private readonly AppDbContext _appDbContext;

    public mechanicRepos(AppDbContext appDbContext)
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
    public async Task<Mechanic> GetMechanicbyID(int id)
    {
      IQueryable<Mechanic> query = _appDbContext.Mechanic.Where(l => l.MechanicId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Mechanic> GetMechanicbyName(string id)
    {
      IQueryable<Mechanic> query = _appDbContext.Mechanic.Where(l => l.MechanicEmail == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<Mechanic[]> GetAllMechanicAsync()
    {
      IQueryable<Mechanic> query = _appDbContext.Mechanic;
      return await query.ToArrayAsync();
    }
  }
}
