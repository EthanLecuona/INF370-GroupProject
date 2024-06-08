using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IvehicleClassRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<VehicleClass> GetVehicleClassbyID(int id);
    Task<VehicleClass> GetVehicleClassbyName(string id);
    Task<VehicleClass[]> GetAllVehicleClassesAsync();
    Task<bool> SaveChangesAsync();
  }
}
