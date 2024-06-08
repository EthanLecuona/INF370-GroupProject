using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class clientEmployeeConnection : IclientEmployeeConnection
  {
    private readonly AppDbContext _appDbContext;

    public clientEmployeeConnection(AppDbContext appDbContext)
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
    public async Task<ClientEmployeeConnection> GetClientEmployeebyID(int id)
    {
      IQueryable<ClientEmployeeConnection> query = _appDbContext.ClientEmployeeConnection.Where(l => l.CecId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ClientEmployeeConnection> GetClientEmployeebyUserID(string id)
    {
      IQueryable<ClientEmployeeConnection> query = _appDbContext.ClientEmployeeConnection.Where(l => l.UserId == id && l.ClientUserId == "Event");

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ClientEmployeeConnection[]> GetAllClientEmployeeAsync()
    {
      IQueryable<ClientEmployeeConnection> query = _appDbContext.ClientEmployeeConnection;
      return await query.ToArrayAsync();
    }
    public ClientEmployeeConnection GetLatestAddedID()
    {
      var lastestID = _appDbContext.ClientEmployeeConnection.Max(l => l.CecId);
      return _appDbContext.ClientEmployeeConnection.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
