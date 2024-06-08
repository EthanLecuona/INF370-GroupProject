using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IvehicleMakeRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveChangesAsync();
    Task<VehicleManufacturer> GetVehicleMakebyID(int id);
    Task<VehicleManufacturer> GetVehicleMakebyName(string id);
  }
}
