using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class streetRepos : IstreetRepos
  {
    private readonly AppDbContext _appDbContext;

    public streetRepos(AppDbContext appDbContext)
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
    public async Task<Street> GetStreetbyID(int id)
    {
      IQueryable<Street> query = _appDbContext.Street.Where(l => l.StreetId == id);

      return await query.FirstOrDefaultAsync();
    }
    public Street GetLatestStreetID()
    {
      var lastestID = _appDbContext.Street.Max(l => l.StreetId);
      return _appDbContext.Street.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
