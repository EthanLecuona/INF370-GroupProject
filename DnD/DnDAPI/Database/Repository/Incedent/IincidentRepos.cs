using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IincidentRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();

    Task<Incident> GetIncidentbyID(int id);
    Task<Incident[]> GetAllIncidentAsync();
  }
}
