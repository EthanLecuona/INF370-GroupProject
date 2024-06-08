using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface ItitleRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Title> GetTitlebyID(int id);
    Task<Title[]> GetAllTitlesAsync();
    Task<bool> SaveChangesAsync();
  }
}
