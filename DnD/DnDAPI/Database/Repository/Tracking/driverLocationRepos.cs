using DnDApi.Database.Repository.Tracking;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class driverLocationRepos : IdriverLocationRepos
  {
    private readonly AppDbContext _appDbContext;

    public driverLocationRepos(AppDbContext appDbContext)
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
    public async Task<DriverLocation> GetDriverLocationByID(int id)
    {
      IQueryable<DriverLocation> query = _appDbContext.DriverLocation.Where(l => l.LocationId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
