using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IfuelRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<FuelPrice> GetFuelbyID(int id);
    Task<FuelPrice[]> GetAllFuelAsync();
    Task<bool> SaveChangesAsync();
  }
}
