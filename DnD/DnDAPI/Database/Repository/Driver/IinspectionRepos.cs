using System;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IinspectionRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveChangesAsync();
    Task<Inspection> GetInspectionbyID(int id);
    Task<Inspection> GetInspectionbyDriverID(string driverid, DateTime date);
    Task<Inspection[]> GetAllInspectionsAsync();
  }
}
