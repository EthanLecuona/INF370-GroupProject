using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class incidentRepos : IincidentRepos
  {
    private readonly AppDbContext _appDbContext;

    public incidentRepos(AppDbContext appDbContext)
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

    public async Task<Incident> GetIncidentbyID(int id)
    {
      IQueryable<Incident> query = _appDbContext.Incident.Where(l => l.IncidentId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<Incident[]> GetAllIncidentAsync()
    {
      IQueryable<Incident> query = _appDbContext.Incident;
      return await query.ToArrayAsync();
    }

    //public DriverRating GetID()
    //{
    //  var lastestID = _appDbContext.DriverRating.Max(l => l.DriverRatingId);
    //  return _appDbContext.DriverRating.Find(lastestID);
    //}
  }
}
