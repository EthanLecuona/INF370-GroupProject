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
using Microsoft.CodeAnalysis.CodeMetrics;
using Microsoft.Extensions.Logging;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EventsController : ControllerBase
  {
    private readonly IeventRepos _eventRepos;
    private readonly IclientEmployeeConnection _clientEmployeeConnectionRepos;
    private readonly IbookingRepos _bookingRepos;
    private readonly IdateRepos _dateRepos;
    private readonly ItimeRepos _timeRepos;
    private readonly IdriverScheduleRepos _driverscheduleRepos;
    private readonly IvehicleRepos _vehicleRepos;
    private readonly IdriverInformationRepos _driverInformationRepos;
    private readonly ImaintenanceRepos _maintenanceRepos;
    private readonly AppDbContext _appDb;

    public EventsController(IeventRepos eventRepos, IclientEmployeeConnection clientEmployeeConnectionRepos, IbookingRepos bookingRepos, IdateRepos dateRepos, ItimeRepos timeRepos, IdriverScheduleRepos driverScheduleRepos, IvehicleRepos vehicleRepos, IdriverInformationRepos driverInformationRepos, ImaintenanceRepos maintenanceRepos, AppDbContext appDb)
    {
      _eventRepos = eventRepos;
      _clientEmployeeConnectionRepos = clientEmployeeConnectionRepos;
      _bookingRepos = bookingRepos;
      _dateRepos = dateRepos;
      _timeRepos = timeRepos;
      _driverscheduleRepos = driverScheduleRepos;
      _vehicleRepos = vehicleRepos;
      _driverInformationRepos = driverInformationRepos;
      _maintenanceRepos = maintenanceRepos;
      _appDb = appDb;
    }

    [HttpGet]
    [Route("getEvent")]
    public async Task<IActionResult> GetEvent(int id)
    {
      try
      {
        var results = await _eventRepos.GetEventbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllEvents")]
    public async Task<IActionResult> GetAllEventsAsync()
    {
      try
      {
        var results = await _eventRepos.GetAllEventsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateEvent")]
    public async Task<IActionResult> PutEvent(int id, EventView @event)
    {
      try
      {
        var existingEvent = await _eventRepos.GetEventbyID(id);

        if (existingEvent == null) return NotFound("Could not find the Event");

        existingEvent.Location = @event.Location;
        existingEvent.NumberOfEmployees = @event.NumberOfEmployees;
        existingEvent.Description = @event.Description;
        existingEvent.EventDate = @event.EventDate;

        if (await _eventRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addEvent")]
    public async Task<IActionResult> PostEvent(EventView @event)
    {
      var addEvent = new Event
      {
        Location = @event.Location,
        NumberOfEmployees = @event.NumberOfEmployees,
        Description = @event.Description,
        EventDate = @event.EventDate
      };
      try
      {
        _eventRepos.Add(addEvent);
        if(await _eventRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpGet]
    [Route("checkEventBooking")]
    public async Task<IActionResult> checkEventBooking(int id)
    {
      try
      {
        var results = await _eventRepos.GetEventBookingbyID(id);
        if(results == null)
        {
          return Ok("Yes");
        } else
        {
          return BadRequest("No");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpDelete]
    [Route("deleteEvent")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
      try
      {
        var existingEvent = await _eventRepos.GetEventbyID(id);
        var existingEventBooking = await _eventRepos.GetEventBookingbyEventID(id);

        if (existingEvent == null) return NotFound();

        _eventRepos.Delete(existingEvent);
        if (await _eventRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Cannot execute request.");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addExistingTransportBooking")]
    public async Task<IActionResult> addExistingTransportBooking(TransportView transport, int eventId)
    {
      bool isInCEC;
      var addBooking = new Booking();
      var newCEC = new ClientEmployeeConnection();
      var ifexistingCEC = await _clientEmployeeConnectionRepos.GetClientEmployeebyUserID(transport.SenderId);
      if(ifexistingCEC == null)
      {
        newCEC = new ClientEmployeeConnection
        {
          ClientUserId = "Event",
          UserId = transport.SenderId
        };
        _eventRepos.Add(newCEC);
        await _eventRepos.SaveChangesAsync();
        isInCEC = true;
      } else
      {
        isInCEC = false;
      }

      var newDate = new Date
      {
        Date1 = transport.Date
      };
      var newTime = new Time
      {
        Time1 = transport.Time
      };
      try
      {
        _eventRepos.Add(newDate);
        _eventRepos.Add(newTime);
        if (await _eventRepos.SaveChangesAsync())
        {
          if(isInCEC == true)
          {
            var existingCEC = _clientEmployeeConnectionRepos.GetLatestAddedID();
            addBooking = new Booking
            {
              Fined = false,
              Canceled = false,
              BookingStatusId = 1,
              BookingTypeId = 3,
              Qrcode = "1",
              CecId = existingCEC.CecId,
              SenderUserId = transport.SenderId

            };
          }
          else
          {
            addBooking = new Booking
            {
              Fined = false,
              Canceled = false,
              BookingStatusId = 1,
              BookingTypeId = 3,
              Qrcode = "1",
              CecId = ifexistingCEC.CecId,
              SenderUserId = transport.SenderId
            };
          }

          _eventRepos.Add(addBooking);
          if (await _eventRepos.SaveChangesAsync())
          {
            var existingBooking = _bookingRepos.GetLatestAddedID();
            var addTracking = new Tracking
            {
              Distance = transport.Distance,
              StartLocation = transport.StartLocation,
              EndLocation = transport.EndLocation,
              BookingId = existingBooking.BookingId
            };
            _driverscheduleRepos.Add(addTracking);
            var existingEvent = await _eventRepos.GetEventbyID(eventId);
            var newEventBooking = new EventBooking
            {
              BookingId = existingBooking.BookingId,
              EventId = existingEvent.EventId
            };
            _maintenanceRepos.Add(newEventBooking);

            if (await _maintenanceRepos.SaveChangesAsync())
            {
              await AddToSchedule();
              var auditLog = new AuditLog
              {
                UserId = existingBooking.SenderUserId,
                AuditLogTypeId = 1,
                TimeStamp = DateTime.UtcNow
              };
              _appDb.Add(auditLog);
              await _appDb.SaveChangesAsync();
            }
          }
        }
      }
      catch (Exception)
      {
        return BadRequest();
      }
      return Ok();
    }

    [HttpPost]
    [Route("addNewTransportBooking")]
    public async Task<IActionResult> addNewTransportBooking(TransportView transport)
    {
      bool isInCEC;
      var addBooking = new Booking();
      var newCEC = new ClientEmployeeConnection();
      var ifexistingCEC = await _clientEmployeeConnectionRepos.GetClientEmployeebyUserID(transport.SenderId);
      if (ifexistingCEC == null)
      {
        newCEC = new ClientEmployeeConnection
        {
          ClientUserId = "Event",
          UserId = transport.SenderId
        };
        _eventRepos.Add(newCEC);
        await _eventRepos.SaveChangesAsync();
        isInCEC = true;
      }
      else
      {
        isInCEC = false;
      }

      var newDate = new Date
      {
        Date1 = transport.Date
      };
      var newTime = new Time
      {
        Time1 = transport.Time
      };
      try
      {
        _eventRepos.Add(newDate);
        _eventRepos.Add(newTime);
        if (await _eventRepos.SaveChangesAsync())
        {
          if (isInCEC == true)
          {
            var existingCEC = _clientEmployeeConnectionRepos.GetLatestAddedID();
            addBooking = new Booking
            {
              Fined = false,
              Canceled = false,
              BookingStatusId = 1,
              BookingTypeId = 3,
              Qrcode = "1",
              CecId = existingCEC.CecId,
              SenderUserId = transport.SenderId

            };
          }
          else
          {
            addBooking = new Booking
            {
              Fined = false,
              Canceled = false,
              BookingStatusId = 1,
              BookingTypeId = 3,
              Qrcode = "1",
              CecId = ifexistingCEC.CecId,
              SenderUserId = transport.SenderId
            };
          }

          _eventRepos.Add(addBooking);
          if (await _eventRepos.SaveChangesAsync())
          {
            var existingBooking = _bookingRepos.GetLatestAddedID();
            var addTracking = new Tracking
            {
              Distance = transport.Distance,
              StartLocation = transport.StartLocation,
              EndLocation = transport.EndLocation,
              BookingId = existingBooking.BookingId
            };
            _driverscheduleRepos.Add(addTracking);
            var existingEvent = _eventRepos.GetLatestAddedID();
            var newEventBooking = new EventBooking
            {
              BookingId = existingBooking.BookingId,
              EventId = existingEvent.EventId
            };
            _maintenanceRepos.Add(newEventBooking);

            if (await _maintenanceRepos.SaveChangesAsync())
            {
              await AddToSchedule();
              var auditLog = new AuditLog
              {
                UserId = existingBooking.SenderUserId,
                AuditLogTypeId = 1,
                TimeStamp = DateTime.UtcNow
              };
              _appDb.Add(auditLog);
              await _appDb.SaveChangesAsync();
            }
          }
        }
      }
      catch (Exception)
      {
        return BadRequest();
      }
      return Ok();
    }

    [HttpPost]
    [Route("addToSchedule")]
    public async Task<ActionResult> AddToSchedule()
    {
      var bookingTime = _timeRepos.GetLatestAddedID();
      var bookingDate = _dateRepos.GetLatestAddedID();
      var bookingId = _bookingRepos.GetLatestAddedID();
      var driver = GetRandomDriver();
      var driverUser = _driverInformationRepos.GetInfobyID(driver.ToString());
      try
      {
        var newDTDV = new DateTimeDriverVehicle
        {
          ScheduleTimeId = bookingTime.ScheduleTimeId,
          ScheduleDateId = bookingDate.ScheduleDateId,
          DriverUserId = driverUser.Result.DriverUserId,
          DriverStatusId = 1,
          BookingId = bookingId.BookingId
        };

        _driverscheduleRepos.Add(newDTDV);
        if (await _driverscheduleRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }
      return BadRequest();
    }

    [HttpGet]
    [Route("getRandomDriver")]
    public string GetRandomDriver()
    {
      var driverUsers = _driverInformationRepos.GetAllDriverInformationAsync();

      Random random = new Random();
      int randomItem = random.Next(driverUsers.Result.Length);
      var randomElement = driverUsers.Result[randomItem];
      var id = randomElement.DriverUserId.ToString();
      var AV = randomElement.RegistrationId;

      var mainList = _maintenanceRepos.GetAllMaintenanceAsync();
      var dateID = _dateRepos.GetLatestAddedID();
      var bdate = _dateRepos.GetDatebyID(dateID.ScheduleDateId);
      var bookingdate = bdate.Result.Date1;

      DateTime? mainDate = null;

      for (var i = 0; i < mainList.Result.Length; i++)
      {
        if (mainList.Result[i].RegistrationId == AV)
        {
          mainDate = mainList.Result[i].Date;
          if (bookingdate == (mainDate.Value))
          {
            int rItem = 0;
            string rID = "";
            do
            {
              Random r = new Random();
              rItem = r.Next(driverUsers.Result.Length);
              var rElement = driverUsers.Result[rItem];
              rID = rElement.DriverUserId.ToString();
            }
            while (randomItem == rItem);

            return rID;
          }
        }
        else
        {
          return id;
        }
      }
      return id;
    }

    [HttpPut]
    [Route("deleteTansportBooking")]
    public async Task<IActionResult> deleteTansportBooking(int bookingId)
    {
      var exitingSchedule = await _driverscheduleRepos.GetDateTimeDriverbyBookingID(bookingId);
      var existingBooking = await _bookingRepos.GetBookingbyID(bookingId);
      var existingDate = await _dateRepos.GetDatebyID(exitingSchedule.ScheduleDateId);
      var existingTime = await _timeRepos.GetTimebyID(exitingSchedule.ScheduleTimeId);
      var existingTracking = await _bookingRepos.GetTrackingByBookingId(bookingId);
      var exitingEventBook = await _eventRepos.GetEventBookingbybookingID(bookingId);

      try
      {
        if (existingBooking == null || exitingSchedule == null || existingTime == null || existingDate == null || existingTracking == null)
        {
          return BadRequest();
        }
        _driverscheduleRepos.Delete(exitingSchedule);
        if(await _driverscheduleRepos.SaveChangesAsync())
        {
          _dateRepos.Delete(existingDate);
          _timeRepos.Delete(existingTime);
          _eventRepos.Delete(existingTracking);
          _driverscheduleRepos.Delete(exitingEventBook);
          if(await _driverscheduleRepos.SaveChangesAsync())
          {
            existingBooking.Canceled = true;
            if(await _bookingRepos.SaveChangesAsync())
            {
              var booking = await _appDb.Booking.FindAsync(existingBooking.BookingId);
              var auditLog = new AuditLog
              {
                UserId = booking.SenderUserId,
                AuditLogTypeId = 2,
                TimeStamp = DateTime.UtcNow
              };
              _appDb.AuditLog.Add(auditLog);
              await _appDb.SaveChangesAsync();
              return Ok();
            }
          }
        }
      }
        catch (Exception)
        {
          return BadRequest();
      }
      return BadRequest();
    }

    [HttpGet]
    [Route("getTransportBookings")]
    public object getTransportBookings(string empId)
    {
      var query = (from Book in _appDb.Booking
                   join CEC in _appDb.ClientEmployeeConnection
                   on Book.SenderUserId equals CEC.UserId
                   join status in _appDb.BookingStatus
                   on Book.BookingStatusId equals status.BookingStatusId
                   join DTDV in _appDb.DateTimeDriverVehicle
                   on Book.BookingId equals DTDV.BookingId
                   join date in _appDb.Date
                   on DTDV.ScheduleDateId equals date.ScheduleDateId
                   join time in _appDb.Time
                   on DTDV.ScheduleTimeId equals time.ScheduleTimeId
                   join EB in _appDb.EventBooking
                   on Book.BookingId equals EB.BookingId
                   join ev in _appDb.Event
                   on EB.EventId equals ev.EventId
                   select new
                   {
                     eventId = ev.EventId,
                     eventName = ev.Description,
                     bookingDate = date.Date1.ToString().Substring(0,10) + " " + time.Time1,
                     bookingId = Book.BookingId,
                     CecId = CEC.CecId,
                     status = new { Book.BookingStatusId, status.Status },
                     senderUserId = Book.SenderUserId,
                     canceled = Book.Canceled,
                     clientName = CEC.ClientUserId
                   }).Where(b => b.clientName == "Event" && b.senderUserId == empId).ToList();
      return query;
    }
  }
}
