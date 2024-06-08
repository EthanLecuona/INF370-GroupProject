using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class timeRepos : ItimeRepos
  {
    private readonly AppDbContext _appDbContext;

    public timeRepos(AppDbContext appDbContext)
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
    public Time GetLatestAddedID()
    {
      var lastestID = _appDbContext.Time.Max(l => l.ScheduleTimeId);
      return _appDbContext.Time.Find(lastestID);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<Time> GetTimebyID(int id)
    {
      IQueryable<Time> query = _appDbContext.Time.Where(l => l.ScheduleTimeId == id);

      return await query.FirstOrDefaultAsync();
    }
  }
}
