using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class cityRepos : IcityRepos
  {
    private readonly AppDbContext _appDbContext;

    public cityRepos(AppDbContext appDbContext)
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
    public async Task<City> GetCitybyID(int id)
    {
      IQueryable<City> query = _appDbContext.City.Where(l => l.CityId == id);

      return await query.FirstOrDefaultAsync();
    }
    public City GetLatestAddedID()
    {
      var lastestID = _appDbContext.City.Max(l => l.CityId);
      return _appDbContext.City.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
