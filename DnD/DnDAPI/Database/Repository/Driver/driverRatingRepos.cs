using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class driverRatingRepos : IdriverRatingRepos
  {
    private readonly AppDbContext _appDbContext;

    public driverRatingRepos(AppDbContext appDbContext)
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

    public async Task<DriverRating> GetDriverRatingbyID(int id)
    {
      IQueryable<DriverRating> query = _appDbContext.DriverRating.Where(l => l.DriverRatingId == id);

      return await query.FirstOrDefaultAsync();
    }




    public async Task<DriverRating[]> GetAllDriverRatingAsync()
    {
      IQueryable<DriverRating> query = _appDbContext.DriverRating;
      return await query.ToArrayAsync();
    }

    public DriverRating GetID()
    {
      var lastestID = _appDbContext.DriverRating.Max(l => l.DriverRatingId);
      return _appDbContext.DriverRating.Find(lastestID);
    }
  }
}
