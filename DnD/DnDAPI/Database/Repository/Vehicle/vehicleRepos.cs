using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class vehicleRepos : IvehicleRepos
  {
    private readonly AppDbContext _appDbContext;

    public vehicleRepos(AppDbContext appDbContext)
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
    public async Task<Vehicle> GetVehiclebyID(int id)
    {
      IQueryable<Vehicle> query = _appDbContext.Vehicle.Where(l => l.RegistrationId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Vehicle> GetVehiclebyRegistration(string id)
    {
      IQueryable<Vehicle> query = _appDbContext.Vehicle.Where(l => l.RegistrationNumber == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<VehicleModel> GetVehicleModelbyID(int id)
    {
      IQueryable<VehicleModel> query = _appDbContext.VehicleModel.Where(l => l.ModelId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<VehicleModel[]> GetVehicleModelbyManufacturerID(int id)
    {
      IQueryable<VehicleModel> query = _appDbContext.VehicleModel.Where(l => l.ManufacturerId == id);

      return await query.ToArrayAsync();
    }
    public async Task<VehicleManufacturer> GetVehicleManufacturerbyID(int id)
    {
      IQueryable<VehicleManufacturer> query = _appDbContext.VehicleManufacturer.Where(l => l.ManufacturerId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<VehicleManufacturer> GetVehicleManufacturerbyName(string id)
    {
      IQueryable<VehicleManufacturer> query = _appDbContext.VehicleManufacturer.Where(l => l.ManufacturerTitle == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Vehicle[]> GetAllVehiclesAsync()
    {
      IQueryable<Vehicle> query = _appDbContext.Vehicle;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
