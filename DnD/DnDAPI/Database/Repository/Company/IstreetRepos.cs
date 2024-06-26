using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IstreetRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Street> GetStreetbyID(int id);
    public Street GetLatestStreetID();
    Task<bool> SaveChangesAsync();
  }
}
