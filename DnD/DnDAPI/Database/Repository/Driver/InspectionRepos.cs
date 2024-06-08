using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class InspectionRepos : IinspectionRepos
  {
    private readonly AppDbContext _appDbContext;

    public InspectionRepos(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public void Add<T>(T entity) where T : class
    {
      _appDbContext.Add(entity);
    }
    public void Delete<T>(T entity) where T : class
    {
      _appDbContext.Remove(entity);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<Inspection> GetInspectionbyID(int id)
    {
      IQueryable<Inspection> query = _appDbContext.Inspection.Where(l => l.InspectionId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Inspection> GetInspectionbyDriverID(string driverid, DateTime date)
    {
      IQueryable<Inspection> query = _appDbContext.Inspection.Where(l => l.DriverUserId == driverid && l.StartDate.Date == date.Date);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Inspection[]> GetAllInspectionsAsync()
    {
      IQueryable<Inspection> query = _appDbContext.Inspection;
      return await query.ToArrayAsync();
    }
  }
}
