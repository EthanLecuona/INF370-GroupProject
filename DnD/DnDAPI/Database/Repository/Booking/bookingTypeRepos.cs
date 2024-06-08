using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class bookingTypeRepos : IbookingTypeRepos
  {
    private readonly AppDbContext _appDbContext;

    public bookingTypeRepos(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public async Task<BookingType> GetBookingTypebyID(int id)
    {
      IQueryable<BookingType> query = _appDbContext.BookingType.Where(l => l.BookingTypeId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<BookingType[]> GetAllBookingTypesAsync()
    {
      IQueryable<BookingType> query = _appDbContext.BookingType;
      return await query.ToArrayAsync();
    }
  }
}
