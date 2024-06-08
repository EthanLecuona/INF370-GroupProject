using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IdriverRatingRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();
    public DriverRating GetID();
    Task<DriverRating> GetDriverRatingbyID(int id);
    Task<DriverRating[]> GetAllDriverRatingAsync();
  }
}
