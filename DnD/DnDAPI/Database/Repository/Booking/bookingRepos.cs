using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class bookingRepos : IbookingRepos
  {
    private readonly AppDbContext _appDbContext;

    public bookingRepos(AppDbContext appDbContext)
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
    public async Task<Booking> GetBookingbyID(int id)
    {
      IQueryable<Booking> query = _appDbContext.Booking.Where(l => l.BookingId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Comment[]> GetCommentsByBookingId(int id)
    {
      IQueryable<Comment> query = _appDbContext.Comment.Where(l => l.BookingId == id);

      return await query.ToArrayAsync();
    }
    public async Task<Tracking> GetTrackingByBookingId(int id)
    {
      IQueryable<Tracking> query = _appDbContext.Tracking.Where(l => l.BookingId == id);

      return await query.FirstOrDefaultAsync();
    }
    public Booking GetLatestAddedID()
    {
      var lastestID = _appDbContext.Booking.Max(l => l.BookingId);
      return _appDbContext.Booking.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }

    public async Task<Booking[]> GetAllBookingsAsync()
    {
      IQueryable<Booking> query = _appDbContext.Booking;
      return await query.ToArrayAsync();
    }
  }
}
