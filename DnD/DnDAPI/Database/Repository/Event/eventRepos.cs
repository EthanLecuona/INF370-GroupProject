using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class eventRepos : IeventRepos
  {
    private readonly AppDbContext _appDbContext;

    public eventRepos(AppDbContext appDbContext)
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
    public async Task<Event> GetEventbyID(int id)
    {
      IQueryable<Event> query = _appDbContext.Event.Where(l => l.EventId == id);

      return await query.FirstOrDefaultAsync();
    }
    
    public async Task<EventBooking> GetEventBookingbyID(int eventid)
    {
      IQueryable<EventBooking> query = _appDbContext.EventBooking.Where(l => l.EventId == eventid);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<EventBooking> GetEventBookingbybookingID(int bookingId)
    {
      IQueryable<EventBooking> query = _appDbContext.EventBooking.Where(l => l.BookingId == bookingId);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<EventBooking> GetEventBookingbyEventID(int eventid)
    {
      IQueryable<EventBooking> query = _appDbContext.EventBooking.Where(l => l.EventId == eventid);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<Event[]> GetAllEventsAsync()
    {
      IQueryable<Event> query = _appDbContext.Event;
      return await query.ToArrayAsync();
    }
    public Event GetLatestAddedID()
    {
      var lastestID = _appDbContext.Event.Max(l => l.EventId);
      return _appDbContext.Event.Find(lastestID);
    }
    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
