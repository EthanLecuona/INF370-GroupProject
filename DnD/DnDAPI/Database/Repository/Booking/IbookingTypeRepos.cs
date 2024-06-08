using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public interface IbookingTypeRepos
  {
    Task<BookingType> GetBookingTypebyID(int id);
    Task<BookingType[]> GetAllBookingTypesAsync();
  }
}
