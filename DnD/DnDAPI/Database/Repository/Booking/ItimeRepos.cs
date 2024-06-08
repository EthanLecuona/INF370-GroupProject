using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface ItimeRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    public Time GetLatestAddedID();
    Task<bool> SaveChangesAsync();

    Task<Time> GetTimebyID(int id);
  }
}
