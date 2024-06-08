using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class vehicleMakeRepos : IvehicleMakeRepos
  {
    private readonly AppDbContext _appDbContext;

    public vehicleMakeRepos(AppDbContext appDbContext)
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

    public async Task<VehicleManufacturer> GetVehicleMakebyID(int id)
    {
      IQueryable<VehicleManufacturer> query = _appDbContext.VehicleManufacturer.Where(l => l.ManufacturerId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<VehicleManufacturer> GetVehicleMakebyName(string id)
    {
      IQueryable<VehicleManufacturer> query = _appDbContext.VehicleManufacturer.Where(l => l.ManufacturerTitle == id);

      return await query.FirstOrDefaultAsync();
    }
  }
}
