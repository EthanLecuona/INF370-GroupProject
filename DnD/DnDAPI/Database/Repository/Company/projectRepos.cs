using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class projectRepos : IprojectRepos
  {
    private readonly AppDbContext _appDbContext;

    public projectRepos(AppDbContext appDbContext)
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

    public async Task<Project[]> GetAllProjectsAsync()
    {
      IQueryable<Project> query = _appDbContext.Project;
      return await query.ToArrayAsync();
    }
    public async Task<Project> GetProjectbyId(int id)
    {
      IQueryable<Project> query = _appDbContext.Project
          .Where(l => l.ProjectId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Project> GetProjectbyName(string id)
    {
      IQueryable<Project> query = _appDbContext.Project
          .Where(l => l.ProjectName == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
