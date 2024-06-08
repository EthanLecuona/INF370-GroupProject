using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IvehicleModelRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveChangesAsync();
    Task<VehicleModel> GetVehicleModelbyID(int id);
    Task<VehicleModel> GetVehicleModelbyName(string id);
  }
}
