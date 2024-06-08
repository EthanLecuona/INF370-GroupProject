using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IfuelPriceRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;

    Task<bool> SaveChangesAsync();

    Task<FuelPrice> GetFuelPricebyID(int id);
    Task<FuelPrice[]> GetAllFuelPriceAsync();
    Task<FuelPrice[]> GetDriverFuelPricebyID(string id);
  }
}
