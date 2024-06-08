using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IprojectRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Project[]> GetAllProjectsAsync();
    Task<Project> GetProjectbyId(int id);
    Task<Project> GetProjectbyName(string id);

    Task<bool> SaveChangesAsync();
  }
}
