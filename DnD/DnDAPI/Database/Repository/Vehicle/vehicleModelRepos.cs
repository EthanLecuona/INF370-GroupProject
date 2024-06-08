using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class vehicleModelRepos : IvehicleModelRepos
  {
    private readonly AppDbContext _appDbContext;

    public vehicleModelRepos(AppDbContext appDbContext)
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

    public async Task<VehicleModel> GetVehicleModelbyID(int id)
    {
      IQueryable<VehicleModel> query = _appDbContext.VehicleModel.Where(l => l.ModelId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<VehicleModel> GetVehicleModelbyName(string id)
    {
      IQueryable<VehicleModel> query = _appDbContext.VehicleModel.Where(l => l.ModelTitle == id);

      return await query.FirstOrDefaultAsync();
    }
  }
}
