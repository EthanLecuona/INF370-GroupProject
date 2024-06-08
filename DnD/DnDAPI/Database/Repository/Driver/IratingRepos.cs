using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IratingRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();

    Task<Rating> GetRatingbyID(int id);
    Task<Rating> GetRatingbyRating(double id);
    
    Task<Rating[]> GetAllRatingAsync();
  }
}
