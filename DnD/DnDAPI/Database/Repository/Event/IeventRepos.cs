using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IeventRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Event> GetEventbyID(int id);
    Task<EventBooking> GetEventBookingbyID(int eventid);
    Task<EventBooking> GetEventBookingbybookingID(int bookingId);
    Task<EventBooking> GetEventBookingbyEventID(int eventid);
    Task<Event[]> GetAllEventsAsync();
    public Event GetLatestAddedID();
    Task<bool> SaveChangesAsync();
  }
}
