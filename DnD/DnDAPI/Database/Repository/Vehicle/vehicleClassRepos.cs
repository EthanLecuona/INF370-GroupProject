using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class vehicleClassRepos : IvehicleClassRepos
  {
    private readonly AppDbContext _appDbContext;

    public vehicleClassRepos(AppDbContext appDbContext)
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
    public async Task<VehicleClass> GetVehicleClassbyID(int id)
    {
      IQueryable<VehicleClass> query = _appDbContext.VehicleClass.Where(l => l.VehicleClassId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<VehicleClass> GetVehicleClassbyName(string id)
    {
      IQueryable<VehicleClass> query = _appDbContext.VehicleClass.Where(l => l.Description == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<VehicleClass[]> GetAllVehicleClassesAsync()
    {
      IQueryable<VehicleClass> query = _appDbContext.VehicleClass;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
