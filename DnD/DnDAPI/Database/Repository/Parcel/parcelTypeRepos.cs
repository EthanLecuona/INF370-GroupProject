using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class parcelTypeRepos : IparcelTypeRepos
  {
    private readonly AppDbContext _appDbContext;

    public parcelTypeRepos(AppDbContext appDbContext)
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
    public async Task<ParcelType> GetParceltypebyID(int id)
    {
      IQueryable<ParcelType> query = _appDbContext.ParcelType.Where(l => l.ParcelTypeId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ParcelType[]> GetAllParceltypesAsync()
    {
      IQueryable<ParcelType> query = _appDbContext.ParcelType;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
