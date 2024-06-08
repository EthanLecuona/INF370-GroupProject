using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class parcelRepos : IparcelRepos
  {
    private readonly AppDbContext _appDbContext;

    public parcelRepos(AppDbContext appDbContext)
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
    public async Task<Parcel> GetParcelbyID(int id)
    {
      IQueryable<Parcel> query = _appDbContext.Parcel.Where(l => l.ParcelId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Parcel> GetParcelbyBookingID(int id)
    {
      IQueryable<Parcel> query = _appDbContext.Parcel.Where(l => l.BookingId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Parcel[]> GetAllParcelsAsync()
    {
      IQueryable<Parcel> query = _appDbContext.Parcel;
      return await query.ToArrayAsync();
    }
    public Parcel GetLatestAddedID()
    {
      var lastestID = _appDbContext.Parcel.Max(l => l.ParcelId);
      return _appDbContext.Parcel.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

  }
}
