using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IparcelConfidentRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<ParcelConfidentiality> GetParcelconfidentialitybyID(int id);
    Task<ParcelConfidentiality[]> GetAllParcelconfidentialitiesAsync();
    Task<bool> SaveChangesAsync();
  }
}
