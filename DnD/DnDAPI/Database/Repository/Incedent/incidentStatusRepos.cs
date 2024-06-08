using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class incidentStatusRepos : IincidentStatusRepos
  {
    private readonly AppDbContext _appDbContext;

    public incidentStatusRepos(AppDbContext appDbContext)
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

    public async Task<IncidentStatus> GetIncidentStatusbyID(int id)
    {
      IQueryable<IncidentStatus> query = _appDbContext.IncidentStatus.Where(l => l.IncidentStatusId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<IncidentStatus[]> GetAllIncidentStatusAsync()
    {
      IQueryable<IncidentStatus> query = _appDbContext.IncidentStatus;
      return await query.ToArrayAsync();
    }
  }
}
