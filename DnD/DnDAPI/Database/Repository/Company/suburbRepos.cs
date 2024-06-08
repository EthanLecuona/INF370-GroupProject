using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class suburbRepos : IsuburbRepos
  {
    private readonly AppDbContext _appDbContext;

    public suburbRepos(AppDbContext appDbContext)
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
    public async Task<Suburb> GetSuburbbyID(int id)
    {
      IQueryable<Suburb> query = _appDbContext.Suburb.Where(l => l.SuburbId == id);

      return await query.FirstOrDefaultAsync();
    }
    public Suburb GetLatestSuburbID()
    {
      var lastestID = _appDbContext.Suburb.Max(l => l.SuburbId);
      return _appDbContext.Suburb.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
