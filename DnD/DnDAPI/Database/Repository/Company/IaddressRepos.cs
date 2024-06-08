using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IaddressRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Address> GetAddressbyID(int id);
    public Address GetLatestAddressID();
    Task<bool> SaveChangesAsync();
  }
}
