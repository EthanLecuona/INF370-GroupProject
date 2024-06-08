using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class driverScheduleRepos : IdriverScheduleRepos
  {
    private readonly AppDbContext _appDbContext;

    public driverScheduleRepos(AppDbContext appDbContext)
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

    public async Task<DateTimeDriverVehicle> GetDateTimeDriverbyID(int id)
    {
      IQueryable<DateTimeDriverVehicle> query = _appDbContext.DateTimeDriverVehicle.Where(l => l.DateTimeDriverId == id);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<DateTimeDriverVehicle> GetDateTimeDriverbyBookingID(int bookingid)
    {
      IQueryable<DateTimeDriverVehicle> query = _appDbContext.DateTimeDriverVehicle.Where(l => l.BookingId == bookingid);

      return await query.FirstOrDefaultAsync();
    }

    public async Task<DateTimeDriverVehicle[]> GetAllDateTimeDriverAsync()
    {
      IQueryable<DateTimeDriverVehicle> query = _appDbContext.DateTimeDriverVehicle;
      return await query.ToArrayAsync();
    }

    public DateTimeDriverVehicle GetID()
    {
      var lastestID = _appDbContext.DateTimeDriverVehicle.Max(l => l.DateTimeDriverId);
      return _appDbContext.DateTimeDriverVehicle.Find(lastestID);
    }

    public async Task<DateTimeDriverVehicle[]> GetAllScheduleAsync()
    {
      IQueryable<DateTimeDriverVehicle> query = _appDbContext.DateTimeDriverVehicle;
      return await query.ToArrayAsync();
    }
  }
}
