using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class parcelConfidentialityRepos : IparcelConfidentRepos
  {
    private readonly AppDbContext _appDbContext;

    public parcelConfidentialityRepos(AppDbContext appDbContext)
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
    public async Task<ParcelConfidentiality> GetParcelconfidentialitybyID(int id)
    {
      IQueryable<ParcelConfidentiality> query = _appDbContext.ParcelConfidentiality.Where(l => l.ParcelConId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<ParcelConfidentiality[]> GetAllParcelconfidentialitiesAsync()
    {
      IQueryable<ParcelConfidentiality> query = _appDbContext.ParcelConfidentiality;
      return await query.ToArrayAsync();
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
