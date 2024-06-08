using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IvehicleRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Vehicle> GetVehiclebyID(int id);
    Task<Vehicle> GetVehiclebyRegistration(string id);
    Task<VehicleModel> GetVehicleModelbyID(int id);
    Task<VehicleManufacturer> GetVehicleManufacturerbyID(int id);
    Task<VehicleManufacturer> GetVehicleManufacturerbyName(string id);
    Task<VehicleModel[]> GetVehicleModelbyManufacturerID(int id);
    Task<Vehicle[]> GetAllVehiclesAsync();
    Task<bool> SaveChangesAsync();
  }
}
