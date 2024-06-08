using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IbookingRepos
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<Booking> GetBookingbyID(int id);
    Task<Comment[]> GetCommentsByBookingId(int id);
    Task<Tracking> GetTrackingByBookingId(int id);
    public Booking GetLatestAddedID();

    Task<Booking[]> GetAllBookingsAsync();
    Task<bool> SaveChangesAsync();
  }
}
