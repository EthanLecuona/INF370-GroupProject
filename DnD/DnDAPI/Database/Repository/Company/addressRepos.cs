using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class addressRepos : IaddressRepos
  {
    private readonly AppDbContext _appDbContext;

    public addressRepos(AppDbContext appDbContext)
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
    public async Task<Address> GetAddressbyID(int id)
    {
      IQueryable<Address> query = _appDbContext.Address.Where(l => l.AddressId == id);

      return await query.FirstOrDefaultAsync();
    }
    public Address GetLatestAddressID()
    {
      var lastestID = _appDbContext.Address.Max(l => l.AddressId);
      return _appDbContext.Address.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
