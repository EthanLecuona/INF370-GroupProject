using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class dateRepos : IdateRepos
  {
    private readonly AppDbContext _appDbContext;

    public dateRepos(AppDbContext appDbContext)
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
    public Date GetLatestAddedID()
    {
      var lastestID = _appDbContext.Date.Max(l => l.ScheduleDateId);
      return _appDbContext.Date.Find(lastestID);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<Date> GetDatebyID(int id)
    {
      IQueryable<Date> query = _appDbContext.Date.Where(l => l.ScheduleDateId == id);

      return await query.FirstOrDefaultAsync();
    }
  }
}
