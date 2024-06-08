using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Database
{
  public class bookingStatusRepos : IbookingStatusRepos
  {
    private readonly AppDbContext _appDbContext;

    public bookingStatusRepos(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public async Task<BookingStatus> GetBookingStatusbyID(int id)
    {
      IQueryable<BookingStatus> query = _appDbContext.BookingStatus.Where(l => l.BookingStatusId == id);

      return await query.FirstOrDefaultAsync();
    }
    public async Task<BookingStatus[]> GetAllBookingStatusAsync()
    {
      IQueryable<BookingStatus> query = _appDbContext.BookingStatus;
      return await query.ToArrayAsync();
    }
  }
}
