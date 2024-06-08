using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class ratingRepos : IratingRepos
  {
    private readonly AppDbContext _appDbContext;

    public ratingRepos(AppDbContext appDbContext)
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

    public async Task<Rating> GetRatingbyID(int id)
    {
      IQueryable<Rating> query = _appDbContext.Rating.Where(l => l.RatingId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Rating> GetRatingbyRating(double id)
    {
      IQueryable<Rating> query = _appDbContext.Rating.Where(l => l.Rating1 == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Rating[]> GetAllRatingAsync()
    {
      IQueryable<Rating> query = _appDbContext.Rating;
      return await query.ToArrayAsync();
    }
  }
}
