using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DnDApi.Database.Repository.Tracking;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TrackingController : ControllerBase
  {
    private readonly AppDbContext _appDb;
    private readonly IdriverLocationRepos _driverlocationRepos;
    public TrackingController(AppDbContext appDb, IdriverLocationRepos driverLocationRepos)
    {
      _appDb = appDb;
      _driverlocationRepos = driverLocationRepos;
    }

    [HttpGet]
    [Route("getTrackingOnDate")]
    public object getTrackingonDate(DateTime date)
    {
      var query = (from Tracking in _appDb.Tracking
                   join DTDV in _appDb.DateTimeDriverVehicle
                   on Tracking.BookingId equals DTDV.BookingId
                   join Date in _appDb.Date
                   on DTDV.ScheduleDateId equals Date.ScheduleDateId
                   orderby Tracking.Distance ascending
                   select new
                   {
                     BookingId = DTDV.BookingId,
                     StartLocation = Tracking.StartLocation,
                     EndLocation = Tracking.EndLocation,
                     Date = Date.Date1
                   }).Where(c => c.Date == date).ToList();
      return query;
    }

    [HttpGet]
    [Route("getTrackingByBookingId")]
    public object getTrackingByBookingId(int bookingId)
    {
      var query = (from Booking in _appDb.Booking
                   join Tracking in _appDb.Tracking
                   on Booking.BookingId equals Tracking.BookingId
                   select new
                   {
                     BookingId = Booking.BookingId,
                     StartLocation = Tracking.StartLocation,
                     EndLocation = Tracking.EndLocation
                   }).Where(c => c.BookingId == bookingId).ToList();
      return query;
    }

    [HttpGet]
    [Route("GetDriverLocationByID")]
    public async Task<IActionResult> GetDriverLocationByID(int id)
    {
      try
      {
        var results = await _driverlocationRepos.GetDriverLocationByID(id);
        var latlng = new
        {
          lat = results.Lat,
          lng = results.Lng
        };
        return Ok(latlng);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("UpdateDriverLocation")]
    public async Task<IActionResult> UpdateDriverLocation(DriverLocationView locationView, int id)
    {
      try
      {
        var existingLocation = await _driverlocationRepos.GetDriverLocationByID(id);

        if(existingLocation == null)
        {
          return BadRequest();
        }
        existingLocation.Lng = locationView.Lng;
        existingLocation.Lat = locationView.Lat;
        if(await _driverlocationRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
      return Ok();
    }

  }
}
