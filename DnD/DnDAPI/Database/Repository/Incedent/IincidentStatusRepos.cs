using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IincidentStatusRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();

    Task<IncidentStatus> GetIncidentStatusbyID(int id);
    Task<IncidentStatus[]> GetAllIncidentStatusAsync();
  }
}
