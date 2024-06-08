using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class fuelPriceRepos : IfuelPriceRepos
  {

    private readonly AppDbContext _appDbContext;

    public fuelPriceRepos(AppDbContext appDbContext)
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

    public async Task<FuelPrice> GetFuelPricebyID(int id)
    {
      IQueryable<FuelPrice> query = _appDbContext.FuelPrice.Where(l => l.FuelPriceId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<FuelPrice[]> GetDriverFuelPricebyID(string id)
    {
      IQueryable<FuelPrice> query = _appDbContext.FuelPrice.Where(l => l.DriverUserId == id);

      return await query.ToArrayAsync();
    }

    public async Task<FuelPrice[]> GetAllFuelPriceAsync()
    {
      IQueryable<FuelPrice> query = _appDbContext.FuelPrice;
      return await query.ToArrayAsync();
    }
  }
}
