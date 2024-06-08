using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IcityRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<City> GetCitybyID(int id);
    public City GetLatestAddedID();
    Task<bool> SaveChangesAsync();
  }
}
