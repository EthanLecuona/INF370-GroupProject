using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class fuelRepos : IfuelRepos
  {
    private readonly AppDbContext _appDbContext;

    public fuelRepos(AppDbContext appDbContext)
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
    public async Task<FuelPrice> GetFuelbyID(int id)
    {
      IQueryable<FuelPrice> query = _appDbContext.FuelPrice.Where(l => l.FuelPriceId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<FuelPrice[]> GetAllFuelAsync()
    {
      IQueryable<FuelPrice> query = _appDbContext.FuelPrice;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
