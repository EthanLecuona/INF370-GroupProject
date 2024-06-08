using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IparcelPriorityRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<ParcelPriority> GetParcelprioritybyID(int id);
    Task<ParcelPriority[]> GetAllParcelpriorityAsync();
    Task<bool> SaveChangesAsync();
  }
}
