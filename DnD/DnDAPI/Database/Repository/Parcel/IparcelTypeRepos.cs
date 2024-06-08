using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IparcelTypeRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<ParcelType> GetParceltypebyID(int id);
    Task<ParcelType[]> GetAllParceltypesAsync();
    Task<bool> SaveChangesAsync();
  }
}
