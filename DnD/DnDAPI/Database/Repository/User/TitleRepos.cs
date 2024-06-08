using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class TitleRepos : ItitleRepos
  {
    private readonly AppDbContext _appDbContext;

    public TitleRepos(AppDbContext appDbContext)
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
    public async Task<Title> GetTitlebyID(int id)
    {
      IQueryable<Title> query = _appDbContext.Title.Where(l => l.TitleId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Title[]> GetAllTitlesAsync()
    {
      IQueryable<Title> query = _appDbContext.Title;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
