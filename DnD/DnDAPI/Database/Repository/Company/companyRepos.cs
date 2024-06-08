using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class companyRepos : IcompanyRepos
  {
    private readonly AppDbContext _appDbContext;

    public companyRepos(AppDbContext appDbContext)
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
    public async Task<Company> GetCompanybyID(int id)
    {
      IQueryable<Company> query = _appDbContext.Company.Where(l => l.CompanyId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Company> GetCompanybyName(string id)
    {
      IQueryable<Company> query = _appDbContext.Company.Where(l => l.CompanyName == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Company[]> GetAllCompaniesAsync()
    {
      IQueryable<Company> query = _appDbContext.Company;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
