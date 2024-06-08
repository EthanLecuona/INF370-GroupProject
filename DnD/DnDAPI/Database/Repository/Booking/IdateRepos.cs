using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IdateRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    public Date GetLatestAddedID();
    Task<bool> SaveChangesAsync();
    Task<Date> GetDatebyID(int id);
  }
}
