using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IbookingStatusRepos
  {
    Task<BookingStatus> GetBookingStatusbyID(int id);
    Task<BookingStatus[]> GetAllBookingStatusAsync();
  }
}
