using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class parcelPriorityRepos : IparcelPriorityRepos
  {
    private readonly AppDbContext _appDbContext;

    public parcelPriorityRepos(AppDbContext appDbContext)
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
    public async Task<ParcelPriority> GetParcelprioritybyID(int id)
    {
      IQueryable<ParcelPriority> query = _appDbContext.ParcelPriority.Where(l => l.ParcelPriorityId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ParcelPriority[]> GetAllParcelpriorityAsync()
    {
      IQueryable<ParcelPriority> query = _appDbContext.ParcelPriority;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
