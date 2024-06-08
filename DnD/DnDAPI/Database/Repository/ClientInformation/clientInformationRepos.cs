using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class clientInformationRepos : IclientInformationRepos
  {
    private readonly AppDbContext _appDbContext;

    public clientInformationRepos(AppDbContext appDbContext)
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
    public async Task<ClientInformation> GetClientInformationbyID(string id)
    {
      IQueryable<ClientInformation> query = _appDbContext.ClientInformation.Where(l => l.ClientUserId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ClientInformation[]> GetAllClientInformationAsync()
    {
      IQueryable<ClientInformation> query = _appDbContext.ClientInformation;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
