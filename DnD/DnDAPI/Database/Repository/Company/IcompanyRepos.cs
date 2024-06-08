using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IcompanyRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Company> GetCompanybyID(int id);
    Task<Company> GetCompanybyName(string id);
    Task<Company[]> GetAllCompaniesAsync();
    Task<bool> SaveChangesAsync();
  }
}
