using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class driverInformationRepos : IdriverInformationRepos
  {
    private readonly AppDbContext _appDbContext;

    public driverInformationRepos(AppDbContext appDbContext)
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

    public async Task<DriverInformation[]> GetAllDriverInformationAsync()
    {
      IQueryable<DriverInformation> query = _appDbContext.DriverInformation;
      return await query.ToArrayAsync();
    }

    public async Task<DriverInformation> GetInfobyID(string id)
    {
      IQueryable<DriverInformation> query = _appDbContext.DriverInformation.Where(l => l.DriverUserId == id);

      return await query.FirstOrDefaultAsync();
    }
  }
}
